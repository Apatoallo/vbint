import React, { useState, useLayoutEffect, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import VerticalSeparator from '../../components/VerticalSeparator';
import colors from '../../config/colors';
import IconWithClick from '../../components/IconWithClick';
import { IconTypes } from '../../components/AppTheme/Icon';
import routes from '../../navigation/routes';
import useApi from '../../hooks/useApi';
import myFavorites from '../../api/myFavorites';
import LoadingIndicator from '../../components/LoadingIndicator';
import AppAlert from '../../utils/AppAlert';
import ActivityCategoryListItem from '../../components/event/ActivityCategoryListItem';
import HotelListItem from '../../components/hotelSearch/HotelListItem';
import RestaurantListItem from '../../components/restaurant/RestaurantListItem';
import TourListItem from '../../components/tour/TourListItem';
import YachtBoatListItem from '../../components/YachtBoat/YachtBoatListItem';
import PlacesListItem from '../../components/PlacesToVisit/PlacesListItem';
import BlogListItem from '../../components/blog/BlogListItem';
import { useTranslation } from 'react-i18next';

const MyFavoriteListingScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  // useState
  const [favoriteList, setFavoriteList] = useState([]);
  const [favoriteListInfo, setFavoriteListInfo] = useState(null);
  const [query, setQuery] = useState({
    page: 1,
  });
  const [selectedItem, setSelectedItem] = useState({});
  // useApi
  const getFavoriteListAPI = useApi(myFavorites.getMyFavoritesListByCategory);
  //const updateNotebookListAPI = useApi(memoryBook.updateMemory);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'center',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
      headerTitle: (props) => (
        <Text bold numberOfLines={1}>
          {t('my_favorite')}
        </Text>
      ),
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
                filters: favoriteListInfo.filters,
                onReturn: (selectedFilters) => {
                  setQuery({
                    ...query,
                    page: 1,
                    ...selectedFilters,
                  });
                  setFavoriteList([]);
                  getFavoriteList({
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
  }, [navigation, favoriteListInfo]);

  useEffect(() => {
    getFavoriteList();
  }, []);

  const getFavoriteList = async () => {
    const result = await getFavoriteListAPI.request({
      moduleID: route.params.moduleID,
      query: query,
    });
    if (result.ok) {
      setFavoriteListInfo(result.data.data);
      setFavoriteList(result.data.data.list);
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          getFavoriteList();
        },
        okText: t('try_again'),
      });
    }
  };

  return (
    <Block white>
      <Text bold size={22} marginBottom={5} marginLeft={16}>
        {route.params.title}
      </Text>
      {favoriteList && favoriteList.length > 0 && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 70 }}
          data={favoriteList}
          renderItem={({ item, index }) => {
            console.log(2, item);
            switch (item.moduleId) {
              case '1':
                return (
                  <ActivityCategoryListItem
                    onPress={() => onPress(item)}
                    item={item}
                  />
                );
                break;
              case '2':
                return (
                  <HotelListItem
                    onPress={() => {
                      navigation.navigate(route.params.navigationName, {
                        id: item.id,
                      });
                    }}
                    imageList={item.images}
                    title={item.title}
                    description={item.description}
                    address={item.address}
                    ratting={item.rattings}
                    isFavorite={item.isFavorite}
                    isMemoryBook={item.isMemoryBook}
                    isCampaign={item.isCampaign}
                    price={item.price}
                  />
                );
                break;
              case '3':
                return (
                  <RestaurantListItem
                    onPress={() => {
                      navigation.navigate(route.params.navigationName, {
                        id: item.id,
                      });
                    }}
                    imageList={item.images}
                    title={item.title}
                    description={item.description}
                    address={item.address}
                    ratting={item.rattings}
                    isFavorite={item.isFavorite}
                    isMemoryBook={item.isMemoryBook}
                  />
                );
                break;
              case '4':
                return (
                  <TourListItem
                    onPress={() => {
                      navigation.navigate(route.params.navigationName, {
                        id: item.id,
                      });
                    }}
                    imageList={item.images}
                    title={item.title}
                    description={item.description}
                    address={item.address}
                    ratting={item.rattings}
                    isFavorite={item.isFavorite}
                    isMemoryBook={item.isMemoryBook}
                    price={item.price}
                    discountedPrice={item.discountedPrice}
                    duration={item.duration}
                    maxPerson={item.maxPerson}
                  />
                );
                break;
              case '5':
                return (
                  <YachtBoatListItem
                    onPress={() => {
                      navigation.navigate(route.params.navigationName, {
                        id: item.id,
                      });
                    }}
                    imageList={item.images}
                    title={item.title}
                    description={item.description}
                    address={item.address}
                    ratting={item.rattings}
                    isFavorite={item.isFavorite}
                    isMemoryBook={item.isMemoryBook}
                    price={item.price}
                    discountedPrice={item.discountedPrice}
                    duration={item.duration}
                    maxPerson={item.maxPerson}
                  />
                );
                break;
              case '6':
                return (
                  <PlacesListItem
                    onPress={() => {
                      navigation.navigate(route.params.navigationName, {
                        id: item.id,
                      });
                    }}
                    imageList={item.images}
                    title={item.title}
                    description={item.description}
                    address={item.address}
                    ratting={item.rattings}
                    isFavorite={item.isFavorite}
                    isMemoryBook={item.isMemoryBook}
                  />
                );
                break;
              case '7':
                return (
                  <BlogListItem
                    onPress={() => {
                      navigation.navigate(route.params.navigationName, {
                        id: item.id,
                      });
                    }}
                    imageList={item.images}
                    title={item.title}
                    description={item.description}
                    address={item.address}
                    ratting={item.rattings}
                    isFavorite={item.isFavorite}
                    isMemoryBook={item.isMemoryBook}
                  />
                );
                break;
            }
          }}
          keyExtractor={(item) => item.index}
        />
      )}

      <LoadingIndicator visible={getFavoriteListAPI.loading} />
    </Block>
  );
};

export default MyFavoriteListingScreen;

const styles = StyleSheet.create({});
