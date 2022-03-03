import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from './AppTheme';
import Modal from 'react-native-modal';
import colors from '../config/colors';
import IconContainer from './IconContainer';
import AppButton from './AppButton';
import Separator from './Separator';
import { useAuthReducer } from '../reducers/authReducer';
import { useTranslation } from 'react-i18next';

const ReservationPopup = ({ isVisible, hideModal, onYes, onNo }) => {
  const { userData } = useAuthReducer();
  const { t } = useTranslation();

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
      <Block padding={16} margin={16} radius={16} white flex={0}>
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
        <Block noflex>
          <Text bold center marginTop size={18}>
            {t('hello')}, {userData ? userData.firstName : ''}
          </Text>

          <Text medium center marginTop={16}>
            {t('reservation_text_1')}
          </Text>
          <Text size={14} center marginTop>
            {t('reservation_text_2')}
          </Text>
        </Block>
        <Block noflex marginTop>
          <Separator backgroundColor={colors.grey} />
          <AppButton
            title={t('reservation_btn_1')}
            onPress={() => {
              hideModal();
              onYes();
            }}
            size={13}
            backgroundColor={'transparent'}
            textColor={colors.underlinedText}
            style={styles.button}
          />
          <Separator backgroundColor={colors.grey} />
          <AppButton
            title={t('reservation_btn_2')}
            onPress={() => {
              hideModal();
              onNo();
            }}
            size={13}
            backgroundColor={'transparent'}
            textColor={colors.underlinedText}
            style={styles.button}
          />
        </Block>
      </Block>
    </Modal>
  );
};

export default ReservationPopup;

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
    width: '100%',
    position: 'absolute',
    resizeMode: 'stretch',
  },
});
