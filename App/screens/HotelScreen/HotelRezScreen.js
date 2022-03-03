import React, { useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Block, Text } from '../../components/AppTheme/index';
import AppButton from '../../components/AppButton';
import PersonCountSelector from '../../components/PersonCountSelector';
import colors from '../../config/colors';
import routes from '../../navigation/routes';
import RoomSelectorItem from '../../components/hotelSearch/RoomSelectorItem';
import hotels from '../../api/hotels';
import useApi from '../../hooks/useApi';
import AppAlert from '../../utils/AppAlert';
import RestaurantDateSelector from '../../components/restaurant/RestaurantDateSelector';
import ChildAgeSelector from '../../components/hotelSearch/ChildAgeSelector';
import { useTranslation } from 'react-i18next';

const HotelRezScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { hotel } = route.params;
  const [adultsCount, setAdultsCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [roomList, setRoomList] = useState([]);
  const [childList, setChildList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const getHotelRoomsApi = useApi(hotels.getHotelRooms);

  const getHotelRooms = async (q) => {
    const result = await getHotelRoomsApi.request(q);

    if (result.ok) {
      setRoomList(result.data.data);
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          navigation.goBack();
        },
      });
    }
  };
  return (
    <Block
      paddingHorizontal={16}
      white
      scroll
      contentContainerStyle={styles.contentContainer}>
      <Text notera marginLeft color={colors.lightGray} size={45}>
        {hotel.title}
      </Text>
      <Text bold title marginBottom={25}>
        {hotel.title}
      </Text>
      <Block>
        <RestaurantDateSelector
          range
          title={t('round_trip_date')}
          onRangeSelect={(start, end) => {
            setStartDate(start.format('YYYY-MM-DD'));
            setEndDate(end.format('YYYY-MM-DD'));
            getHotelRooms({
              startDate: start.format('YYYY-MM-DD'),
              finishDate: end.format('YYYY-MM-DD'),
              id: hotel.id,
            });
          }}
        />
        <Block noflex marginTop row space={'between'}>
          <Block nofelx marginRight>
            <PersonCountSelector
              titleSize={16}
              marginHorizontal={0}
              title={t('adults')}
              name={t('adult')}
              updateCount={(count) => {
                setAdultsCount(count);
              }}
            />
          </Block>
          <Block nofelx marginLeft>
            <PersonCountSelector
              titleSize={16}
              marginHorizontal={0}
              title={t('child')}
              name={t('children')}
              updateCount={(count) => {
                setChildrenCount(count);
                let oldList = childList;
                count > childList.length
                  ? oldList.push(hotel.ageList[0].title)
                  : oldList.pop();
                setChildList(oldList);
              }}
              max={hotel.maxCount}
            />
          </Block>
        </Block>
        <Block flex={0}>
          {Array.from(Array(childrenCount), (e, i) => {
            return (
              <ChildAgeSelector
                list={hotel.ageList}
                title={i + 1 + '. Çocuk Yaşı'}
                onSelect={(item) => {
                  let oldList = childList;
                  oldList[i] = item.title;
                  setChildList(oldList);
                }}
              />
            );
          })}
        </Block>
        <Block flex={0}>
          <Block marginTop>
            <RoomSelectorItem
              title={t('choose_room')}
              list={roomList}
              onSelect={(room) => {
                setSelectedRoom(room);
              }}
            />
          </Block>
        </Block>
      </Block>

      <Block flex={0} marginTop={16}>
        <AppButton
          title={t('go_on')}
          onPress={() => {
            navigation.navigate(routes.HOTEL_REZ_USER_INFO_SCREEN, {
              data: {
                hotelId: hotel.id,
                entryDate: startDate,
                releaseDate: endDate,
                person: adultsCount,
                child: childList,
                roomId: selectedRoom.roomId,
              },
            });
          }}
          style={styles.continueButton}
          disabled={
            adultsCount && startDate && endDate && selectedRoom ? false : true
          }
        />
      </Block>
    </Block>
  );
};

export default HotelRezScreen;

const styles = StyleSheet.create({
  block: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    backgroundColor: ' rgba(52, 52, 52, 0.5)',
  },

  contentContainer: {
    flexGrow: 1,
    paddingBottom: Platform.OS === 'android' ? 16 : 0,
  },
});
