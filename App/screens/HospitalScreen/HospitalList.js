import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import HospitalListItem from '../../components/hospital/HospitalListItem';
import BackIcon from '../../components/BackIcon';
import { Block, Text } from '../../components/AppTheme';
import routes from '../../navigation/routes';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';
import hospitals from '../../api/hospitals';
import AppAlert from '../../utils/AppAlert';
import useApi from '../../hooks/useApi';
import AppButton from '../../components/AppButton';
import IconWithClick from '../../components/IconWithClick';
import { IconTypes } from '../../components/AppTheme/Icon';
import GetLocation from 'react-native-get-location';
import LocationPermissionPopUp from '../../components/opportunities/LocationPermissionPopUp';
import { openSettings } from 'react-native-permissions';
import LocationRangeSliderPopup from '../../components/restaurant/LocationRangeSliderPopup';
import { useTranslation } from 'react-i18next';

const HospitalList = ({ navigation }) => {
  const { t } = useTranslation();
  const [hospitalListData, setHospitalListData] = useState({});
  const [hospitalList, setHospitalList] = useState([]);
  const getHospitalsListApi = useApi(hospitals.getHospitals);
  const [query, setQuery] = useState({
    page: 1,
  });
  const [locationPermissionVisible, setLocationPermissionVisible] =
    useState(false);
  const [locationRangeVisible, setLocationRangeVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => (
        <Block>
          <Text
            numberOfLines={1}
            {...props}
            color={colors.lightGray}
            size={16}
            medium
            onPress={() => {
              navigation.navigate(routes.SEARCH_SCREEN);
            }}>
            {t('hospital_name')}
          </Text>
        </Block>
      ),
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'left',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
    });
  }, [navigation]);

  const getHospitalsList = async (q) => {
    const result = await getHospitalsListApi.request({
      ...q,
    });

    if (result.ok) {
      setHospitalListData(result.data.data);
      setHospitalList((list) => {
        return [...list, ...result.data.data.list];
      });
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          setQuery({ page: 1 });
          setHospitalList({ page: 1 });
        },
        okText: t('try_again'),
      });
    }
  };
  useEffect(() => {
    getHospitalsList(query);
  }, []);

  const renderItem = ({ item }) => {
    /**
     * Etkinlik item ini içerir.
     */
    return (
      <HospitalListItem
        name={item.title}
        description={item.description}
        image={item.showcaseImage}
        onPress={() => {
          navigation.navigate(routes.HOSPITAL_DETAIL, { id: item.id });
        }}
        marginBottom={20}
      />
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'left',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,

      headerTitle: (props) => (
        <Block>
          <TextInput
            style={styles.input}
            onChangeText={(txt) => {
              setQuery({ ...query, searchText: txt, page: 1 });
              if (txt.length > 1) {
                setQuery({ ...query, searchText: txt, page: 1 });
                setHospitalList([]);
                getHospitalsList({ ...query, searchText: txt, page: 1 });
              } else if (txt.length === 0) {
                getHospitalsList({ ...query, page: 1 });
              }
            }}
            value={query?.searchText}
            placeholder={t('what_are_you_looking_for')}
          />
        </Block>
      ),
      headerRight: () => (
        <Block center row marginRight>
          <IconWithClick
            name={'location-outline'}
            type={IconTypes.ionicon}
            size={20}
            color={colors.semiBlack}
            marginRight
            marginLeft
            onPress={() => {
              GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
              })
                .then((location) => {
                  setQuery({
                    ...query,
                    lat: location.latitude,
                    lon: location.longitude,
                    range: 100,
                    page: 1,
                  });
                  setLocationRangeVisible(true);
                })
                .catch((error) => {
                  const { code, message } = error;
                  console.warn(code, message);
                  setLocationPermissionVisible(true);
                });
            }}
          />
        </Block>
      ),
    });
  }, [navigation, query]);

  return (
    <Block white>
      <FlatList
        data={hospitalList}
        renderItem={renderItem}
        keyExtractor={(item) => item.index}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => {
          return (
            <Block>
              {getHospitalsListApi.loading ? (
                <ActivityIndicator
                  size="large"
                  color={colors.primary}
                  style={{ marginLeft: 6 }}
                />
              ) : null}
            </Block>
          );
        }}
        ListEmptyComponent={() =>
          !getHospitalsListApi.loading ? (
            <Block center>
              <Text bold marginTop>
                {t('no_result')}
              </Text>
              <Block>
                <AppButton
                  marginTop
                  textColor={colors.primary}
                  textOnly
                  title={t('clear_filters')}
                  onPress={() => {
                    setQuery({ page: 1 });
                    getHospitalsList({ page: 1 });
                  }}
                />
              </Block>
            </Block>
          ) : null
        }
      />
      <LocationPermissionPopUp
        isVisible={locationPermissionVisible}
        hideModal={() => {
          setLocationPermissionVisible(false);
        }}
        onYes={() => {
          openSettings().catch(() => console.warn('cannot open settings'));
        }}
      />
      <LocationRangeSliderPopup
        isVisible={locationRangeVisible}
        hideModal={() => setLocationRangeVisible(false)}
        onYes={(value) => {
          setQuery({ ...query, range: value, page: 1 });
          setHospitalList([]);
          getHospitalsList({ ...query, range: value, page: 1 });
        }}
      />
    </Block>
  );
};

export default HospitalList;

const styles = StyleSheet.create({
  listContentContainer: {
    padding: 16,
  },
});
