import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import AppHeart from '../AppHeart';
import { Block, Text } from '../AppTheme';
import colors from '../../config/colors';
import AppImage from '../AppImage';
import TotalRatingItem from '../TotalRatingItem';
import { useTranslation } from 'react-i18next';

const HotelMapItem = ({ item, onPress }) => {
  const { t } = useTranslation();
  return (
    <TouchableHighlight underlayColor="none" onPress={onPress}>
      <Block
        noFlex
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
          <Text numberOfLines={1} size={14}>
            {item.address}
          </Text>
          <Block marginTop={4} center row>
            <TotalRatingItem rating={item.rating} />
          </Block>
          <Block style={styles.price} center>
            <Text bold color={colors.hotelCardGrey} size={20}>
              {item.price} TL
            </Text>
            <Text size={10} color={colors.hotelCardLightGrey}>
              {t('starting_price')}
            </Text>
          </Block>
        </Block>
      </Block>
    </TouchableHighlight>
  );
};

export default HotelMapItem;

const styles = StyleSheet.create({
  image: { height: 130, width: 150, resizeMode: 'cover' },
  block: { overflow: 'hidden' },
  price: { alignSelf: 'flex-end', justifyContent: 'flex-end' },
});
