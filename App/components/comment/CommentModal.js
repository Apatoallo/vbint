import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Block, Text } from '../AppTheme';
import AppButton from '../AppButton';
import colors from '../../config/colors';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

const CommentModal = ({ isVisible, hideModal, onSend }) => {
  const { t } = useTranslation();
  // useState
  const [comment, setComment] = useState(null);
  return (
    <Modal
      isVisible={isVisible}
      avoidKeyboard={true}
      style={styles.modalContainer}
      onBackdropPress={hideModal}
      onRequestClose={hideModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      propagateSwipe>
      <Block flex={0} style={styles.block}>
        <Block
          borderTopLeftRadius={25}
          borderTopRightRadius={25}
          white
          paddingHorizontal={20}
          paddingTop={35}>
          <Text marginBottom bold color={colors.secondary}>
            {t('comment')}
          </Text>
          <Text size={14} marginBottom>
            {t('write_comment')}
          </Text>
          <TextInput
            value={comment}
            style={styles.commentInput}
            onChangeText={(value) => {
              setComment(value);
            }}
            multiline={true}
          />
          <Block middle margin={16} row style={styles.applyBlock}>
            <AppButton
              radius={15}
              shadow
              paddingHorizontal={40}
              title={t('send')}
              marginBottom
              onPress={() => {
                hideModal();
                onSend(comment);
              }}
            />
          </Block>
        </Block>
      </Block>
    </Modal>
  );
};

export default CommentModal;

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
  },
  applyBlock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  block: {
    height: 330,
    marginTop: 'auto',
  },
  commentInput: {
    height: 150,
    textAlignVertical: 'top',
    backgroundColor: colors.grey,
    borderRadius: 15,
    paddingHorizontal: 16,
    fontSize: 15,
    color: colors.black,
    fontFamily: 'Montserrat-Regular',
  },
});
