import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text } from '../AppTheme';
import { Icon, IconTypes } from '../AppTheme/Icon';
import colors from '../../config/colors';
import moment from 'moment';
import TimeSelectorPopUp from './TimeSelectorPopUp';
import { useTranslation } from 'react-i18next';

const TimeSelector = ({ title, subTitle, onChangeDate, ...rest }) => {
  const { t } = useTranslation();
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [time, setTime] = useState(null);
  return (
    <TouchableOpacity onPress={() => setPopUpVisible(true)}>
      <Block {...rest}>
        <Text bold color={colors.semiBlack} size={18}>
          {title}
        </Text>
        <Block
          space={'between'}
          marginTop={12}
          row
          center
          style={styles.block}
          paddingBottom={16}
          paddingRight>
          <Block center row paddingLeft>
            <Icon
              type={IconTypes.ionicon}
              name={'time-outline'}
              color={colors.hotelCardLightGrey}
              size={22}
            />
            <Text marginLeft colo={'#484848'}>
              {!time ? t('choose') : moment(time).format('HH:mm')}
            </Text>
          </Block>
          <Icon
            type={'fontAwesome'}
            name={'angle-right'}
            color={colors.semiBlack}
            size={22}
          />
        </Block>
        <TimeSelectorPopUp
          marginTop={16}
          title={subTitle}
          isVisible={popUpVisible}
          onClose={() => {
            setPopUpVisible(false);
          }}
          onSelect={(newTime) => {
            setTime(newTime);
            onChangeDate(newTime);
          }}
        />
      </Block>
    </TouchableOpacity>
  );
};

export default TimeSelector;

const styles = StyleSheet.create({
  block: {
    borderBottomColor: colors.semiBlack,
    borderBottomWidth: 0.5,
  },
});
