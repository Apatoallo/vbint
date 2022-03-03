import React, { useState } from 'react';
import { StyleSheet, TextInput, Dimensions } from 'react-native';
import { Block, Text } from '../AppTheme';
import Modal from 'react-native-modal';
import colors from '../../config/colors';
import AppButton from '../AppButton';
import AppStyles from '../../config/AppStyles';
import { useTranslation } from 'react-i18next';

const AddNoteTextAreaPopUp = ({
  initialValue,
  isVisible,
  hideModal,
  onSave,
}) => {
  const { t } = useTranslation();
  const [text, onChangeText] = useState(initialValue);

  return (
    <Modal
      isVisible={isVisible}
      avoidKeyboard={true}
      backdropColor={colors.black}
      backdropOpacity={0.8}
      animationIn={'zoomInDown'}
      animationOut={'zoomOutUp'}
      animationInTiming={200}
      animationOutTiming={200}
      style={{ margin: 0 }}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={200}
      onBackdropPress={() => {
        hideModal();
      }}
      onSwipeComplete={() => {
        hideModal();
      }}>
      <Block
        padding={16}
        paddingBottom={32}
        flex={0}
        style={styles.block}
        white>
        <Text bold color={colors.secondary}>
          {t('add_note')}
        </Text>
        <Text marginTop={16}>{t('your_note')}</Text>
        <Block
          marginTop={16}
          marginBottom={16}
          radius={24}
          backgroundColor="#D3D9E0"
          style={AppStyles.overflow}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            multiline={true}
          />
        </Block>

        <AppButton
          style={styles.saveBtn}
          title={t('save')}
          onPress={() => {
            hideModal();
            onSave(text);
          }}
        />
      </Block>
    </Modal>
  );
};

export default AddNoteTextAreaPopUp;

const styles = StyleSheet.create({
  block: {
    height: Dimensions.get('window').height * 0.4,
    marginTop: 'auto',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  input: {
    height: '100%',
    textAlignVertical: 'top',
    padding: 16,
  },
});
