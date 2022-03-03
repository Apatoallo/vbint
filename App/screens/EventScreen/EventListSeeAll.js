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
import activities from '../../api/activities';
import useApi from '../../hooks/useApi';
import AppAlert from '../../utils/AppAlert';
import AppButton from '../../components/AppButton';
import IconContainer from '../../components/IconContainer';
import EventListItem from '../../components/event/EventListItem';
import StartEndDateSelector from '../../components/StartEndDateSelector';
import { useAuthReducer } from '../../reducers/authReducer';
import { useTranslation } from 'react-i18next';

const EventListSeeAll = ({ navigation, route }) => {
  const { t } = useTranslation();
  // redux
  const { userIsVisitor } = useAuthReducer();
  // useState
  const [activitiesListData, setActivitiesListData] = useState({});
  const [activitiesList, setActivitiesList] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [filterSelected, setFilterSelected] = useState(false);

  const getCafesListApi = useApi(activities.getActivitiesListByCategory);
  const [query, setQuery] = useState({
    page: 1,
    categories: route?.params?.categoryId ? [route?.params?.categoryId] : [],
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'left',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,

      headerTitle: () => (
        <Block>
          <TextInput
            style={styles.input}
            onChangeText={(txt) => {
              setQuery({ ...query, searchText: txt, page: 1 });
              if (txt.length > 1) {
                setQuery({ ...query, searchText: txt, page: 1 });
                setActivitiesList([]);
                getActivitiesList({ ...query, searchText: txt, page: 1 });
              } else if (txt.length === 0) {
                getActivitiesList({ ...query, page: 1 });
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
              navigation.navigate(routes.EVENT_FILTERS_SCREEN, {
                filters: activitiesListData.filters,
                onReturn: (selectedFilters) => {
                  setFilterSelected(true);
                  setQuery({
                    ...query,

                    ...selectedFilters,
                  });
                  setActivitiesList([]);
                  getActivitiesList({
                    ...query,
                    ...selectedFilters,
                  });
                },
                onDeleteAll: () => {
                  setFilterSelected(false);
                  setQuery({
                    ...query,
                  });
                  setActivitiesList([]);
                  getActivitiesList({
                    ...query,
                  });
                },
              });
            }}
          />
        </Block>
      ),
    });
  }, [activitiesListData.filters, navigation, query]);

  const getActivitiesList = async (q) => {
    const result = await getCafesListApi.request({
      ...q,
    });

    if (result.ok) {
      setActivitiesListData(result.data.data);
      setActivitiesList((list) => {
        return [...list, ...result.data.data.list];
      });
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          setQuery({ page: 1 });
          getActivitiesList({ page: 1 });
        },
        okText: t('try_again'),
      });
    }
  };
  useEffect(() => {
    getActivitiesList(query);
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
                      getActivitiesList({ page: 1 });
                    }}
                  />
                </Block>
              </Block>
            ) : null
          }
          data={activitiesList}
          renderItem={({ item }) => (
            <EventListItem
              onPress={() => {
                navigation.navigate(routes.EVENT_DETAIL, {
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
              date={item.startingDate}
              time={item.duration + ' ' + item.durationUnit}
              priceAverage={item.priceAverage}
              leftDay={item.leftDay}
            />
          )}
          keyExtractor={(item) => item.index}
          onEndReachedThreshold={0}
          onEndReached={() => {
            if (
              activitiesListData.pagination.currentPage >=
              activitiesListData.pagination.lastPage
            ) {
            } else {
              if (!getCafesListApi.loading) {
                setQuery({ ...query, page: query.page + 1 });
                getActivitiesList({ ...query, page: query.page + 1 });
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
        onPress={() => navigation.navigate(routes.EVENT_LIST_MAP)}
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
          setActivitiesList([]);
          getActivitiesList({
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
          setActivitiesList([]);
          getActivitiesList({
            page: 1,
          });
        }}
      />
      <IconContainer
        size={60}
        icon={{
          type: IconTypes.fontAwesome5,
          name: 'theater-masks',
          size: 28,
          color: colors.underlinedText,
        }}
        onPress={() => {
          if (userIsVisitor) {
            navigation.navigate(routes.LOGIN_STACK, { screen: routes.SING_IN });
          } else {
            navigation.navigate(routes.EVENT_SUGGEST);
          }
        }}
        style={styles.theaterIcon}
      />
    </Block>
  );
};

export default EventListSeeAll;

const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    width: 200,
  },
  theaterIcon: {
    position: 'absolute',
    bottom: 85,
    right: 25,
  },
});
