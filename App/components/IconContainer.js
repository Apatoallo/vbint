import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Block, Icon } from './AppTheme';
import colors from '../config/colors';
import AppStyles from '../config/AppStyles';

const IconContainer = ({
  onPress,
  icon,
  style,
  backgroundColor = colors.white,
  shadow = true,
  type = 'circle', // square ya da circle
  size = 36,
}) => {
  return (
    <TouchableOpacity
      transparent
      onPress={onPress}
      disabled={onPress ? false : true}
      style={[
        styles.circleView,
        {
          backgroundColor: backgroundColor,
          width: size,
          height: size,
          borderRadius: type === 'circle' ? size / 2 : 10,
        },
        shadow && { ...AppStyles.shadow },
        style,
      ]}>
      <Block center middle>
        <Icon {...icon} />
      </Block>
    </TouchableOpacity>
  );
};

export default IconContainer;

const styles = StyleSheet.create({
  circleView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
