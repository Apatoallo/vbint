import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme/index';
import AppButton from '../../components/AppButton';
import Separator from '../../components/Separator';
import CommentModal from '../../components/comment/CommentModal';
import colors from '../../config/colors';
import useApi from '../../hooks/useApi';
import comments from '../../api/comments';
import MessagePopup from '../../components/MessagePopup';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useTranslation } from 'react-i18next';

const MyCommentsDetail = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { data } = route.params;
  const [newCommentVisible, setNewCommentVisible] = useState(false);
  const addCommentApi = useApi(comments.addComment);
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  const addComment = async (text) => {
    const result = await addCommentApi.request({
      id: data.id,
      comment: text,
      moduleId: data.moduleId,
      commentId: data.commentId,
    });
    if (result.ok) {
      setMessagePopupVisible({
        isVisible: true,
        title: t('successful'),
        subTitle: result.data.message,
      });
    } else {
    }
  };
  return (
    <Block padding={10} white>
      <Block
        noflex
        marginBottom={20}
        radius={15}
        paddingTop={14}
        paddingBottom={24}
        backgroundColor={colors.commentBackground}>
        <Text
          marginLeft={14}
          size={18}
          marginBottom
          bold
          style={styles.titleText}>
          {data.title}
        </Text>
        <Block noflex row center marginBottom={15} marginLeft={14}>
          <Text size={14} color={colors.hotelCardGrey} marginRight>
            {data.date}
          </Text>
          <Block
            marginRight={5}
            paddingVertical={4}
            paddingHorizontal={12}
            radius={10}
            noflex
            padding
            backgroundColor={colors.newCommentView}>
            <Text white size={11}>
              {data.subCommnets.length + t('new_comment')}
            </Text>
          </Block>
        </Block>
        <Separator backgroundColor={colors.lightGray} marginBottom />
        <Block
          noflex
          marginHorizontal={9}
          radius={12}
          white
          padding
          paddingBottom={25}
          marginBottom={15}>
          <Text marginBottom bold size={14}>
            {data.userName}
          </Text>
          <Text marginBottom size={14} color={colors.hotelCardGrey}>
            {data.comment}
          </Text>

          <Block paddingLeft={15} noflex marginLeft style={styles.verticalBar}>
            {data.subCommnets.map((item, index) => {
              return (
                <Block noflex marginBottom>
                  <Text bold marginBottom={5}>
                    {item.userName}
                  </Text>
                  <Text size={14} marginBottom={5} color={colors.commentDate}>
                    {item.date}
                  </Text>
                  <Text color={colors.hotelCardGrey}>{item.comment}</Text>
                </Block>
              );
            })}
          </Block>
        </Block>
        <AppButton
          title={t('comment')}
          size={12}
          textOnly
          underlined
          onPress={() => {
            setNewCommentVisible(true);
          }}
          textColor={colors.underlinedText}
          style={styles.readCommentButton}
          marginRight
        />
      </Block>
      <CommentModal
        isVisible={newCommentVisible}
        hideModal={() => {
          setNewCommentVisible(false);
        }}
        onSend={(txt) => {
          addComment(txt);
        }}
      />
      <MessagePopup
        isVisible={messagePopupVisible.isVisible}
        title={messagePopupVisible.title}
        subTitle={messagePopupVisible.subTitle}
        hideModal={() => {
          setMessagePopupVisible({ isVisible: false });
          navigation.goBack();
        }}
      />
      <LoadingIndicator visible={addCommentApi.loading} />
    </Block>
  );
};

export default MyCommentsDetail;

const styles = StyleSheet.create({
  starIcon: {
    marginRight: 5,
  },
  campaignText: {
    flex: 1,
  },
  readCommentButton: {
    alignSelf: 'flex-end',
  },
  titleText: {
    textDecorationLine: 'underline',
  },
  verticalBar: {
    borderLeftWidth: 8,
    borderColor: colors.verticalBar,
  },
});
