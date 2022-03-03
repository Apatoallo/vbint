import React from 'react';
import { StyleSheet, View } from 'react-native';
import { getMargins, mergeTheme } from './AppTheme/utils';
import expoTheme from './AppTheme/theme';

const VerticalSeparator = ({
  backgroundColor = 'white',
  marginBottom = false,
}) => {
  return (
    <View
      style={[
        styles.separator,
        {
          backgroundColor: backgroundColor,
          marginBottom: marginBottom ? 10 : 0,
        },
      ]}
    />
  );
};

export default VerticalSeparator;

const styles = StyleSheet.create({
  separator: {
    width: 1,
    height: '70%',
  },
});
