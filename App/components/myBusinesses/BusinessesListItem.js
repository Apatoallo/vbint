import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text, Icon } from '../AppTheme';
import Separator from '../Separator';
import AppImage from '../AppImage';
import colors from '../../config/colors';
import StarRating from '../StarRating';
import IconContainer from '../IconContainer';
import { IconTypes } from '../AppTheme/Icon';
import moment from 'moment';

const BusinessesListItem = ({
  onUpdate,
  title,
  address,
  description,
  onPress,
  images,
  rate,
  updatedAt,
  selectedTab,
}) => {
  return (
    <Block shadow flex={0} margin={[12, 24, 12, 24]} radius={8} white>
      <TouchableOpacity onPress={onPress}>
        <Block>
          <Block flex={0}>
            <Block>
              {images && <AppImage style={styles.image} url={images[0]} />}
              <Block style={styles.icons} margin>
                <IconContainer
                  icon={{
                    type: IconTypes.feather,
                    name:
                      selectedTab == 1 ? 'corner-down-left' : 'corner-left-up',
                    color:
                      selectedTab == 1
                        ? colors.hotelCardLightGrey
                        : colors.white,
                    size: 20,
                  }}
                  backgroundColor={
                    selectedTab == 1 ? colors.white : colors.primary
                  }
                  onPress={onUpdate}
                />
              </Block>
            </Block>
          </Block>
          <Block white style={[styles.block]}>
            <Block padding>
              <Block>
                <Text medium size={22}>
                  {title}
                </Text>
              </Block>
              <Text medium>{address}</Text>
              {rate ? (
                <Block marginTop={4} center row>
                  <Text>{rate}</Text>
                  <StarRating score={rate} />
                </Block>
              ) : null}
            </Block>
            <Separator backgroundColor={colors.lightGray} />
            <Text numberOfLines={3} padding color={colors.hotelCardGrey}>
              {description}
            </Text>
            <Separator backgroundColor={colors.lightGray} />
            <Block center row padding>
              <Icon
                type={IconTypes.ionicon}
                name={'md-time-outline'}
                color={colors.hotelCardGrey}
                size={24}
              />
              <Text color={colors.hotelCardGrey} size={14} marginLeft>
                Son Güncelleme: {moment(updatedAt).format('LLL')}
              </Text>
            </Block>
          </Block>
        </Block>
      </TouchableOpacity>
    </Block>
  );
};

export default BusinessesListItem;

const styles = StyleSheet.create({
  image: {
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
  icons: { position: 'absolute', top: 0, right: 0 },
});
