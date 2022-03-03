import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import routes from '../../navigation/routes';
import useApi from '../../hooks/useApi';
import cafes from '../../api/cafes';
import LoadingIndicator from '../../components/LoadingIndicator';
import tours from '../../api/tours';
import TourVerticalList from '../../components/tour/TourVerticalList';

const RestaurantMultiListScreen = ({ navigation }) => {
  const getToursListApi = useApi(tours.getToursCategories);
  const [toursList, setToursList] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'left',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
    });
  }, [navigation]);

  const getToursList = async (q) => {
    const result = await getToursListApi.request(q);

    if (result.ok) {
      setToursList((list) => {
        return [...list, ...result.data.data];
      });
    } else {
    }
  };
  useEffect(() => {
    getToursList();
  }, []);

  return (
    <Block white>
      <Block scroll>
        {toursList.map((item) => {
          if (item.list.length > 0) {
            return (
              <TourVerticalList
                title={item.categoryName}
                itemList={item.list}
                onSeeAllPress={() => {
                  navigation.navigate(routes.TOUR_LIST_SEE_ALL_SCREEN, {
                    categoryId: item.categoryId,
                  });
                }}
                onPress={(item) => {
                  navigation.navigate(routes.TOUR_DETAIL_SCREEN, {
                    id: item.id,
                  });
                }}
              />
            );
          }
        })}
      </Block>

      <LoadingIndicator visible={getToursListApi.loading} />
    </Block>
  );
};

export default RestaurantMultiListScreen;

const styles = StyleSheet.create({});
