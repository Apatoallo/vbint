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
import { useAuthReducer } from '../../reducers/authReducer';

const RestaurantListItem = ({
  onPress,
  imageList,
  title,
  description,
  address,
  ratting,
  isFavorite,
  isMemoryBook,
}) => {
  const { userIsBusiness } = useAuthReducer();
  return (
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
          </Block>
        </TouchableOpacity>
      </Block>
    </Block>
  );
};

export default RestaurantListItem;

const styles = StyleSheet.create({
  description: { height: 100 },
});
