import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import colors from '../config/colors';
import { Block, Text } from './AppTheme';
import Separator from './Separator';

const CommentCard = ({ username, date, comment }) => {
  console.log(comment);
  const cardWidth = Dimensions.get('window').width - 80;
  return (
    <Block
      width={cardWidth}
      borderWidth={0.5}
      borderColor={colors.lightGray}
      paddingTop
      marginRight={16}
      radius={8}
      flex={0}>
      <Text bold marginLeft size={16}>
        {username}
      </Text>
      <Text
        size={12}
        marginLeft
        color={colors.hotelCardGrey}
        marginBottom
        marginTop={2}>
        {date}
      </Text>
      <Separator backgroundColor={colors.lightGray} />
      <Block>
        <Text size={14} color={colors.hotelCardGrey} padding>
          {comment}
        </Text>
      </Block>
    </Block>
  );
};

export default CommentCard;

const styles = StyleSheet.create({});
