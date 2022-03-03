import React from 'react';
import { TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import { Block, Text, Icon } from '../AppTheme';
import { IconTypes } from '../AppTheme/Icon';
import Separator from '../Separator';

const SettingsRowItem = ({ text, subText, marginBottom, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginBottom: marginBottom
          ? typeof marginBottom === 'boolean'
            ? 10
            : marginBottom
          : 0,
      }}>
      <Block>
        <Block row space="between" marginBottom={15}>
          <Block>
            <Text bold size={18} marginBottom={subText ? 5 : 0}>
              {text}
            </Text>
            {subText ? (
              <Text size={13} color={colors.rowItemSubText} marginBottom={5}>
                {subText}
              </Text>
            ) : null}
          </Block>
          <Icon
            size={36}
            name="chevron-right"
            type={IconTypes.evilicon}
            color={colors.semiBlack}
          />
        </Block>
        <Separator backgroundColor={colors.lightGray} marginBottom />
      </Block>
    </TouchableOpacity>
  );
};

export default SettingsRowItem;
