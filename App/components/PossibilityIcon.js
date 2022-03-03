import React from 'react';
import { StyleSheet } from 'react-native';
import { SvgCssUri } from 'react-native-svg';
import { Block, Text } from './AppTheme';
import colors from '../config/colors';

const PossibilityIcon = ({ url, title }) => {
  return (
    <Block margin noflex width={40} height={40} center>
      <Block
        noflex
        width={35}
        height={35}
        center
        padding
        white
        color={'#EFEEEE'}
        shadow
        radius={15}>
        <SvgCssUri
          width={20}
          height={20}
          stroke={colors.secondary}
          strokeWidth={1.5}
          uri={url}
        />
      </Block>
      <Text marginTop={4} numberOfLines={2} center size={10}>
        {title}
      </Text>
    </Block>
  );
};

export default PossibilityIcon;

const styles = StyleSheet.create({});
