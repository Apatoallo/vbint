import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { Block, Text } from '../AppTheme';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';
import Separator from '../Separator';
import AppImage from '../AppImage';
import AppHeart from '../AppHeart';
import AppLinearGradient from '../AppLinearGradient';

const MyFavoriteListItem = ({
  onPress,
  title,
  address,
  description,
  images,
  isFavorite,
}) => {
  return (
    <TouchableHighlight underlayColor="none" onPress={onPress}>
      <Block flex={0} shadow margin={[12, 24, 12, 24]}>
        <Block style={AppStyles.overflow} radius={6}>
          <Block flex={0}>
            <Block>
              {images && images.length > 0 && (
                <AppImage style={styles.image} url={images[0]} />
              )}
              <AppLinearGradient color={colors.black} />
              <AppHeart isFavorite={isFavorite} />
            </Block>
            <Block padding style={styles.title}>
              <Text size={18} medium white>
                {title}
              </Text>
              <Text size={18} white>
                {address}
              </Text>
            </Block>
          </Block>
          <Block flex={0} white>
            <Block padding>
              <Text
                numberOfLines={4}
                style={styles.description}
                padding
                color={colors.semiBlack}>
                {description}
              </Text>
            </Block>
            <Separator backgroundColor={colors.lightGray} />
          </Block>
        </Block>
      </Block>
    </TouchableHighlight>
  );
};

export default MyFavoriteListItem;

const styles = StyleSheet.create({
  image: {
    height: 150,
    resizeMode: 'cover',
  },
  title: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  memoryIcon: {
    backgroundColor: colors.secondary,
    position: 'absolute',
    top: 45,
    right: 6,
  },
});
