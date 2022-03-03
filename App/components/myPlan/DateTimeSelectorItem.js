import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../AppTheme/index';
import colors from '../../config/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from '../AppTheme/Icon';
import StartEndDateSelector from '../StartEndDateSelector';

const DateTimeSelectorItem = ({ title, onPress, SubTitle = t('choose') }) => {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);

  return (
    <Block flex={0} marginTop={24}>
      <Text bold color={colors.hotelCardLightGrey}>
        {title}
      </Text>
      <TouchableOpacity
        onPress={() => {
          setCalendarVisible(true);
        }}>
        <Block row center flex={0} marginTop>
          <Text color={colors.hotelCardGrey} marginRight>
            {SubTitle}
          </Text>
          <Icon
            type={'fontAwesome'}
            name={'angle-right'}
            color={colors.underlinedText}
            size={16}
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
        }}
      />
    </Block>
  );
};

export default DateTimeSelectorItem;

const styles = StyleSheet.create({});
