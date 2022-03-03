import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Block, Text, Icon } from '../AppTheme/index';
import AppLinearGradient from '../AppLinearGradient';
import AppStyles from '../../config/AppStyles';
import { IconTypes } from '../AppTheme/Icon';
import colors from '../../config/colors';
import AppImage from '../AppImage';

const HomeBannerType2 = ({ image, title, subTitle, onPress, ...rest }) => {
  console.log(title, subTitle);
  return (
    <TouchableOpacity onPress={onPress}>
      <Block
        width={Dimensions.get('screen').width * 0.5}
        style={[AppStyles.overflow, { justifyContent: 'space-between' }]}
        white
        flex={1}
        radius={16}
        {...rest}>
        <AppImage url={image} style={styles.image} />
        <AppLinearGradient color={'#4E1E00'} />
        <Block color={'rgba(0, 0, 0, .2)'} radius={16} padding>
          <Block flex={1}></Block>
          <Block flex={0}>
            <Text medium white middle>
              {title}
            </Text>

            <Block
              style={[{ alignSelf: 'flex-end' }]}
              marginRight
              white
              center
              flex={0}
              middle
              height={30}
              width={30}
              borderRadius={30 / 2}>
              <Icon
                type={IconTypes.antdesign}
                name="arrowright"
                color={'#676767'}
                size={15}
              />
            </Block>
          </Block>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

export default HomeBannerType2;

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('screen').width * 0.5,
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
});
