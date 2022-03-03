import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import { Block, Text } from '../../components/AppTheme';
import colors from '../../config/colors';
import TodayActivityListItem from '../../components/myCalender/TodayActivityListItem';
import HourListItem from '../../components/myCalender/HourListItem';
import HourListItemNow from '../../components/myCalender/HourListItemNow';
import EmptyHourListItem from '../../components/myCalender/EmptyHourListItem';
import moment from 'moment';
import localization from 'moment/locale/tr';
import EditPlanPopup from '../../components/myPlan/EditPlanPopup';
import profile from '../../api/profile';
import useApi from '../../hooks/useApi';
import LoadingIndicator from '../../components/LoadingIndicator';
import MessagePopup from '../../components/MessagePopup';
import CalenderDayItem from '../../components/myCalender/CalenderDayItem';
import { useTranslation } from 'react-i18next';

const MyCalenderScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPlanItem, setSelectedPlanItem] = useState(null);
  const [plansData, setPlansData] = useState([]);
  const [planItems, setPlanItems] = useState([]);
  const [editVisible, setEditVisible] = useState(false);
  const getTravelPlansApi = useApi(profile.getTravelPlansWeek);
  const deleteTravelPlanApi = useApi(profile.deleteTravelPlan);
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  moment.updateLocale('tr', localization);

  const getPlans = async () => {
    const result = await getTravelPlansApi.request();

    if (result.ok) {
      setPlansData(result.data.data);
      setSelectedDate(result.data.data[0]);
    } else {
    }
  };

  const deleteTravelPlan = async (id) => {
    const result = await deleteTravelPlanApi.request(id);
    if (result.ok) {
      setMessagePopupVisible({
        isVisible: true,
        title: t('successful'),
        subTitle: result.data.message,
      });
      getPlans();
    } else {
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'center',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
      headerTitle: (props) => (
        <Text bold numberOfLines={1} size={18}>
          {t('my_calendar')}
        </Text>
      ),
    });
  }, [navigation]);
  const nowTime = 10;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPlans();
    });

    return unsubscribe;
  }, []);

  return (
    <Block>
      <Block white scroll contentContainerStyle={styles.contentContainer}>
        <Block flex={0}>
          <FlatList
            data={plansData}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => {
              const myDate = moment(item?.planDay, 'YYYY-MM-DD').toDate();
              return (
                <CalenderDayItem
                  showBadge={
                    item?.hours?.filter((h) => {
                      return h.items !== null;
                    }).length > 0
                  }
                  dayName={moment(myDate).format('dddd').charAt(0)}
                  dayNumber={moment(myDate).format('D')}
                  selected={
                    selectedDate?.planDay === item?.planDay ? true : false
                  }
                  onPress={() => {
                    console.log(item);
                    setSelectedDate(item);
                    setPlanItems(
                      item?.hours?.filter((h) => {
                        return h.items !== null;
                      }),
                    );
                  }}
                />
              );
            }}
            keyExtractor={(item) => item.index}
          />
        </Block>
        <Block>
          <Block margin={[16, 16, 0, 16]} row center>
            <Text medium size={24}>
              {t('today_events')}
            </Text>
            <Block
              flex={0}
              padding={[2, 8, 2, 8]}
              radius={8}
              marginLeft
              color={colors.underlinedText}>
              <Text size={14} white>
                {planItems.length}
              </Text>
            </Block>
          </Block>
          <Block flex={0}>
            <FlatList
              data={
                selectedDate
                  ? selectedDate?.hours?.filter((h) => {
                      return h.items !== null;
                    })
                  : []
              }
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ padding: 16 }}
              renderItem={({ item }) => (
                <TodayActivityListItem item={item.items} onPress={() => {}} />
              )}
              keyExtractor={(item) => item.index}
            />
          </Block>
          <Block>
            <FlatList
              data={selectedDate?.hours}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
              renderItem={({ item }) => {
                return item?.items ? (
                  item.time === nowTime ? (
                    <HourListItemNow
                      time={item.title}
                      title={item?.items?.title}
                      subTitle={
                        item?.items?.startTime + ' - ' + item?.items?.startTime
                      }
                      onPress={() => {
                        setEditVisible(true);
                        setSelectedPlanItem(item.items);
                      }}
                      color={item?.items?.color}
                    />
                  ) : (
                    <HourListItem
                      time={item.title}
                      title={item?.items.title}
                      subTitle={
                        item?.items?.startTime + ' - ' + item?.items?.startTime
                      }
                      onPress={() => {
                        setEditVisible(true);
                        setSelectedPlanItem(item.items);
                      }}
                      color={item?.items?.color}
                    />
                  )
                ) : (
                  <EmptyHourListItem
                    time={item.title}
                    onPress={() => {
                      setEditVisible(true);
                    }}
                    color={item?.items?.color}
                  />
                );
              }}
              keyExtractor={(item) => item.index}
            />
          </Block>
        </Block>
        <EditPlanPopup
          isVisible={editVisible}
          item={selectedPlanItem}
          hideModal={() => {
            setEditVisible(false);
          }}
          onDelete={(item) => {
            setEditVisible(false);
            deleteTravelPlan(item.planId);
          }}
        />
      </Block>

      <LoadingIndicator
        visible={getTravelPlansApi.loading || deleteTravelPlanApi.loading}
      />
      <MessagePopup
        isVisible={messagePopupVisible.isVisible}
        title={messagePopupVisible.title}
        subTitle={messagePopupVisible.subTitle}
        hideModal={() => {
          setMessagePopupVisible({ isVisible: false });
        }}
      />
    </Block>
  );
};

export default MyCalenderScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 100,
  },
  image: { height: 100, width: 100, marginRight: -24, opacity: 0.2 },
  theaterIcon: {
    position: 'absolute',
    bottom: 110,
    right: 24,
    backgroundColor: colors.underlinedText,
  },
  calenderText: {
    fontFamily: 'montserrat-medium',
  },
});
