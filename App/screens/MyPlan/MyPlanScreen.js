import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Image } from 'react-native';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import { Block, Text } from '../../components/AppTheme';
import colors from '../../config/colors';
import TodayActivityListItem from '../../components/myCalender/TodayActivityListItem';
import HourListItem from '../../components/myCalender/HourListItem';
import HourListItemNow from '../../components/myCalender/HourListItemNow';
import EmptyHourListItem from '../../components/myCalender/EmptyHourListItem';
import CalendarPicker from 'react-native-calendar-picker';
import { IconTypes, Icon } from '../../components/AppTheme/Icon';
import moment from 'moment';
import localization from 'moment/locale/tr';
import IconContainer from '../../components/IconContainer';
import EditPlanPopup from '../../components/myPlan/EditPlanPopup';
import routes from '../../navigation/routes';
import profile from '../../api/profile';
import useApi from '../../hooks/useApi';
import LoadingIndicator from '../../components/LoadingIndicator';
import MessagePopup from '../../components/MessagePopup';
import { useTranslation } from 'react-i18next';

const MyPlanScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(new moment());
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPlanItem, setSelectedPlanItem] = useState(null);
  const [plansData, setPlansData] = useState([]);
  const [planItems, setPlanItems] = useState([]);
  const [editVisible, setEditVisible] = useState(false);
  const getTravelPlansApi = useApi(profile.getTravelPlans);
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
      setPlansData([]);
      setSelectedPlan(null);
      setSelectedPlanItem(null);
      setPlanItems([]);
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
          {t('travel_plan')}
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
          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={false}
            weekdays={[
              t('mon'),
              t('tues'),
              t('wed'),
              t('thurs'),
              t('fri'),
              t('sat'),
              t('sun'),
            ]}
            months={[
              t('january'),
              t('february'),
              t('march'),
              t('april'),
              t('may'),
              t('june'),
              t('july'),
              t('august'),
              t('september'),
              t('october'),
              t('november'),
              t('december'),
            ]}
            selectYearTitle={t('select_year')}
            selectMonthTitle={t('select_month')}
            scaleFactor={375}
            nextComponent={
              <Icon
                type={IconTypes.fontAwesome}
                name={'angle-right'}
                color="black"
                size={30}
              />
            }
            previousComponent={
              <Icon
                type={IconTypes.fontAwesome}
                name={'angle-left'}
                color="black"
                size={30}
              />
            }
            customDatesStyles={plansData?.map((item) => {
              return {
                date: new Date(item.planDay),
                // Random colors
                style: {
                  backgroundColor: colors.inputBorder,
                },
                textStyle: { color: 'black' }, // sets the font color
                containerStyle: [], // extra styling for day container
                allowDisabled: true, // allow custom style to apply to disabled dates
              };
            })}
            textStyle={styles.calenderText}
            todayBackgroundColor={colors.secondary}
            selectedDayColor={colors.btnBg}
            selectedDayTextColor="#FFFFFF"
            onDateChange={(date, type) => {
              setSelectedDate(date);
              const item = plansData.find((item) => {
                return item.planDay === date.format('YYYY-MM-DD');
              });
              if (item) {
                setSelectedPlan(item);
                setPlanItems(
                  item?.hours?.filter((h) => {
                    return h.items !== null;
                  }),
                );
              } else {
                setSelectedPlan(null);
                setPlanItems([]);
              }
            }}
          />
        </Block>
        <Block>
          <Block center row>
            <Block marginLeft={16}>
              <Text color={colors.calenderGrey} size={18}>
                {t('calendar')}
              </Text>
              <Text color={colors.hotelCardGrey} size={20} bold>
                {selectedDate?.format('Do MMMM, dddd')}
              </Text>
            </Block>
            <Image
              style={styles.image}
              source={require('../../assets/images/calender.png')}
            />
          </Block>
          <Block margin={[16, 16, 0, 16]} row center>
            <Text medium size={24}>
              {t('activities')}
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
          {/* <Block flex={0}>
            <FlatList
              data={selectedPlan?.hours?.filter((h) => {
                return h.items !== null;
              })}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ padding: 16 }}
              renderItem={({ item }) => (
                <TodayActivityListItem
                  item={item.items}
                  onPress={() => {
                    setEditVisible(true);
                    setSelectedPlanItem(item.items);
                  }}
                />
              )}
              keyExtractor={(item) => item.index}
            />
          </Block> */}
          <Block>
            <FlatList
              data={selectedPlan?.hours}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
              renderItem={({ item }) => {
                return item?.items ? (
                  <TodayActivityListItem
                    item={item.items}
                    onPress={() => {
                      setEditVisible(true);
                      setSelectedPlanItem(item.items);
                    }}
                  />
                ) : (
                  // item.time === nowTime ? (
                  //   <HourListItemNow
                  //     time={item.title}
                  //     title={item?.items?.title}
                  //     subTitle={
                  //       item?.items?.startTime + ' - ' + item?.items?.startTime
                  //     }
                  //     onPress={() => {
                  //       setEditVisible(true);
                  //       setSelectedPlanItem(item.items);
                  //     }}
                  //     color={item?.items?.color}
                  //   />
                  // ) : (
                  //   <HourListItem
                  //     time={item.title}
                  //     title={item?.items.title}
                  //     subTitle={
                  //       item?.items?.startTime + ' - ' + item?.items?.startTime
                  //     }
                  //     onPress={() => {
                  //       setEditVisible(true);
                  //       setSelectedPlanItem(item.items);
                  //     }}
                  //     color={item?.items?.color}
                  //   />
                  // )
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
      <IconContainer
        size={60}
        icon={{
          type: IconTypes.antdesign,
          name: 'plus',
          size: 28,
          color: colors.white,
        }}
        onPress={() => {
          navigation.navigate(routes.TRAVEL_PLAN_STACK);
        }}
        style={styles.theaterIcon}
      />
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

export default MyPlanScreen;

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
