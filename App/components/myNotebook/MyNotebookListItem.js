import React from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Block, Text } from '../AppTheme';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';
import Separator from '../Separator';
import { Icon, IconTypes } from '../AppTheme/Icon';
import AppImage from '../AppImage';
import moment from 'moment';
import AppHeart from '../AppHeart';
import AppLinearGradient from '../AppLinearGradient';
import { useTranslation } from 'react-i18next';

const MyNotebookListItem = ({
  onPress,
  onEdit,
  title,
  address,
  note,
  date,
  images,
  isFavorite,
}) => {
  const { t } = useTranslation();
  return (
    <TouchableHighlight underlayColor="none" onPress={onPress}>
      <Block flex={0} shadow radius={8} white margin={[12, 16, 12, 16]}>
        <Block style={AppStyles.overflow} radius={6}>
          <Block flex={0}>
            <Block>
              {images && images.length > 0 && (
                <AppImage style={styles.image} url={images[0]} />
              )}
              <AppLinearGradient color={colors.black} />
              <AppHeart isFavorite={isFavorite} isMemoryBook />
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
            <Block padding height={100}>
              <Text
                bold
                size={18}
                color={colors.hotelCardLightGrey}
                marginBottom>
                {t('your_note')}
              </Text>
              <Text numberOfLines={4} size={12} color={colors.hotelCardGrey}>
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
    </TouchableHighlight>
  );
};

export default MyNotebookListItem;

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
    right: 4,
  },
});
