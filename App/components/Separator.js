import React from 'react';
import { StyleSheet, View } from 'react-native';
import { getMargins, mergeTheme } from './AppTheme/utils';
import expoTheme from './AppTheme/theme';
import colors from '../config/colors';

const Separator = ({ backgroundColor = colors.grey, marginBottom }) => {
  return (
    <View
      style={[
        styles.separator,
        {
          backgroundColor: backgroundColor,
          marginBottom: marginBottom
            ? typeof marginBottom === 'boolean'
              ? 10
              : marginBottom
            : 0,
        },
      ]}
    />
  );
};

export default Separator;

const styles = StyleSheet.create({
  separator: {
    height: 1,
  },
});
