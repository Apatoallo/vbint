import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import routes from '../../navigation/routes';

import RestaurantVerticalList from '../../components/restaurant/RestaurantVerticalList';
import FloatingMapBtn from '../../components/FloatingMapBtn';
import useApi from '../../hooks/useApi';
import hotels from '../../api/hotels';
import LoadingIndicator from '../../components/LoadingIndicator';
import HotelsVerticalList from '../../components/hotelSearch/HotelsVerticalList';

const HotelMultiListScreen = ({ navigation }) => {
  const getHotelsListApi = useApi(hotels.getHotelsCategories);
  const [hotelsList, setHotelsList] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'left',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
    });
  }, [navigation]);

  const getHotelsList = async (q) => {
    const result = await getHotelsListApi.request(q);

    if (result.ok) {
      setHotelsList((list) => {
        return [...list, ...result.data.data];
      });
    } else {
    }
  };
  useEffect(() => {
    getHotelsList();
  }, []);

  return (
    <Block white>
      <Block scroll contentContainerStyle={styles.contentContainer}>
        {hotelsList.map((item) => {
          if (item.list.length > 0) {
            return (
              <HotelsVerticalList
                title={item.categoryName}
                itemList={item.list}
                onSeeAllPress={() => {
                  navigation.navigate(routes.HOTEL_LISTING_SCREEN, {
                    categoryId: item.categoryTypeId,
                  });
                }}
                onPress={(item) => {
                  navigation.navigate(routes.HOTEL_DETAILS_SCREEN, {
                    id: item.id,
                  });
                }}
              />
            );
          }
        })}
      </Block>
      <FloatingMapBtn
        onPress={() => navigation.navigate(routes.HOTEL_LISTING_MAP_SCREEN)}
      />
      <LoadingIndicator visible={getHotelsListApi.loading} />
    </Block>
  );
};

export default HotelMultiListScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 100,
  },
});
