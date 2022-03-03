import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { Block, Icon, Text } from '../AppTheme/index';
import { IconTypes } from '../AppTheme/Icon';
import colors from '../../config/colors';
import AppButton from '../AppButton';

const Calendar = ({
  onSave,
  allowRangeSelection = true,
  backDate = false,
  nextDate = false,
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const minDate = new Date(); // Today

  return (
    <Block scroll white>
      <CalendarPicker
        startFromMonday={true}
        height={Dimensions.get('screen').height * 0.5}
        allowRangeSelection={allowRangeSelection}
        minDate={backDate ? null : minDate}
        maxDate={nextDate ? minDate : null}
        weekdays={['Pzt ', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Pzr']}
        months={[
          'Ocak',
          'Şubat',
          'Mart',
          'Nisan',
          'Mayıs',
          'Haziran',
          'Temmuz',
          'Ağustos',
          'Eylül',
          'Ekim',
          'Kasım',
          'Aralık',
        ]}
        selectYearTitle={'Yılı seçınız '}
        selectMonthTitle={'Ayı seçınız '}
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
        textStyle={styles.calenderText}
        todayBackgroundColor={colors.secondary}
        selectedDayColor={colors.btnBg}
        selectedDayTextColor="#FFFFFF"
        onDateChange={(date, type) => {
          if (type === 'END_DATE') {
            setSelectedEndDate(date);
          } else {
            setSelectedStartDate(date);
            setSelectedEndDate(null);
          }
        }}
      />
      <Block noflex paddingHorizontal={20}>
        <AppButton
          title={'Kaydet'}
          onPress={() => {
            onSave({
              startDate: selectedStartDate,
              endDate: selectedEndDate,
            });
          }}
          disabled={
            allowRangeSelection
              ? selectedStartDate && selectedEndDate
                ? false
                : true
              : false
          }
        />
      </Block>
    </Block>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  calenderText: {
    fontFamily: 'montserrat-medium',
  },
});
