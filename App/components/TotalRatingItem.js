import React from 'react';
import { StyleSheet } from 'react-native';
import Block from './AppTheme/Block';
import { Text } from './AppTheme/index';
import StarRating from './StarRating';

const TotalRatingItem = ({ rating }) => {
  return rating > 0 ? (
    <Block center row marginBottom>
      <Text>{rating}</Text>
      <StarRating score={rating} />
    </Block>
  ) : null;
};

export default TotalRatingItem;

const styles = StyleSheet.create({});
