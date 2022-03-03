import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import routes from '../../navigation/routes';

import RestaurantVerticalList from '../../components/restaurant/RestaurantVerticalList';
import FloatingMapBtn from '../../components/FloatingMapBtn';
import useApi from '../../hooks/useApi';
import cafes from '../../api/cafes';
import LoadingIndicator from '../../components/LoadingIndicator';

const RestaurantMultiListScreen = ({ navigation }) => {
  const getCafesListApi = useApi(cafes.getCafesCategories);
  const [cafesList, setCafesList] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'left',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
    });
  }, [navigation]);

  const getCafesList = async (q) => {
    const result = await getCafesListApi.request(q);

    if (result.ok) {
      setCafesList((list) => {
        return [...list, ...result.data.data];
      });
    } else {
    }
  };
  useEffect(() => {
    getCafesList();
  }, []);

  return (
    <Block white>
      <Block scroll contentContainerStyle={styles.contentContainer}>
        {cafesList.map((item) => {
          if (item.list.length > 0) {
            return (
              <RestaurantVerticalList
                title={item.categoryName}
                itemList={item.list}
                onSeeAllPress={() => {
                  navigation.navigate(routes.RESTAURANT_LIST_SCREEN, {
                    categoryId: item.categoryTypeId,
                  });
                }}
                onPress={(item) => {
                  navigation.navigate(routes.RESTAURANT_DETAILS_SCREEN, {
                    id: item.id,
                  });
                }}
              />
            );
          }
        })}
      </Block>
      <FloatingMapBtn
        onPress={() => navigation.navigate(routes.RESTAURANT_MAP_LIST_SCREEN)}
      />
      <LoadingIndicator visible={getCafesListApi.loading} />
    </Block>
  );
};

export default RestaurantMultiListScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 100,
  },
});
