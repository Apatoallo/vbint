import React from 'react';
import { TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import { Block, Text, Icon } from '../AppTheme';
import { IconTypes } from '../AppTheme/Icon';
import Separator from '../Separator';

const SettingsProfileItem = ({
  icon,
  text,
  onPress,
  index,
  dataLength,
  style,
}) => {
  const lastItem = index + 1 == dataLength;
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Block row space="between" center marginBottom={lastItem ? 0 : 15}>
        <Block row center>
          <Icon size={23} color={colors.semiBlack} {...icon} />
          <Text size={18} color={colors.semiBlack} marginLeft>
            {text}
          </Text>
        </Block>
        <Icon
          size={40}
          name="chevron-right"
          type={IconTypes.evilicon}
          color={colors.lightGray}
        />
      </Block>
      {!lastItem && (
        <Separator backgroundColor={colors.lightGray} marginBottom={15} />
      )}
    </TouchableOpacity>
  );
};

export default SettingsProfileItem;
