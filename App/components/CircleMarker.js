import React from 'react';
import { StyleSheet } from 'react-native';
import AppStyles from '../config/AppStyles';
import { Block, Text } from './AppTheme';
import colors from '../config/colors';

const CircleMarker = ({ text }) => (
  <Block style={styles.circleOut} noflex>
    <Block
      style={styles.circleIn}
      noflex
      backgroundColor={colors.markerContentBackground}>
      <Text white weight={'700'}>
        {text}
      </Text>
    </Block>
    <Block noflex style={styles.triangle} />
  </Block>
);

export default CircleMarker;

const styles = StyleSheet.create({
  circleOut: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    ...AppStyles.shadow,
  },
  circleIn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 9,
    borderRightWidth: 9,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    position: 'absolute',
    left: 15,
    bottom: -7,
  },
});
