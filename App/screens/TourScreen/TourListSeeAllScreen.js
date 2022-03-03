import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import routes from '../../navigation/routes';
import colors from '../../config/colors';
import VerticalSeparator from '../../components/VerticalSeparator';
import IconWithClick from '../../components/IconWithClick';
import { IconTypes } from '../../components/AppTheme/Icon';
import { TextInput } from '../../components/AppTheme/index';
import tours from '../../api/tours';
import useApi from '../../hooks/useApi';
import AppAlert from '../../utils/AppAlert';
import AppButton from '../../components/AppButton';
import TourListItem from '../../components/tour/TourListItem';
import StartEndDateSelector from '../../components/StartEndDateSelector';
import { useTranslation } from 'react-i18next';

const TourListSeeAllScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [tourListData, setTourListData] = useState({});
  const [tourList, setTourList] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const getTourListApi = useApi(tours.getToursListByCategory);
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
                setTourList([]);
                getToursList({ ...query, searchText: txt, page: 1 });
              } else if (txt.length === 0) {
                getToursList({ ...query, page: 1 });
              }
            }}
            value={query?.searchText}
            placeholder={t('what_are_you_looking_for')}
          />
        </Block>
      ),
      headerRight: () => (
        <Block center row marginRight>
          <Text
            onPress={() => {
              setCalendarVisible(true);
            }}
            color={colors.secondary}
            bold
            size={14}
            marginRight>
            {startDate ? t('date_added') : t('add_date')}
          </Text>
          <VerticalSeparator backgroundColor={colors.blackGrey} />
          <IconWithClick
            name={'filter'}
            type={IconTypes.antdesign}
            size={20}
            color={colors.semiBlack}
            marginRight
            marginLeft
            onPress={() => {
              navigation.navigate(routes.TOUR_FILTERS_SCREEN, {
                filters: tourListData.filters,
                onReturn: (selectedFilters) => {
                  setFilterSelected(true);
                  setQuery({
                    ...query,
                    page: 1,
                    ...selectedFilters,
                  });
                  setTourList([]);
                  getToursList({
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
                  setTourList([]);
                  getToursList({
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
  }, [tourListData.filters, navigation, query]);

  const getToursList = async (q) => {
    const result = await getTourListApi.request({
      ...q,
    });

    if (result.ok) {
      setTourListData(result.data.data);
      setTourList((list) => {
        return [...list, ...result.data.data.list];
      });
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          setQuery({ page: 1 });
          getToursList({ page: 1 });
        },
        okText: t('try_again'),
      });
    }
  };
  useEffect(() => {
    getToursList(query);
  }, []);

  return (
    <Block white>
      <Block>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() =>
            !getTourListApi.loading ? (
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
                      getToursList({ page: 1 });
                    }}
                  />
                </Block>
              </Block>
            ) : null
          }
          data={tourList}
          renderItem={({ item }) => (
            <TourListItem
              onPress={() => {
                navigation.navigate(routes.TOUR_DETAIL_SCREEN, {
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
              discountedPrice={item.discountedPrice}
              price={item.price}
              maxPerson={item.maxPerson}
              duration={item.duration}
            />
          )}
          keyExtractor={(item) => item.index}
          onEndReachedThreshold={0}
          onEndReached={() => {
            if (
              tourListData.pagination.currentPage >=
              tourListData.pagination.lastPage
            ) {
            } else {
              if (!getTourListApi.loading) {
                setQuery({ ...query, page: query.page + 1 });
                getToursList({ ...query, page: query.page + 1 });
              }
            }
          }}
          ListFooterComponent={() => {
            return (
              <Block>
                {getTourListApi.loading ? (
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

      <StartEndDateSelector
        isVisible={calendarVisible}
        onClose={() => {
          setCalendarVisible(false);
        }}
        allowRangeSelection
        showRemove={true}
        onSelect={({ startDate, endDate }) => {
          setCalendarVisible(false);
          setStartDate(startDate.format('DD-MM-YYYY'));
          setEndDate(endDate.format('DD-MM-YYYY'));
          setQuery({
            ...query,
            page: 1,
            departureDate: startDate.format('DD-MM-YYYY'),
            returnDate: endDate.format('DD-MM-YYYY'),
          });
          setTourList([]);
          getToursList({
            ...query,
            page: 1,
            departureDate: startDate.format('DD-MM-YYYY'),
            returnDate: endDate.format('DD-MM-YYYY'),
          });
        }}
        onRemove={() => {
          setCalendarVisible(false);
          setStartDate(null);
          setEndDate(null);
          setQuery({
            page: 1,
          });
          setTourList([]);
          getToursList({
            page: 1,
          });
        }}
      />
    </Block>
  );
};

export default TourListSeeAllScreen;

const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    width: 200,
  },
});
