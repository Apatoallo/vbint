import React from 'react';
import { StyleSheet } from 'react-native';
import Star from 'react-native-star-view';
import { Block } from './AppTheme';

const StarRating = ({ score }) => {
  return (
    <Block flex={0}>
      <Star score={score} style={styles.starStyle} />
    </Block>
  );
};

export default StarRating;

const styles = StyleSheet.create({
  starStyle: {
    width: 80,
    height: 16,

    paddingLeft: 4,
  },
});
