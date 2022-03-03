import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../AppTheme';
import Separator from '../Separator';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';
import AppImage from '../AppImage';
import constants from '../../config/constants';
import { SvgCssUri } from 'react-native-svg';
import { useTranslation } from 'react-i18next';

const RoomListItem = ({ item, marginBottom }) => {
  console.log(item);
  const { t } = useTranslation();
  return (
    <Block
      paddingRight
      row
      radius={10}
      style={styles.container}
      marginBottom={marginBottom}>
      <AppImage url={item.image} style={styles.image} resizeMode="cover" />
      <Block marginLeft paddingTop>
        <Block space={'between'} row>
          <Block>
            <Text marginBottom={6} numberOfLines={1} bold size={18}>
              {item.title}
            </Text>
          </Block>
          <Block noflex marginLeft={2}>
            <Text>{item.roomSize} m2</Text>
          </Block>
        </Block>
        <Separator backgroundColor={colors.lightGray} marginBottom />

        <Block flex={1}>
          <Text color={colors.hotelCardGrey}>{item.singleBed}</Text>
          <Text color={colors.hotelCardGrey}>{item.doubleBed}</Text>

          {item.priceDiscounted ? (
            <Block row center>
              <Block noflex>
                <Text
                  style={styles.discountedPrice}
                  bold
                  color={colors.blackGrey}
                  size={12}>
                  {item.price} {constants.currency}
                </Text>
              </Block>
              <Block>
                <Text
                  numberOfLines={1}
                  marginLeft={4}
                  bold
                  color={colors.black}>
                  {item.priceDiscounted} {constants.currency}{' '}
                  <Text numberOfLines={1} size={12} color={colors.black}>
                    {t('price_per_night')}
                  </Text>
                </Text>
              </Block>
            </Block>
          ) : (
            <Text bold color={colors.black}>
              {item.price} {constants.currency} {t('price_per_night')}
            </Text>
          )}
        </Block>

        <Block flex={0} row marginBottom>
          {item?.properties?.slice(0, 5).map((item, index) => {
            return (
              <Block noflex margin={4}>
                <SvgCssUri
                  width={20}
                  height={20}
                  stroke={colors.secondary}
                  strokeWidth={1.5}
                  uri={item.icon}
                />
              </Block>
            );
          })}
        </Block>
      </Block>
    </Block>
  );
};

export default RoomListItem;

const styles = StyleSheet.create({
  footerFirstText: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    ...AppStyles.shadow,
  },
  image: {
    height: 150,
    width: '30%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  line: {
    height: 15,
    width: 1.4,
  },
  price: {
    alignSelf: 'flex-end',
  },
  discountedPrice: { textDecorationLine: 'line-through' },
});
