import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../AppTheme';
import Separator from '../Separator';
import colors from '../../config/colors';

const EmptyHourListItem = ({ time }) => {
  return (
    <Block row>
      <Block flex={0} width={50} center middle>
        <Text color={colors.blackGrey}>{time}</Text>
      </Block>
      <Block color={colors.white} marginLeft={16}>
        <Text margin={8} bold></Text>
        <Block flex={0}>
          <Separator backgroundColor={'#D5E3D6'} />
        </Block>
        <Text color={colors.blackGrey} margin={8}></Text>
      </Block>
      <Block flex={0} width={10} color={colors.white}></Block>
    </Block>
  );
};

export default EmptyHourListItem;

const styles = StyleSheet.create({});
