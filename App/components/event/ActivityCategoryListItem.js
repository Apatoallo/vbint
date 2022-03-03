import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AppHeart from '../AppHeart';
import { Block, Text } from '../AppTheme';
import colors from '../../config/colors';
import AppImage from '../AppImage';
import AppLinearGradient from '../AppLinearGradient';
import CampaignAvailableItem from '../CampaignAvailableItem';
import constants from '../../config/constants';
import { useTranslation } from 'react-i18next';
import { useAuthReducer } from '../../reducers/authReducer';

const ActivityCategoryListItem = ({ onPress, item }) => {
  const { t } = useTranslation();
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

            <AppLinearGradient color={colors.black} />
            {!userIsBusiness && (
              <AppHeart
                isFavorite={item.isFavorite}
                isMemoryBook={item.isMemoryBook}
                time={item.leftDay}
              />
            )}
            <CampaignAvailableItem campaignAvailable={item.campaing} />
            <Text padding size={18} medium white style={styles.title}>
              {item.title}
            </Text>
          </Block>
          <Block flex={0} padding>
            <Text
              numberOfLines={4}
              style={styles.description}
              color={colors.semiBlack}>
              {item.description}
            </Text>
            <Text size={12}>{t('average_price')}</Text>
            <Text bold size={18}>
              {item.priceAverage} {constants.currency}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    </Block>
  );
};

export default ActivityCategoryListItem;

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
    height: 90,
  },
});
