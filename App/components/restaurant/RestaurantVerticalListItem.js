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
import { useAuthReducer } from '../../reducers/authReducer';

const RestaurantVerticalListItem = ({ onPress, item }) => {
  const { userIsBusiness } = useAuthReducer();
  return (
    <Block
      flex={0}
      width={Dimensions.get('screen').width * 0.55}
      shadow
      white
      radius={12}
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
            <RatingBox rating={item.ratting} margin />
          </Block>
        </Block>
      </TouchableOpacity>
    </Block>
  );
};

export default RestaurantVerticalListItem;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  title: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },

  description: {
    height: 100,
  },
});
