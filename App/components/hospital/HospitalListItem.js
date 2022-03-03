import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Block, Text } from '../AppTheme';
import StarRating from '../StarRating';
import Separator from '../Separator';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';
import AppImage from '../../components/AppImage';

const contentWidth = Dimensions.get('window').width;

const HospitalListItem = ({
  onPress,
  image,
  name,
  description,
  marginBottom,
}) => {
  return (
    <Block style={[styles.container, { marginBottom: marginBottom }]}>
      <Block noflex>
        <TouchableOpacity onPress={onPress}>
          <Block noflex>
            <AppImage url={image} style={styles.image} />
            <Text marginBottom={5} medium size={18} marginHorizontal>
              {name}
            </Text>
          </Block>

          <Separator backgroundColor={colors.lightGray} />
          <Text numberOfLines={5} style={styles.description} margin>
            {description}
          </Text>
        </TouchableOpacity>
      </Block>
    </Block>
  );
};

export default HospitalListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    ...AppStyles.shadow,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  description: {
    height: 130,
  },
});
