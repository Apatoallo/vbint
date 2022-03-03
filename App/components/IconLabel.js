import React from 'react';
import { Block, Icon, Text } from './AppTheme';

const IconLabel = ({
  icon,
  text,
  iconDirection = 'left',
  marginBottom = 10,
  textSize = 20,
  textColor,
  middle = false,
  textFlex = false,
}) => {
  /**
   * Icon ve text olan yerlerde kullanılır.
   */
  return (
    <Block
      noflex
      center
      middle={middle}
      style={{
        flexDirection: iconDirection === 'left' ? 'row' : 'row-reverse',
        marginBottom: marginBottom,
      }}>
      <Icon {...icon} />
      <Text
        medium
        paddingLeft={6}
        size={textSize}
        color={textColor}
        style={{ flex: textFlex ? 1 : 0 }}>
        {text}
      </Text>
    </Block>
  );
};

export default IconLabel;
