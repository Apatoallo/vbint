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
import constants from '../../config/constants';
import { useTranslation } from 'react-i18next';
import { useAuthReducer } from '../../reducers/authReducer';

const HotelListItem = ({
  onPress,
  imageList,
  title,
  description,
  address,
  ratting,
  isFavorite,
  isMemoryBook,
  isCampaign,
  price,
}) => {
  const { t } = useTranslation();
  const { userIsBusiness } = useAuthReducer();
  return (
    <Block shadow>
      <Block
        radius={8}
        white
        shadow
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
            <CampaignAvailableItem campaignAvailable={isCampaign} />
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
                <Text size={18} bold>
                  {price} {constants.currency}
                </Text>
                <Text size={12}>{t('starting_price')}</Text>
              </Block>
            </Block>
          </TouchableOpacity>
        </Block>
      </Block>
    </Block>
  );
};

export default HotelListItem;

const styles = StyleSheet.create({
  description: { height: 100 },
});
