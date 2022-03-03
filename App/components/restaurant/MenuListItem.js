import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Block, Text } from '../AppTheme';
import Separator from '../Separator';
import colors from '../../config/colors';
import VerticalSeparator from '../VerticalSeparator';
import Icon from '../AppTheme/Icon';
import AppStyles from '../../config/AppStyles';
import AppImage from '../AppImage';

const MenuListItem = ({ image, description, title, price, marginBottom }) => {
  return (
    <Block
      paddingRight
      row
      radius={10}
      style={styles.container}
      marginBottom={marginBottom}>
      <AppImage url={image} style={styles.image} resizeMode="cover" />
      <Block marginLeft paddingTop>
        <Block space={'between'} row>
          <Text marginBottom={5} bold size={18}>
            {title}
          </Text>
        </Block>
        <Separator backgroundColor={colors.lightGray} marginBottom />

        <Block flex={1}>
          <Text numberOfLines={4} marginBottom color={colors.hotelCardGrey}>
            {description}
          </Text>
        </Block>
        <Separator backgroundColor={colors.lightGray} />

        <Block flex={0} style={styles.price}>
          <Text bold margin>
            {price} TL
          </Text>
        </Block>
      </Block>
    </Block>
  );
};

export default MenuListItem;

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
});
