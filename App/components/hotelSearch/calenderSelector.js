import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { Block, Icon, Text } from '../AppTheme/index';
import { IconTypes } from '../AppTheme/Icon';
import colors from '../../config/colors';
import AppButton from '../AppButton';
import { useTranslation } from 'react-i18next';

const calenderSelector = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  return (
    <Block space={'between'} white>
      <CalendarPicker
        startFromMonday={true}
        allowRangeSelection={true}
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
      <Block row center space={'between'} margin={20}>
        <Block>
          <Text
            style={styles.nextTitle}
            bold
            onPress={() => {
              navigation.jumpTo('PersonsTab');
            }}>
            {t('skip')}
          </Text>
        </Block>
        <Block>
          <AppButton
            disabled={selectedEndDate && selectedStartDate ? false : true}
            title={t('next')}
            onPress={() => {
              navigation.jumpTo('PersonsTab', {
                startDate: selectedStartDate.toString(),
                endDate: selectedEndDate.toString(),
              });
            }}
          />
        </Block>
      </Block>
    </Block>
  );
};

export default calenderSelector;

const styles = StyleSheet.create({
  calenderText: {
    fontFamily: 'montserrat-medium',
  },
});
