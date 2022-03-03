import React from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { Block } from '../AppTheme/index';
import AppStyles from '../../config/AppStyles';
import { BlurView } from '@react-native-community/blur';

const BlockWithBlur = ({ children, ...props }) => {
  return (
    <Block shadow margin={16} radius={16} style={AppStyles.overflow} {...props}>
      <BlurView style={AppStyles.absolute} blurType="xlight" blurAmount={10} />
      <Block>{children}</Block>
    </Block>
  );
};

export default BlockWithBlur;

const styles = StyleSheet.create({
  image: { opacity: 0.7, flex: 1 },
});
