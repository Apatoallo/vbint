import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Block, Text } from './AppTheme';
import Modal from 'react-native-modal';
import colors from '../config/colors';
import IconContainer from './IconContainer';
import AppButton from './AppButton';
import { Icon } from './AppTheme/Icon';
import Separator from './Separator';
import Checkbox from './Checkbox';
import { useTranslation } from 'react-i18next';

const RedirectPopUp = ({ isVisible, hideModal, onYes, onNo }) => {
  const [messageChecked, setMessageChecked] = useState(false);
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
            {t('information')}
          </Text>
          <Text medium center marginTop={16} marginBottom>
            {t('forwarding_message')}
          </Text>
          <Checkbox
            text={t('confirmation_message')}
            value={messageChecked}
            onChange={() => {
              setMessageChecked(!messageChecked);
            }}
          />
        </Block>
        <Block noflex marginTop>
          <Separator backgroundColor={colors.grey} />
          <AppButton
            title={t('go_on')}
            onPress={() => {
              hideModal();
              onYes();
            }}
            disabled={!messageChecked}
            size={13}
            backgroundColor={'transparent'}
            textColor={messageChecked ? colors.underlinedText : colors.black}
            style={styles.button}
          />
          <Separator backgroundColor={colors.grey} />
          <AppButton
            title={t('no_give_up')}
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

export default RedirectPopUp;

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
