import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Block, Text } from '../AppTheme';
import Modal from 'react-native-modal';
import colors from '../../config/colors';
import IconContainer from '../IconContainer';
import AppButton from '../AppButton';
import { useAuthReducer } from '../../reducers/authReducer';
import { useTranslation } from 'react-i18next';

const AddNotePopup = ({ isVisible, hideModal, onYes }) => {
  const { t } = useTranslation();
  const { userData } = useAuthReducer();

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
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={200}
      onBackdropPress={() => {
        hideModal();
      }}
      onSwipeComplete={() => {
        hideModal();
      }}>
      <Block padding={[16, 16, 0, 16]} radius={16} white flex={0}>
        <IconContainer
          icon={{
            type: 'materialCommunity',
            name: 'close',
            size: 23,
            color: colors.text,
          }}
          onPress={hideModal}
          style={styles.closeIcon}
          backgroundColor={colors.iconGray}
          shadow={false}
        />
        <Block center flex={0}>
          <Image
            style={styles.image}
            source={require('../../assets/images/addNote.png')}
          />
          <Text bold center marginTop size={18}>
            {t('hello')}, {userData ? userData.firstName : ''}
          </Text>
          <Text medium center marginTop={16}>
            {t('add_memory_book')}
          </Text>
        </Block>
        <Block flex={0} marginTop={16}>
          <AppButton
            title={t('yes')}
            onPress={() => {
              hideModal();
              onYes();
            }}
            backgroundColor={'transparent'}
            textColor={colors.markerContentBackground}
            style={styles.button}
            paddingVertical={18}
          />
          <AppButton
            title={'VAZGEÇ'}
            onPress={() => {
              hideModal();
            }}
            backgroundColor={'transparent'}
            textColor={colors.markerContentBackground}
            style={styles.button}
            paddingVertical={18}
          />
        </Block>
      </Block>
    </Modal>
  );
};

export default AddNotePopup;

const styles = StyleSheet.create({
  closeIcon: {
    borderRadius: 12,
    borderTopRightRadius: 30,
    alignSelf: 'flex-end',
  },
  editIcon: {
    backgroundColor: colors.circleView,
    marginLeft: 8,
  },
  image: {
    height: 80,
    width: 80,
  },
  button: {
    borderTopWidth: 1,
    borderTopColor: colors.grey,
  },
});
