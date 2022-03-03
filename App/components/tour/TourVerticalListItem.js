import React from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import AppHeart from '../AppHeart';
import { Block, Text } from '../AppTheme';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';
import AppImage from '../AppImage';
import AppLinearGradient from '../AppLinearGradient';
import RatingBox from '../RatingBox';
import CampaignAvailableItem from '../CampaignAvailableItem';
import constants from '../../config/constants';
import { useTranslation } from 'react-i18next';
import { useAuthReducer } from '../../reducers/authReducer';

const TourVerticalListItem = ({ onPress, item }) => {
  const { t } = useTranslation();
  const { userIsBusiness } = useAuthReducer();
  return (
    <Block shadow>
      <Block
        flex={0}
        width={Dimensions.get('screen').width * 0.55}
        shadow
        white
        style={AppStyles.overflow}
        radius={10}
        marginRight={16}>
        <TouchableOpacity onPress={onPress}>
          <Block>
            <Block flex={0}>
              <AppImage style={styles.image} url={item.images[0]} />
              {!userIsBusiness && (
                <AppHeart
                  isFavorite={item.isFavorite}
                  isMemoryBook={item.isMemoryBook}
                />
              )}
              <AppLinearGradient color={colors.black} />
              <CampaignAvailableItem campaignAvailable={item.campaing} />
              <Text padding size={18} medium white style={styles.title}>
                {item.title}
              </Text>
            </Block>
            <Block flex={0} white>
              <Text
                numberOfLines={4}
                style={styles.description}
                padding
                color={colors.semiBlack}>
                {item.description}
              </Text>
              <Block padding={6}>
                <Block row center space={'between'}>
                  <Block>
                    <Block noflex>
                      <Text
                        size={12}
                        numberOfLines={1}
                        color={colors.hotelCardGrey}>
                        {t('average_price')}
                      </Text>
                    </Block>
                    {item.discountedPrice ? (
                      <Block row center>
                        <Text
                          style={styles.discountedPrice}
                          bold
                          color={colors.blackGrey}
                          size={12}>
                          {item.price} {constants.currency}
                        </Text>
                        <Text marginLeft bold color={colors.hotelCardGrey}>
                          {item.discountedPrice} {constants.currency}
                        </Text>
                      </Block>
                    ) : (
                      <Text bold color={colors.hotelCardGrey}>
                        {item.price} {constants.currency}
                      </Text>
                    )}
                  </Block>
                  <RatingBox rating={item.rating} />
                </Block>
              </Block>
            </Block>
          </Block>
        </TouchableOpacity>
      </Block>
    </Block>
  );
};

export default TourVerticalListItem;

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('screen').width * 0.6,
    height: 150,
    resizeMode: 'cover',
  },
  title: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },

  description: {
    height: 100,
  },
  discountedPrice: { textDecorationLine: 'line-through' },
});
