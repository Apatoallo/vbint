import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text, TextInput } from '../components/AppTheme';
import useApi from '../hooks/useApi';
import LoadingIndicator from '../components/LoadingIndicator';
import MessagePopup from '../components/MessagePopup';
import colors from '../config/colors';
import AppButton from '../components/AppButton';
import CommentRattingItem from '../components/comment/CommentRattingItem';
import AppSwitch from '../components/AppSwitch';
import comments from '../api/comments';
import { useTranslation } from 'react-i18next';

const AddCommentScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { id, moduleId, showRating = true } = route.params;
  const addCommentApi = useApi(comments.addComment);
  const [text, onChangeText] = React.useState(null);
  const [data, setData] = React.useState({
    cleaningRate: 0,
    locationRate: 0,
    contactRate: 0,
    serviceRate: 0,
    privacy: false,
  });

  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  const addComment = async (text) => {
    const result = await addCommentApi.request({
      id: id,
      comment: text,
      moduleId: moduleId,
      ...data,
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
    <Block white scroll>
      <Block padding={16} white>
        {showRating && (
          <Block noflex>
            <Text bold color={colors.black} size={22}>
              {t('points_comments')}
            </Text>
            <Block flex={0} marginTop>
              <CommentRattingItem
                title={t('cleaning')}
                onValueChange={(value) => {
                  setData({ ...data, cleaningRate: value });
                }}
              />
              <CommentRattingItem
                title={t('contact')}
                onValueChange={(value) => {
                  setData({ ...data, contactRate: value });
                }}
              />
              <CommentRattingItem
                title={t('location')}
                onValueChange={(value) => {
                  setData({ ...data, locationRate: value });
                }}
              />
              <CommentRattingItem
                title={t('service')}
                onValueChange={(value) => {
                  setData({ ...data, serviceRate: value });
                }}
              />
            </Block>
          </Block>
        )}
        <Text bold marginTop={16}>
          {t('write_comment')}
        </Text>
        <Block marginTop>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            multiline={true}
          />
          <Block noflex marginTop>
            <AppSwitch
              value={data.privacy}
              text={t('personal_privacy')}
              onChange={(value) => {
                setData({ ...data, privacy: value });
              }}
            />
          </Block>
        </Block>

        <Block marginTop={16}>
          <AppButton
            title={t('send')}
            onPress={() => {
              addComment(text);
            }}
          />
        </Block>
      </Block>
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

export default AddCommentScreen;

const styles = StyleSheet.create({
  input: {
    height: 300,
    textAlignVertical: 'top',
    padding: 16,
  },
});
