import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from './AppTheme';
import IconLabel from './IconLabel';
import colors from '../config/colors';
import AppStyles from '../config/AppStyles';

const IconLabelButton = ({
  icon,
  title,
  style,
  shadow,
  color = colors.primary,
  onPress,
  titleSize = 17,
  iconDirection,
  middle,
  textFlex,
  ...otherProps
}) => {
  /**
   * Icon ve title olan butonlarda kullanılır.
   */
  return (
    <Button
      outlined
      paddingHorizontal
      center
      color={color}
      onPress={onPress}
      style={[styles.button, style, shadow && AppStyles.shadow]}
      {...otherProps}>
      <IconLabel
        icon={{ color: color, ...icon }}
        text={title}
        middle={middle}
        marginBottom={0}
        textColor={color}
        textSize={titleSize}
        iconDirection={iconDirection}
        textFlex={textFlex}
      />
    </Button>
  );
};

export default IconLabelButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
  },
});
