import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Block, Text, Icon } from '../AppTheme/index';
import AppLinearGradient from '../AppLinearGradient';
import AppStyles from '../../config/AppStyles';
import { IconTypes } from '../AppTheme/Icon';
import AppImage from '../AppImage';

const HomeBannerType3 = ({ image, title, subTitle, onPress, ...rest }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Block
        width={Dimensions.get('screen').width * 0.5}
        style={AppStyles.overflow}
        white
        radius={16}
        {...rest}>
        <AppImage url={image} style={styles.image} />
        <AppLinearGradient color={'#001B4E'} />
        <Block color={'rgba(0, 0, 0, .2)'} radius={16} padding>
          <Block>
            <Text white notera size={50} color={'#00000000'}>
              {subTitle}
            </Text>
          </Block>
          <Block>
            <Text white notera size={50} style={AppStyles.textShadow}>
              {subTitle}
            </Text>
            <Text medium white middle>
              {title}
            </Text>
            <Block
              style={[{ alignSelf: 'flex-end' }]}
              marginRight
              white
              center
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

export default HomeBannerType3;

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('screen').width * 0.9,
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
});
