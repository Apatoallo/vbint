import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text } from '../AppTheme/index';
import ImageList from '../ImageList';
import AppHeart from '../AppHeart';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';
import Separator from '../Separator';
import CampaignAvailableItem from '../CampaignAvailableItem';
import TotalRatingItem from '../TotalRatingItem';
import { useTranslation } from 'react-i18next';
import { useAuthReducer } from '../../reducers/authReducer';

const TransferListItem = ({
  onPress,
  imageList,
  title,
  description,
  ratting,
  isFavorite,
  isMemoryBook,
  baggageLimit,
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
                  <Block></Block>
                  <Block nofelx center style={styles.details}>
                    <Text size={12}>
                      <Text size={12} bold>
                        {t('passenger_count')}
                      </Text>{' '}
                      {maxPerson}
                    </Text>
                    <Text size={12}>
                      <Text size={12} bold>
                        {t('luggage_capacity')}
                      </Text>{' '}
                      {baggageLimit}
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

export default TransferListItem;

const styles = StyleSheet.create({
  description: { height: 100 },
  discountedPrice: { textDecorationLine: 'line-through' },
  details: { alignItems: 'flex-end' },
});
