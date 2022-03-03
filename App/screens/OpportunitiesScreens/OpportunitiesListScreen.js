import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import colors from '../../config/colors';
import routes from '../../navigation/routes';
import { Block, Text } from '../../components/AppTheme';
import { FlatList } from 'react-native-gesture-handler';
import OpportunitiesListItem from '../../components/opportunities/OpportunitiesListItem';
import GetLocation from 'react-native-get-location';
import LocationPermissionPopUp from '../../components/opportunities/LocationPermissionPopUp';
import LoadingIndicator from '../../components/LoadingIndicator';
import { openSettings } from 'react-native-permissions';
import rewards from '../../api/rewards';
import useApi from '../../hooks/useApi';
import AppAlert from '../../utils/AppAlert';
import MessagePopup from '../../components/MessagePopup';
import ImageResizer from 'react-native-image-resizer';
import { useTranslation } from 'react-i18next';

const OpportunitiesListScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [locationPermissionVisible, setLocationPermissionVisible] =
    useState(false);
  const [rewardsListData, setRewardsListData] = useState({});
  const [rewardsList, setRewardsList] = useState([]);
  const getRewardsListApi = useApi(rewards.getRewardsList);
  const doRewardsJointApi = useApi(rewards.doApply);
  const [query, setQuery] = useState({
    page: 1,
  });
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  const getRewardsList = async (q) => {
    const result = await getRewardsListApi.request({
      ...q,
    });

    if (result.ok) {
      setRewardsListData(result.data.data);
      setRewardsList((list) => {
        return [...list, ...result.data.data.list];
      });
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          setQuery({ page: 1 });
          getRewardsList({ page: 1 });
        },
        okText: t('try_again'),
      });
    }
  };
  const resizeImage = async (image) => {
    try {
      const { width, height, path } = image;
      //let divider = height > 500 ? 1.5 : 1;
      let newImage = await ImageResizer.createResizedImage(
        path,
        parseInt(width),
        parseInt(height),
        'JPEG',
        100, //quality
        0, //rotation
        null, //outputPath if null will save  on cache
        false,
      );
      return newImage;
    } catch (error) {
      return image;
    }
  };

  const rewardsJoin = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => formData.append(key, values[key]));
    const result = await doRewardsJointApi.request(formData);
    if (result.ok) {
      setMessagePopupVisible({
        isVisible: true,
        title: t('successful'),
        subTitle: result.data.message,
      });
    } else {
      AppAlert.errorAlert({
        onOk: () => {},
      });
    }
  };
  useEffect(() => {
    getRewardsList(query);
  }, []);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'center',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
      headerTitle: (props) => (
        <Text bold numberOfLines={1}>
          {t('opportunity')}
        </Text>
      ),
    });
  }, [navigation]);

  return (
    <Block white>
      <Block>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          data={rewardsList}
          renderItem={({ item }) => (
            <OpportunitiesListItem
              onPress={() => {}}
              item={item}
              onJoin={() => {
                if (item.conditions.checkIn) {
                  GetLocation.getCurrentPosition({
                    enableHighAccuracy: true,
                    timeout: 15000,
                  })
                    .then((location) => {
                      if (item.conditions.photo) {
                        navigation.navigate(routes.UPLOAD_IMAGE_SCREEN, {
                          onReturn: async (image) => {
                            let resizedImage = await resizeImage(image);
                            rewardsJoin({
                              id: item.id,
                              latitude: location.latitude,
                              longitude: location.longitude,
                              photo: {
                                uri: resizedImage?.uri,
                                type: 'image/jpeg',
                                name: resizedImage?.name || 'randomImage',
                              },
                            });
                          },
                        });
                      } else {
                        rewardsJoin({
                          id: item.id,
                          latitude: location.latitude,
                          longitude: location.longitude,
                        });
                      }
                    })
                    .catch((error) => {
                      const { code, message } = error;
                      console.warn(code, message);
                      setLocationPermissionVisible(true);
                    });
                } else if (item.conditions.photo) {
                  navigation.navigate(routes.UPLOAD_IMAGE_SCREEN, {
                    onReturn: async (image) => {
                      let resizedImage = await resizeImage(image);
                      rewardsJoin({
                        id: item.id,

                        photo: {
                          uri: resizedImage?.uri,
                          type: 'image/jpeg',
                          name: resizedImage?.name || 'randomImage',
                        },
                      });
                    },
                  });
                } else {
                  rewardsJoin({
                    id: item.id,
                  });
                }
              }}
            />
          )}
          ListFooterComponent={() => {
            return (
              <Block>
                {getRewardsListApi.loading ? (
                  <ActivityIndicator
                    size="large"
                    color={colors.primary}
                    style={{ marginLeft: 6 }}
                  />
                ) : null}
              </Block>
            );
          }}
          keyExtractor={(item) => item.index}
          onEndReached={() => {
            if (
              rewardsListData.pagination.currentPage >=
              rewardsListData.pagination.lastPage
            ) {
            } else {
              if (!doRewardsJointApi.loading) {
                setQuery({ ...query, page: query.page + 1 });
                getRewardsList({ ...query, page: query.page + 1 });
              }
            }
          }}
        />
      </Block>
      <LocationPermissionPopUp
        isVisible={locationPermissionVisible}
        hideModal={() => {
          setLocationPermissionVisible(false);
        }}
        onYes={() => {
          openSettings().catch(() => console.warn('cannot open settings'));
        }}
      />
      <MessagePopup
        isVisible={messagePopupVisible.isVisible}
        title={messagePopupVisible.title}
        subTitle={messagePopupVisible.subTitle}
        hideModal={() => {
          setMessagePopupVisible({ isVisible: false });
        }}
      />
      <LoadingIndicator visible={doRewardsJointApi.loading} />
    </Block>
  );
};

export default OpportunitiesListScreen;

const styles = StyleSheet.create({});
