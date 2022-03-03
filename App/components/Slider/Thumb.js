import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../../config/colors';

const THUMB_RADIUS = 12;

const Thumb = () => {
  return <View style={styles.root} />;
};

const styles = StyleSheet.create({
  root: {
    width: THUMB_RADIUS,
    height: THUMB_RADIUS * 2,

    borderWidth: 0,
    borderColor: colors.black,
    backgroundColor: '#E6E6E6',
  },
});

export default memo(Thumb);
