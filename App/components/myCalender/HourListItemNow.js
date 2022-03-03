import React from 'react';
import { StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { Block, Text } from '../AppTheme';
import Separator from '../Separator';
import colors from '../../config/colors';

const HourListItemNow = ({ time, title, subTitle, onPress, color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Block row>
        <Block flex={0} width={50} center middle>
          <Text color={color}>{time}</Text>
        </Block>
        <Block color={color + 15} marginLeft={16}>
          <Text margin={16} bold>
            {title}
          </Text>
          <Block flex={0}>
            <Separator backgroundColor={color} />
          </Block>
          <Text color={colors.blackGrey} margin={16}>
            {subTitle}
          </Text>
        </Block>
        <Block flex={0} width={10} color={color}></Block>
      </Block>
    </TouchableOpacity>
  );
};

export default HourListItemNow;

const styles = StyleSheet.create({});
