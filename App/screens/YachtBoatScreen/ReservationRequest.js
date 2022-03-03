import React, { useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Block, Text } from '../../components/AppTheme/index';
import AppButton from '../../components/AppButton';
import PersonCountSelector from '../../components/PersonCountSelector';
import colors from '../../config/colors';
import routes from '../../navigation/routes';
import TimePicker from '../../components/TimePicker';
import RestaurantDateSelector from '../../components/restaurant/RestaurantDateSelector';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const ReservationRequest = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { boat } = route.params;
  const [adultsCount, setAdultsCount] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [time, setTime] = useState(null);

  return (
    <Block
      paddingHorizontal={16}
      white
      scroll
      contentContainerStyle={styles.contentContainer}>
      <Text notera marginLeft color={colors.lightGray} size={45}>
        {boat.title}
      </Text>
      <Text bold title marginBottom={25}>
        {boat.title}
      </Text>
      <Block>
        <RestaurantDateSelector
          range
          title={t('start_end_date')}
          onRangeSelect={(startDate, endDate) => {
            console.log(startDate, endDate);
            setStartDate(startDate);
            setEndDate(endDate);
          }}
        />
        <TimePicker
          title={t('time')}
          defaultDate={startDate}
          onSave={(newTime) => {
            setTime(newTime);
          }}
          marginTop
          noflex
        />
        <Block flex={0} marginTop>
          <PersonCountSelector
            titleSize={16}
            marginHorizontal={0}
            title={t('person_count')}
            subTitle={''}
            name={t('person')}
            updateCount={(count) => {
              setAdultsCount(count);
            }}
          />
        </Block>
      </Block>

      <Block flex={0}>
        <AppButton
          title={t('go_on')}
          onPress={() => {
            navigation.navigate(routes.RESERVATION_PERSON_INFO, {
              type: 'restaurant',
              data: {
                person: adultsCount,
                departureDate: startDate.format('YYYY-MM-DD'),
                returnDate: endDate.format('YYYY-MM-DD'),
                time: moment(time).format('LT'),
                id: boat.id,
                moduleId: boat.moduleId,
              },
            });
          }}
          style={styles.continueButton}
          disabled={adultsCount && startDate && time ? false : true}
        />
      </Block>
    </Block>
  );
};

export default ReservationRequest;

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
