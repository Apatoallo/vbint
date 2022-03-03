import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Block } from '../AppTheme/index';
import AppStyles from '../../config/AppStyles';
import AppImage from '../AppImage';
import constants from '../../config/constants';
import colors from '../../config/colors';
import RatingBox from '../RatingBox';
import AppLinearGradient from '../AppLinearGradient';
import AppHeart from '../AppHeart';
import CampaignAvailableItem from '../CampaignAvailableItem';
import SmallMap from '../SmallMap';
import { useTranslation } from 'react-i18next';
import { useAuthReducer } from '../../reducers/authReducer';

const HotelVerticalListItem = ({ item, onPress, showPrice = true }) => {
  const { t } = useTranslation();
  const { userIsBusiness } = useAuthReducer();
  return (
    <Block shadow>
      <Block
        marginBottom
        marginLeft
        marginRight
        shadow
        white
        style={AppStyles.overflow}
        radius={6}>
        <TouchableOpacity onPress={onPress}>
          <Block white width={Dimensions.get('screen').width * 0.5}>
            <Block>
              <AppImage style={styles.image} url={item.images[0]} />
              <Block></Block>
              {!userIsBusiness && (
                <AppHeart
                  isFavorite={item.isFavorite}
                  isMemoryBook={item.isMemoryBook}
                />
              )}
              <CampaignAvailableItem campaignAvailable={item.campaing} />

              <AppLinearGradient />
              <Text padding size={18} medium white style={styles.title}>
                {item.title}
              </Text>
            </Block>
            <Block margin row>
              <SmallMap
                latitude={item.location.latitude}
                longitude={item.location.longitude}
              />
              <Block>
                <Text size={12} numberOfLines={1}>
                  {item.neighborhood}
                </Text>
              </Block>
            </Block>
            <Block padding={6}>
              <Block row center space={'between'}>
                <Block>
                  <Block noflex>
                    <Text
                      size={10}
                      numberOfLines={1}
                      color={colors.hotelCardGrey}>
                      {showPrice === true ? t('average_price') : ''}
                    </Text>
                  </Block>
                  {showPrice === true ? (
                    <Text bold color={colors.hotelCardGrey}>
                      {item.price} {constants.currency}
                    </Text>
                  ) : (
                    <Text></Text>
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

export default HotelVerticalListItem;

const styles = StyleSheet.create({
  title: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  image: {
    width: '100%',
    height: 150,
  },
  overflow: {
    overflow: 'hidden',
  },
});
