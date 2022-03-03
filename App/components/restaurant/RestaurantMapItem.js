import React from 'react';
import { StyleSheet, Image, TouchableHighlight } from 'react-native';
import AppHeart from '../AppHeart';
import { Block, Text } from '../AppTheme';
import colors from '../../config/colors';
import StarRating from '../StarRating';
import AppImage from '../AppImage';
import TotalRatingItem from '../TotalRatingItem';

const RestaurantMapItem = ({ item, onPress }) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor="none">
      <Block
        black
        style={styles.block}
        row
        white
        shadow
        margin={[0, 16, 32, 16]}
        radius={16}>
        <Block row height={130} width={150} shadow>
          <AppImage style={styles.image} url={item.images[0]} />
          <AppHeart
            isFavorite={item.isFavorite}
            isMemoryBook={item.isMemoryBook}
          />
        </Block>
        <Block noFlex margin>
          <Text numberOfLines={1} size={18} medium>
            {item.title}
          </Text>
          <Block noflex>
            <Text numberOfLines={2}> {item.description}</Text>
          </Block>
          <TotalRatingItem rating={item.rating} />
        </Block>
      </Block>
    </TouchableHighlight>
  );
};

export default RestaurantMapItem;

const styles = StyleSheet.create({
  image: { height: 130, width: 150, resizeMode: 'cover' },
  block: { overflow: 'hidden' },
  price: { alignSelf: 'flex-end' },
});
