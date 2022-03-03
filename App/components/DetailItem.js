import React from 'react';
import { TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import { Block, Text, Icon } from './AppTheme';
import { IconTypes } from './AppTheme/Icon';
import Separator from './Separator';

const DetailItem = ({ text, subtext, marginBottom, onPress }) => {
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
        <Block row space="between" center marginBottom={20}>
          <Block>
            <Text bold size={20}>
              {text}
            </Text>
            <Text numberOfLines={1} size={14} color={colors.semiBlack}>
              {subtext}
            </Text>
          </Block>
          <Icon
            size={40}
            name="chevron-right"
            type={IconTypes.evilicon}
            color={colors.semiBlack}
          />
        </Block>
        <Separator backgroundColor={colors.lightGray} />
      </Block>
    </TouchableOpacity>
  );
};

export default DetailItem;
