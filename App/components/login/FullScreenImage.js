import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import Block from '../AppTheme/Block';
import LoadingIndicator from '../LoadingIndicator';
import AppStyles from '../../config/AppStyles';

const FullScreenImage = ({ isLoading = false, ...props }) => {
  return (
    <Block>
      <Block flex={1} {...props}>
        <Image
          style={styles.image}
          source={require('../../assets/images/login_bg.png')}
        />
        {props.children}
      </Block>
      <LoadingIndicator visible={isLoading} style={AppStyles.absolute} />
    </Block>
  );
};

export default FullScreenImage;

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    resizeMode: 'stretch',
  },
});
