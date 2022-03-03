import React from 'react';
import { Block, Text } from './AppTheme';
import colors from '../config/colors';

const HeaderTitle = ({ title, onPress, ...props }) => {
  return (
    <Block middle>
      <Text
        {...props}
        numberOfLines={1}
        color={colors.black}
        size={17}
        bold
        onPress={onPress}>
        {title}
      </Text>
    </Block>
  );
};

export default HeaderTitle;
