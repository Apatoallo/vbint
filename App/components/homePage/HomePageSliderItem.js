import React, { useState } from 'react';
import { StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Block, Icon } from '../AppTheme/index';
import { IconTypes } from '../AppTheme/Icon';
import AppStyles from '../../config/AppStyles';
import AppImage from '../AppImage';
import { SvgUri } from 'react-native-svg';
import constants from '../../config/constants';
import colors from '../../config/colors';
import RatingBox from '../RatingBox';
import AppLinearGradient from '../AppLinearGradient';
import AppHeart from '../AppHeart';
import CampaignAvailableItem from '../CampaignAvailableItem';
import { useTranslation } from 'react-i18next';

const HomePageListHotel = ({ item, onPress, showPrice = false }) => {
  const { t } = useTranslation();
  return (
    <Block shadow>
      <Block
        marginBottom={2}
        marginLeft
        marginRight
        white
        shadow
        style={[styles.overflow]}
        radius={8}>
        <TouchableOpacity onPress={onPress}>
          <Block white width={Dimensions.get('screen').width * 0.5}>
            <Block>
              <Block></Block>
              <CampaignAvailableItem campaignAvailable={item.campaing} />
              <AppImage style={styles.image} url={item.images[0]} />
              <AppLinearGradient />
              <Text padding size={18} medium white style={styles.title}>
                {item.title}
              </Text>

              <AppHeart
                isFavorite={item.isFavorite}
                isMemoryBook={item.isMemoryBook}
              />
            </Block>
            <Block margin>
              <Text style={{ height: 80 }} numberOfLines={4}>
                {item.description}
              </Text>
            </Block>
            <Block padding={6}>
              <Block row center space={'between'}>
                <Block>
                  <Block noflex>
                    <Text
                      size={12}
                      numberOfLines={1}
                      color={colors.hotelCardGrey}>
                      {showPrice ? t('average_price') : ''}
                    </Text>
                  </Block>
                  {!showPrice ? (
                    <Text></Text>
                  ) : item.discountedPrice ? (
                    <Block row center>
                      <Text
                        style={styles.discountedPrice}
                        bold
                        color={colors.blackGrey}
                        size={10}>
                        {item.price} {constants.currency}
                      </Text>
                      <Text marginLeft bold color={colors.black} size={14}>
                        {item.discountedPrice} {constants.currency}
                      </Text>
                    </Block>
                  ) : (
                    <Text bold color={colors.black}>
                      {item.price} {constants.currency}
                    </Text>
                  )}
                </Block>
                <RatingBox rating={item.rating} />
              </Block>
            </Block>
          </Block>
        </TouchableOpacity>
      </Block>
    </Block>
  );
};

export default HomePageListHotel;

const styles = StyleSheet.create({
  title: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  image: {
    width: '100%',
    height: 150,
  },
  overflow: {
    overflow: 'hidden',
  },
  pin: {
    position: 'absolute',
    height: 25,
    width: 25,
  },
  discountedPrice: { textDecorationLine: 'line-through' },
});
