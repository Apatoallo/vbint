import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import AppStyles from '../../config/AppStyles';
import { Radio } from 'native-base';

export const SLIDER_WIDTH = Dimensions.get('screen').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const CarouselCardItem = ({ item, index }) => {
  return (
    <Block flex={0} width={ITEM_WIDTH} key={index}>
      <Block radius={8} style={AppStyles.shadow}>
        <Image source={{ uri: item.imgUrl }} style={[styles.image]} />
      </Block>
    </Block>
  );
};
const styles = StyleSheet.create({
  image: {
    width: ITEM_WIDTH,
    height: Dimensions.get('screen').height * 0.45,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  header: {
    color: '#222',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: '#222',
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default CarouselCardItem;
