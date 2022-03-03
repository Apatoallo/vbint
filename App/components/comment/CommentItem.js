import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Block, Text } from '../AppTheme';
import AppButton from '../AppButton';
import Separator from '../Separator';
import colors from '../../config/colors';
import { useTranslation } from 'react-i18next';

const CommentItem = ({
  title,
  date,
  person,
  newCommentCount,
  comment,
  onPressReadComments,
}) => {
  const { t } = useTranslation();
  return (
    <Block
      noflex
      marginBottom={20}
      radius={15}
      padding={14}
      backgroundColor={colors.commentBackground}>
      <Text marginBottom bold style={styles.titleText}>
        {title}
      </Text>
      <Block noflex row center marginBottom>
        <Text size={14} color={colors.hotelCardGrey} marginRight>
          {date}
        </Text>
        <Block
          paddingVertical={4}
          paddingHorizontal={12}
          radius={10}
          noflex
          padding
          backgroundColor={colors.newCommentView}>
          <Text white size={11}>
            {newCommentCount + ' ' + t('new_comment')}
          </Text>
        </Block>
      </Block>
      <Separator backgroundColor={colors.lightGray} marginBottom />
      {person != null && (
        <Text marginBottom bold size={14}>
          {person}
        </Text>
      )}
      <Text marginBottom size={14} color={colors.hotelCardGrey}>
        {comment}
      </Text>
      {newCommentCount > 0 && (
        <AppButton
          title={t('read_comment')}
          size={12}
          textOnly
          underlined
          onPress={onPressReadComments}
          textColor={colors.underlinedText}
          style={styles.readCommentButton}
        />
      )}
    </Block>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  readCommentButton: {
    alignSelf: 'flex-end',
  },
  titleText: {
    textDecorationLine: 'underline',
  },
});
