import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../../config/colors';

const Notch = (props) => {
  return null;
};

export default memo(Notch);

const styles = StyleSheet.create({
  root: {
    width: 8,
    height: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.appGreen,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
});
