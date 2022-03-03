import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import MyFavoriteVerticalList from '../../components/myFavorites/MyFavoriteVerticalList';
import routes from '../../navigation/routes';
import useApi from '../../hooks/useApi';
import myFavorites from '../../api/myFavorites';
import AppAlert from '../../utils/AppAlert';
import LoadingIndicator from '../../components/LoadingIndicator';
import ActivityCategoryList from '../../components/event/ActivityCategoryList';
import HotelsVerticalList from '../../components/hotelSearch/HotelsVerticalList';
import RestaurantVerticalList from '../../components/restaurant/RestaurantVerticalList';
import TourVerticalList from '../../components/tour/TourVerticalList';
import { useTranslation } from 'react-i18next';

const FavoriteScreen = ({ navigation }) => {
  const { t } = useTranslation();
  //useState
  const [myFavoritesList, setMyFavoritesList] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [favorites, setFavorites] = useState([]);

  //useApi
  const getMyFavoritesListApi = useApi(myFavorites.getMyFavorites);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'center',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
      headerTitle: (props) => (
        <Text bold numberOfLines={1} size={18}>
          {t('my_favorite')}
        </Text>
      ),
    });
  }, [navigation]);

  const getMyFavoritesList = async (q) => {
    const result = await getMyFavoritesListApi.request(q);
    if (result.ok) {
      setMyFavoritesList(result.data.data.list);
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          getMyFavoritesList();
        },
        okText: t('try_again'),
      });
    }
  };

  //const data = myFavoritesList.filter((item) => item.list.length !== 0);
  //console.log('test: ', data);

  useEffect(() => {
    const data = myFavoritesList.filter((item) => item.list.length !== 0);
    setFavorites(data);
  }, [myFavoritesList]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMyFavoritesList();
    });
    return unsubscribe;
  }, []);
  const getNavigationName = (moduleID) => {
    switch (moduleID) {
      case 1:
        return routes.EVENT_DETAIL;
      case 2:
        return routes.HOTEL_DETAILS_SCREEN;
      case 3:
        return routes.RESTAURANT_DETAILS_SCREEN;
      case 4:
        return routes.TOUR_DETAIL_SCREEN;
      case 5:
        return routes.YACHT_BOAT_DETAIL_SCREEN;
      case 6:
        return routes.PLACES_DETAILS_SCREEN;
      case 7:
        return routes.BLOG_DETAILS_SCREEN;
      default:
        return null;
    }
  };
  const getModuleTitle = (moduleID) => {
    switch (moduleID) {
      case 1:
        return 'Etkinlikler';
      case 2:
        return 'Oteller';
      case 3:
        return 'Yeme/İçme';
      case 4:
        return 'Gezi ve Turlar';
      case 5:
        return 'Tekne ve Yatlar';
      case 6:
        return 'Gezilecek Yerler';
      case 7:
        return 'Blog';
      default:
        return null;
    }
  };
  return (
    <Block white>
      {favorites.length > 0 ? (
        <Block scroll contentContainerStyle={styles.contentContainer}>
          {myFavoritesList.map((item) => {
            const moduleTitle = getModuleTitle(item.moduleId);
            if (item.list.length > 0) {
              switch (item.moduleId) {
                case 1:
                  return (
                    <ActivityCategoryList
                      title={moduleTitle}
                      itemList={item.list}
                      onSeeAllPress={() => {
                        const navigationName = getNavigationName(item.moduleId);
                        navigation.navigate(routes.MY_FAVORITE_LISTING, {
                          moduleID: item.moduleId,
                          title: moduleTitle,
                          navigationName: navigationName,
                        });
                      }}
                      onPress={(listItem) => {
                        navigation.navigate(routes.EVENT_STACK, {
                          screen: routes.EVENT_DETAIL,
                          params: { id: listItem.id },
                        });
                      }}
                    />
                  );
                  break;
                case 2:
                  return (
                    <HotelsVerticalList
                      title={moduleTitle}
                      itemList={item.list}
                      onSeeAllPress={() => {
                        const navigationName = getNavigationName(item.moduleId);
                        navigation.navigate(routes.MY_FAVORITE_LISTING, {
                          moduleID: item.moduleId,
                          title: moduleTitle,
                          navigationName: navigationName,
                        });
                      }}
                      onPress={(listItem) => {
                        navigation.navigate(routes.HOTEL_STACK, {
                          screen: routes.HOTEL_DETAILS_SCREEN,
                          params: { id: listItem.id },
                        });
                      }}
                    />
                  );
                  break;
                case 3:
                  return (
                    <RestaurantVerticalList
                      title={moduleTitle}
                      itemList={item.list}
                      onSeeAllPress={() => {
                        const navigationName = getNavigationName(item.moduleId);
                        navigation.navigate(routes.MY_FAVORITE_LISTING, {
                          moduleID: item.moduleId,
                          title: moduleTitle,
                          navigationName: navigationName,
                        });
                      }}
                      onPress={(listItem) => {
                        navigation.navigate(routes.RESTAURANT_STACK, {
                          screen: routes.RESTAURANT_DETAILS_SCREEN,
                          params: { id: listItem.id },
                        });
                      }}
                    />
                  );
                  break;
                case 4:
                  return (
                    <TourVerticalList
                      title={moduleTitle}
                      itemList={item.list}
                      onSeeAllPress={() => {
                        const navigationName = getNavigationName(item.moduleId);
                        navigation.navigate(routes.MY_FAVORITE_LISTING, {
                          moduleID: item.moduleId,
                          title: moduleTitle,
                          navigationName: navigationName,
                        });
                      }}
                      onPress={(listItem) => {
                        navigation.navigate(routes.TOUR_STACK, {
                          screen: routes.TOUR_DETAIL_SCREEN,
                          params: { id: listItem.id },
                        });
                      }}
                    />
                  );
                  break;
                case 5:
                  return (
                    <MyFavoriteVerticalList
                      title={moduleTitle}
                      itemList={item.list}
                      onSeeAllPress={() => {
                        const navigationName = getNavigationName(item.moduleId);
                        navigation.navigate(routes.MY_FAVORITE_LISTING, {
                          moduleID: item.moduleId,
                          title: moduleTitle,
                          navigationName: navigationName,
                        });
                      }}
                      onPress={(listItem) => {
                        navigation.navigate(routes.YACHT_BOAT_STACK, {
                          screen: routes.YACHT_BOAT_DETAIL_SCREEN,
                          params: { id: listItem.id },
                        });
                      }}
                    />
                  );
                  break;
                case 6:
                  return (
                    <MyFavoriteVerticalList
                      title={moduleTitle}
                      itemList={item.list}
                      onSeeAllPress={() => {
                        const navigationName = getNavigationName(item.moduleId);
                        navigation.navigate(routes.MY_FAVORITE_LISTING, {
                          moduleID: item.moduleId,
                          title: moduleTitle,
                          navigationName: navigationName,
                        });
                      }}
                      onPress={(listItem) => {
                        navigation.navigate(routes.PLACES_STACK, {
                          screen: routes.PLACES_DETAILS_SCREEN,
                          params: { id: listItem.id },
                        });
                      }}
                    />
                  );
                  break;
                case 7:
                  return (
                    <MyFavoriteVerticalList
                      title={moduleTitle}
                      itemList={item.list}
                      onSeeAllPress={() => {
                        const navigationName = getNavigationName(item.moduleId);
                        navigation.navigate(routes.MY_FAVORITE_LISTING, {
                          moduleID: item.moduleId,
                          title: moduleTitle,
                          navigationName: navigationName,
                        });
                      }}
                      onPress={(listItem) => {
                        navigation.navigate(routes.BLOG_STACK, {
                          screen: routes.BLOG_DETAILS_SCREEN,
                          params: { id: listItem.id },
                        });
                      }}
                    />
                  );
                  break;
              }
            }
          })}
        </Block>
      ) : (
        <Block center middle>
          <Text bold>Henüz favoriniz bulunmamaktadır.</Text>
        </Block>
      )}
      <LoadingIndicator visible={getMyFavoritesListApi.loading} />
    </Block>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({});
