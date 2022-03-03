import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Block, Text } from '../AppTheme';
import colors from '../../config/colors';
import Separator from '../Separator';
import AppImage from '../AppImage';
import AppHeart from '../AppHeart';
import { Icon, IconTypes } from '../AppTheme/Icon';
import moment from 'moment';
import AppLinearGradient from '../AppLinearGradient';
import { useTranslation } from 'react-i18next';

const MyNotebookVerticalListItem = ({
  onEdit,
  title,
  note,
  date,
  images,
  isFavorite,
}) => {
  const { t } = useTranslation();
  return (
    <Block
      noflex
      width={Dimensions.get('screen').width * 0.5}
      shadow
      radius={8}
      white
      marginRight={16}>
      <Block radius={6}>
        <Block flex={0}>
          <Block>
            {images && images.length > 0 && (
              <AppImage style={styles.image} url={images[0]} />
            )}
            <AppLinearGradient color={colors.black} />
            <AppHeart isFavorite={isFavorite} isMemoryBook />
          </Block>
          <Text padding size={18} medium white style={styles.title}>
            {title}
          </Text>
        </Block>
        <Block flex={0} white>
          <Block padding height={80}>
            <Text bold size={18} color={colors.hotelCardLightGrey}>
              {t('your_note')}
            </Text>
            <Text numberOfLines={3} size={12} color={colors.hotelCardGrey}>
              {note}
            </Text>
          </Block>
          <Separator backgroundColor={colors.lightGray} />
          <TouchableOpacity onPress={onEdit}>
            <Block noflex row center space={'between'} padding>
              <Block>
                <Text size={10}>
                  {moment(date).format('LL')} {t('added_on')}
                </Text>
              </Block>
              <Icon
                type={IconTypes.antdesign}
                name={'edit'}
                color={colors.semiBlack}
                size={20}
                style={styles.icon}
              />
            </Block>
          </TouchableOpacity>
        </Block>
      </Block>
    </Block>
  );
};

export default MyNotebookVerticalListItem;

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('screen').width * 0.5,
    height: 150,
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  icons: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  memoryIcon: {
    backgroundColor: colors.secondary,
    position: 'absolute',
    top: 45,
    right: 4,
  },
});
