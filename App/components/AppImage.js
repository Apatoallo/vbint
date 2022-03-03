import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { API_URL } from '../api/clinet';

const AppImage = ({ url, ...otherProps }) => {
  return (
    <FastImage
      source={typeof url === 'string' ? { uri: url } : url}
      resizeMode={FastImage.resizeMode.cover}
      {...otherProps}
    />
  );
};

export default AppImage;

const styles = StyleSheet.create({});
