import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Block, Button, Text, Icon } from './AppTheme';

import { IconTypes } from './AppTheme/Icon';
import colors from '../config/colors';

const SocialButton = ({
  iconName,
  title,
  type = IconTypes.evilicon,
  onPress,
  small = false,
  ...otherProps
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Block
        margin
        flex={0}
        center
        middle
        borderWidth={1}
        padding={12}
        white
        borderColor={colors.black}
        radius={10}
        {...otherProps}>
        <Block row center>
          <Icon
            type={type}
            name={iconName}
            color={colors.semiBlack}
            size={type === IconTypes.evilicon ? 24 : 20}
          />
          <Text medium marginLeft={type === IconTypes.evilicon ? 0 : 8}>
            {title}
          </Text>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({});

export default SocialButton;
