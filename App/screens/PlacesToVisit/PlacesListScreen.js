import React, { useLayoutEffect, useEffect, useState } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Block } from '../../components/AppTheme';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import routes from '../../navigation/routes';
import colors from '../../config/colors';
import VerticalSeparator from '../../components/VerticalSeparator';
import IconWithClick from '../../components/IconWithClick';
import { IconTypes } from '../../components/AppTheme/Icon';
import PlacesListItem from '../../components/PlacesToVisit/PlacesListItem';
import placesToVisit from '../../api/placesToVisit';
import useApi from '../../hooks/useApi';
import AppAlert from '../../utils/AppAlert';

const PlacesListScreen = ({ navigation }) => {
  // useApi
  const getPlacesListAPI = useApi(placesToVisit.getPlacesToVisitList);
  // useState
  const [placesList, setPlacesList] = useState([]);
  const [placesInfo, setPlacesInfo] = useState({});
  const [query, setQuery] = useState({});

  useEffect(() => {
    getPlacesList(query);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'left',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
      headerRight: () => (
        <Block center row marginRight>
          <VerticalSeparator backgroundColor={colors.lightGray} />
          <IconWithClick
            name={'filter'}
            type={IconTypes.antdesign}
            size={20}
            color={colors.black}
            marginRight
            marginLeft
            onPress={() => {
              navigation.navigate(routes.FILTERS_SCREEN, {
                filters: placesInfo.filters,
                onReturn: (selectedFilters) => {
                  setQuery({
                    ...query,
                    page: 1,
                    ...selectedFilters,
                  });
                  setPlacesList([]);
                  getPlacesList({
                    ...query,
                    page: 1,
                    ...selectedFilters,
                  });
                },
              });
            }}
          />
        </Block>
      ),
    });
  }, [navigation, placesInfo.filters]);

  const getPlacesList = async (q) => {
    /**
     * Gezilecek yerler listesini getirir.
     */
    const result = await getPlacesListAPI.request(q);
    if (result.ok) {
      setPlacesInfo(result.data.data);
      setPlacesList(result.data.data.list);
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          getPlacesList(q);
        },
        okText: 'Tekrar Dene',
      });
    }
  };

  return (
    <Block white>
      <Block>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          data={placesList}
          ListFooterComponent={() => {
            return (
              <Block>
                {getPlacesListAPI.loading ? (
                  <ActivityIndicator
                    size="large"
                    color={colors.primary}
                    style={styles.loadingIndicator}
                  />
                ) : null}
              </Block>
            );
          }}
          renderItem={({ item, index }) => (
            <PlacesListItem
              onPress={() => {
                navigation.navigate(routes.PLACES_DETAILS_SCREEN, {
                  placeID: item.id,
                });
              }}
              title={item.title}
              description={item.description}
              imageList={item.images}
              isFavorite={item.isFavorite}
            />
          )}
          keyExtractor={(item) => item.index}
        />
      </Block>
    </Block>
  );
};

export default PlacesListScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 70,
  },
  loadingIndicator: {
    marginLeft: 6,
    marginTop: 16,
  },
});
