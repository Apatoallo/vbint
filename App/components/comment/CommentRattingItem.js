import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../AppTheme';
import { AirbnbRating } from 'react-native-ratings';

const CommentRattingItem = ({ title, onValueChange }) => {
  return (
    <Block flex={0} row paddingTop>
      <Text>{title}</Text>
      <Block marginLeft={-16}>
        <AirbnbRating
          defaultRating={0}
          onFinishRating={onValueChange}
          ratingCount={5}
          size={20}
          showRating={false}
        />
      </Block>
    </Block>
  );
};

export default CommentRattingItem;

const styles = StyleSheet.create({});
