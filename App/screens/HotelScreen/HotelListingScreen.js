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
import FloatingMapBtn from '../../components/FloatingMapBtn';
import { TextInput } from '../../components/AppTheme/index';
import hotels from '../../api/hotels';
import useApi from '../../hooks/useApi';
import LocationPermissionPopUp from '../../components/opportunities/LocationPermissionPopUp';
import { openSettings } from 'react-native-permissions';
import AppAlert from '../../utils/AppAlert';
import AppButton from '../../components/AppButton';
import HotelListItem from '../../components/hotelSearch/HotelListItem';
import StartEndDateSelector from '../../components/StartEndDateSelector';
import { useTranslation } from 'react-i18next';

const HotelListingScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [hotelsListData, setHotelsListData] = useState({});
  const [HotelsList, setHotelsList] = useState([]);
  const [filterSelected, setFilterSelected] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const getHotelsListApi = useApi(hotels.getHotelsListByCategory);
  const [query, setQuery] = useState({
    page: 1,
    categories: route?.params?.categoryId ? [route?.params?.categoryId] : [],
  });
  const [locationPermissionVisible, setLocationPermissionVisible] =
    useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'left',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,

      headerTitle: (props) => (
        <Block noflex>
          <TextInput
            style={styles.input}
            onChangeText={(txt) => {
              setQuery({ ...query, searchText: txt, page: 1 });
              if (txt.length > 1) {
                setQuery({ ...query, searchText: txt, page: 1 });
                setHotelsList([]);
                getHotelsList({ ...query, searchText: txt, page: 1 });
              } else if (txt.length === 0) {
                getHotelsList({ ...query, page: 1 });
              }
            }}
            value={query?.searchText}
            placeholder={t('what_are_you_looking_for')}
          />
        </Block>
      ),
      headerRight: () => (
        <Block center middle>
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
            <VerticalSeparator backgroundColor={colors.lightGray} />
            <IconWithClick
              name={'filter'}
              type={IconTypes.antdesign}
              size={20}
              showBadge={filterSelected}
              color={colors.semiBlack}
              marginRight
              marginLeft
              onPress={() => {
                navigation.navigate(routes.HOTEL_FILTERS_SCREEN, {
                  filters: hotelsListData.filters,
                  onReturn: (selectedFilters) => {
                    setFilterSelected(true);
                    setQuery({
                      ...query,
                      page: 1,
                      ...selectedFilters,
                    });
                    setHotelsList([]);
                    getHotelsList({
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
                    setHotelsList([]);
                    getHotelsList({
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
        </Block>
      ),
    });
  }, [hotelsListData.filters, navigation, query, filterSelected, startDate]);

  const getHotelsList = async (q) => {
    const result = await getHotelsListApi.request({
      ...q,
    });

    if (result.ok) {
      setHotelsListData(result.data.data);
      setHotelsList((list) => {
        return [...list, ...result.data.data.list];
      });
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          setQuery({ page: 1 });
          getHotelsList({ page: 1 });
        },
        okText: t('try_again'),
      });
    }
  };
  useEffect(() => {
    getHotelsList(query);
  }, []);

  return (
    <Block white>
      <Block>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() =>
            !getHotelsListApi.loading ? (
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
                      setFilterSelected(true);
                      setQuery({ page: 1 });
                      getHotelsList({ page: 1 });
                    }}
                  />
                </Block>
              </Block>
            ) : null
          }
          data={HotelsList}
          renderItem={({ item }) => (
            <HotelListItem
              onPress={() => {
                navigation.navigate(routes.HOTEL_DETAILS_SCREEN, {
                  id: item.id,
                });
              }}
              title={item.title}
              description={item.description}
              address={item.address}
              ratting={item.rating}
              imageList={item.images}
              isFavorite={item.isFavorite}
              isMemoryBook={item.isMemoryBook}
              isCampaign={item.campaign}
              price={item.price}
            />
          )}
          keyExtractor={(item) => item.index}
          onEndReachedThreshold={0}
          onEndReached={() => {
            if (
              hotelsListData.pagination.currentPage >=
              hotelsListData.pagination.lastPage
            ) {
            } else {
              if (!getHotelsListApi.loading) {
                setQuery({ ...query, page: query.page + 1 });
                getHotelsList({ ...query, page: query.page + 1 });
              }
            }
          }}
          ListFooterComponent={() => {
            return (
              <Block>
                {getHotelsListApi.loading ? (
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
        onPress={() => navigation.navigate(routes.HOTEL_LISTING_MAP_SCREEN)}
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
          setHotelsList([]);
          getHotelsList({
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
          setHotelsList([]);
          getHotelsList({
            page: 1,
          });
        }}
      />
    </Block>
  );
};

export default HotelListingScreen;

const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    width: 200,
  },
});
