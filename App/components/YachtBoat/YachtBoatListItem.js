import React from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Block, Text } from '../AppTheme/index';
import ImageList from '../ImageList';
import AppHeart from '../AppHeart';
import StarRating from '../StarRating';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';
import Separator from '../Separator';
import AppLinearGradient from '../AppLinearGradient';
import CampaignAvailableItem from '../CampaignAvailableItem';
import TotalRatingItem from '../TotalRatingItem';
import constants from '../../config/constants';
import { useTranslation } from 'react-i18next';
import { useAuthReducer } from '../../reducers/authReducer';

const YachtBoatListItem = ({
  onPress,
  imageList,
  title,
  description,
  address,
  ratting,
  isFavorite,
  isMemoryBook,
  price,
  discountedPrice,
  size,
  maxPerson,
}) => {
  const { t } = useTranslation();
  const { userIsBusiness } = useAuthReducer();
  return (
    <Block shadow>
      <Block
        radius={8}
        shadow
        white
        margin={[12, 24, 12, 24]}
        style={AppStyles.overflow}>
        <Block>
          <Block>
            <ImageList
              data={imageList}
              imageStyle={styles.image}
              onPress={onPress}
            />
            {!userIsBusiness && (
              <AppHeart isFavorite={isFavorite} isMemoryBook={isMemoryBook} />
            )}
            <CampaignAvailableItem />
          </Block>
          <TouchableOpacity onPress={onPress}>
            <Block>
              <Block padding>
                <Block>
                  <Text medium size={22}>
                    {title}
                  </Text>
                </Block>
                <Text medium>{address}</Text>
                <TotalRatingItem rating={ratting} />
              </Block>
              <Separator backgroundColor={colors.lightGray} />
              <Block flex={1}>
                <Text
                  numberOfLines={4}
                  style={styles.description}
                  padding
                  color={colors.hotelCardGrey}>
                  {description}
                </Text>
              </Block>
              <Separator backgroundColor={colors.lightGray} />
              <Block margin>
                <Block row space={'between'}>
                  <Block>
                    {discountedPrice ? (
                      <Block row center>
                        <Text
                          style={styles.discountedPrice}
                          bold
                          color={colors.blackGrey}
                          size={12}>
                          {price}/{constants.currency}
                        </Text>
                        <Text marginLeft bold color={colors.hotelCardGrey}>
                          {discountedPrice} {constants.currency}
                        </Text>
                      </Block>
                    ) : (
                      <Text bold color={colors.hotelCardGrey}>
                        {price} {constants.currency}
                      </Text>
                    )}
                    <Text size={12}>{t('average_price')}</Text>
                  </Block>
                  <Block nofelx center style={styles.details}>
                    <Text size={12}>
                      <Text size={12} bold>
                        {t('cabin_count')}
                      </Text>{' '}
                      {size}
                    </Text>
                    <Text size={12}>
                      <Text size={12} bold>
                        {t('capacity')}
                      </Text>{' '}
                      {maxPerson}
                    </Text>
                  </Block>
                </Block>
              </Block>
            </Block>
          </TouchableOpacity>
        </Block>
      </Block>
    </Block>
  );
};

export default YachtBoatListItem;

const styles = StyleSheet.create({
  description: { height: 100 },
  discountedPrice: { textDecorationLine: 'line-through' },
  details: { alignItems: 'flex-end' },
});
