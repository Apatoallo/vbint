import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button } from './AppTheme/index';
import colors from '../config/colors';
import AppStyles from '../config/AppStyles';

const AppButton = ({
  title,
  textOnly,
  backgroundColor,
  textColor,
  style,
  underlined,
  titleStyle,
  shadow,
  textProps,
  showBorder,
  size = 16,
  ...otherProps
}) => {
  const getTextColor = textColor
    ? textColor
    : textOnly
    ? colors.black
    : colors.white;
  const getBackgroundColor = backgroundColor
    ? backgroundColor
    : textOnly
    ? 'transparent'
    : colors.btnBg;
  const getTextProps = textProps ? textProps : {};
  if (!textOnly) {
    getTextProps['center'] = true;
  }
  if (underlined) {
    getTextProps['bold'] = false;
    getTextProps['medium'] = true;
  }
  return (
    <Button
      color={getBackgroundColor}
      {...otherProps}
      style={[
        textOnly && styles.textOnlyButton,
        shadow && AppStyles.shadow,
        style,
      ]}>
      <Text
        color={getTextColor}
        bold
        size={size}
        {...getTextProps}
        style={[
          underlined && {
            ...styles.textLine,
            textDecorationColor: getTextColor,
          },
          titleStyle,
        ]}>
        {title}
      </Text>
    </Button>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  textOnlyButton: {
    alignSelf: 'baseline',
    minHeight: undefined,
  },
  textLine: {
    textDecorationLine: 'underline',
  },
});
