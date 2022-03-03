import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text, Icon } from '../components/AppTheme';
import { IconTypes } from '../components/AppTheme/Icon';
import moment from 'moment';
import TimeSelectorPopUp from './carRent/TimeSelectorPopUp';
import colors from '../config/colors';
import { useTranslation } from 'react-i18next';

const TimePicker = ({
  title,
  style,
  onSave,
  titleColor,
  defaultDate,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);
  return (
    <Block style={style} {...otherProps}>
      {title ? (
        <Text bold marginBottom color={titleColor}>
          {title}
        </Text>
      ) : null}
      <TouchableOpacity
        onPress={() => {
          setTimePickerVisibility(true);
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
            {currentTime ? moment(currentTime).format('LT') : t('choose')}
          </Text>
          <Icon
            type={IconTypes.ionicon}
            name={'time-outline'}
            color={'#4CB7FE'}
            size={24}
          />
        </Block>
      </TouchableOpacity>
      <TimeSelectorPopUp
        isVisible={isTimePickerVisible}
        onClose={() => {
          setTimePickerVisibility(false);
        }}
        defaultDate={defaultDate}
        onSelect={(time) => {
          setCurrentTime(time);
          onSave(time);
        }}
      />
    </Block>
  );
};

export default TimePicker;

const styles = StyleSheet.create({});
