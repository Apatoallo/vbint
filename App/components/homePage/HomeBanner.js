import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Block, Text, Icon } from '../AppTheme/index';
import AppLinearGradient from '../AppLinearGradient';
import AppStyles from '../../config/AppStyles';
import { IconTypes } from '../AppTheme/Icon';
import colors from '../../config/colors';
import AppImage from '../AppImage';

const HomeBanner = ({ image, title, subTitle, onPress, ...rest }) => {
  return (
    <Block shadow>
      <Block
        flex={1}
        white
        shadow
        style={AppStyles.overflow}
        radius={16}
        height={Dimensions.get('screen').height * 0.3}
        {...rest}>
        <TouchableOpacity
          style={{ height: Dimensions.get('screen').height * 0.3 }}
          onPress={onPress}>
          <Block>
            <AppImage url={image} style={styles.image} />
            <AppLinearGradient color={'#001B4E'} />
            <Block color={'rgba(0, 0, 0, .2)'} radius={16} padding>
              <Block middle style={styles.text}>
                <Text medium white middle s>
                  {title}
                </Text>
                <Text white notera size={50} style={AppStyles.textShadow}>
                  {subTitle}
                </Text>
              </Block>
            </Block>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress} style={styles.next}>
          <Icon
            type={IconTypes.antdesign}
            name="arrowright"
            color={'#676767'}
            size={15}
          />
        </TouchableOpacity>
      </Block>
    </Block>
  );
};

export default HomeBanner;

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  next: {
    position: 'absolute',
    bottom: 8,
    right: 0,
    height: 30,
    width: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
