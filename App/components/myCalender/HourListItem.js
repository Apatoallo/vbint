import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text } from '../AppTheme';
import colors from '../../config/colors';

const HourListItem = ({ time, title, subTitle, onPress, color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Block row>
        <Block flex={0} width={50} center middle>
          <Text color={color}>{time}</Text>
        </Block>
        <Block color={color + 15} marginLeft={16}>
          <Text margin={[16, 16, 0, 16]} bold>
            {title}
          </Text>
          <Text color={colors.blackGrey} margin={[0, 16, 16, 16]}>
            {subTitle}
          </Text>
        </Block>
        <Block flex={0} width={10} color={color}></Block>
      </Block>
    </TouchableOpacity>
  );
};

export default HourListItem;

const styles = StyleSheet.create({});
