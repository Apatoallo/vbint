import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../config/colors';

const AppLinearGradient = ({ color = colors.black, isFromTop }) => {
  return (
    <LinearGradient
      colors={
        isFromTop ? [color, colors.transparent] : [colors.transparent, color]
      }
      style={styles.linearGradient}
      locations={isFromTop ? [0, 0.5] : [0.4, 1]}
    />
  );
};

export default AppLinearGradient;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    bottom: 0,
  },
});
