import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import routes from '../../navigation/routes';
import colors from '../../config/colors';
import IconWithClick from '../../components/IconWithClick';
import { IconTypes } from '../../components/AppTheme/Icon';
import FloatingMapBtn from '../../components/FloatingMapBtn';
import RestaurantListItem from '../../components/restaurant/RestaurantListItem';
import { TextInput } from '../../components/AppTheme/index';
import cafes from '../../api/cafes';
import useApi from '../../hooks/useApi';
import AppAlert from '../../utils/AppAlert';
import AppButton from '../../components/AppButton';
import { useTranslation } from 'react-i18next';

const RestaurantListScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [cafesListData, setCafesListData] = useState({});
  const [cafesList, setCafesList] = useState([]);
  const getCafesListApi = useApi(cafes.getCafesListByCategory);
  const [query, setQuery] = useState({
    page: 1,
    categories: route?.params?.categoryId ? [route?.params?.categoryId] : [],
  });
  const [filterSelected, setFilterSelected] = useState(false);

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
                setCafesList([]);
                getCafesList({ ...query, searchText: txt, page: 1 });
              } else if (txt.length === 0) {
                getCafesList({ ...query, page: 1 });
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
            name={'filter'}
            type={IconTypes.antdesign}
            size={20}
            showBadge={filterSelected}
            color={colors.semiBlack}
            marginRight
            marginLeft
            onPress={() => {
              navigation.navigate(routes.RESTAURANT_FILTERS_SCREEN, {
                filters: cafesListData.filters,
                onReturn: (selectedFilters) => {
                  setFilterSelected(true);
                  setQuery({
                    ...query,
                    page: 1,
                    ...selectedFilters,
                  });
                  setCafesList([]);
                  getCafesList({
                    ...query,
                    page: 1,
                    ...selectedFilters,
                  });
                },
                onDeleteAll: () => {
                  setFilterSelected(false);
                  setQuery({
                    page: 1,
                    categories: route?.params?.categoryId
                      ? [route?.params?.categoryId]
                      : [],
                  });
                  setCafesList([]);
                  getCafesList({
                    page: 1,
                    categories: route?.params?.categoryId
                      ? [route?.params?.categoryId]
                      : [],
                  });
                },
              });
            }}
          />
        </Block>
      ),
    });
  }, [cafesListData.filters, navigation, query]);

  const getCafesList = async (q) => {
    const result = await getCafesListApi.request({
      ...q,
    });

    if (result.ok) {
      setCafesListData(result.data.data);
      setCafesList((list) => {
        return [...list, ...result.data.data.list];
      });
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          setQuery({ page: 1 });
          getCafesList({ page: 1 });
        },
        okText: t('try_again'),
      });
    }
  };
  useEffect(() => {
    getCafesList(query);
  }, []);

  return (
    <Block white>
      <Block>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() =>
            !getCafesListApi.loading ? (
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
                      getCafesList({ page: 1 });
                    }}
                  />
                </Block>
              </Block>
            ) : null
          }
          data={cafesList}
          renderItem={({ item }) => (
            <RestaurantListItem
              onPress={() => {
                navigation.navigate(routes.RESTAURANT_DETAILS_SCREEN, {
                  id: item.id,
                });
              }}
              title={item.title}
              description={item.description}
              address={item.address}
              ratting={item.ratting}
              imageList={item.images}
              isFavorite={item.isFavorite}
              isMemoryBook={item.isMemoryBook}
            />
          )}
          keyExtractor={(item) => item.index}
          onEndReachedThreshold={0}
          onEndReached={() => {
            if (
              cafesListData.pagination.currentPage >=
              cafesListData.pagination.lastPage
            ) {
            } else {
              if (!getCafesListApi.loading) {
                setQuery({ ...query, page: query.page + 1 });
                getCafesList({ ...query, page: query.page + 1 });
              }
            }
          }}
          ListFooterComponent={() => {
            return (
              <Block>
                {getCafesListApi.loading ? (
                  <ActivityIndicator
                    size="large"
                    color={colors.primary}
                    style={{ marginLeft: 6 }}
                  />
                ) : null}
              </Block>
            );
          }}
        />
      </Block>
      <FloatingMapBtn
        onPress={() => navigation.navigate(routes.RESTAURANT_MAP_LIST_SCREEN)}
      />
    </Block>
  );
};

export default RestaurantListScreen;

const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    width: 200,
  },
});
