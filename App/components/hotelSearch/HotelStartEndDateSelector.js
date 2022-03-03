import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text, Icon } from '../AppTheme';
import colors from '../../config/colors';
import { IconTypes } from '../AppTheme/Icon';
import StartEndDateSelector from '../StartEndDateSelector';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const HotelStartEndDateSelector = ({ title = '', onSelect }) => {
  const { t } = useTranslation();
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  return (
    <Block flex={0}>
      <Text bold>{title}</Text>
      <TouchableOpacity
        onPress={() => {
          setCalendarVisible(true);
        }}>
        <Block
          marginTop
          row
          center
          space={'between'}
          padding={12}
          radius={12}
          borderWidth={0.5}
          borderColor={colors.inputBorder}>
          <Text color={'#5191FA'}>
            {startDate
              ? moment(startDate).format('LL') +
                ' - ' +
                moment(endDate).format('LL')
              : t('choose')}
          </Text>
          <Icon
            name={'calendar-blank-outline'}
            type={IconTypes.materialCommunity}
            size={24}
            color={colors.secondary}
          />
        </Block>
      </TouchableOpacity>
      <StartEndDateSelector
        isVisible={calendarVisible}
        onClose={() => {
          setCalendarVisible(false);
        }}
        allowRangeSelection={false}
        onSelect={({ startDate, endDate }) => {
          console.log(startDate, endDate);
          setCalendarVisible(false);
          setStartDate(startDate);
          setEndDate(endDate);
        }}
      />
    </Block>
  );
};

export default HotelStartEndDateSelector;

const styles = StyleSheet.create({});
