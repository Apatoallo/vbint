import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Block, Text } from './AppTheme';
import Modal from 'react-native-modal';
import colors from '../config/colors';
import IconContainer from './IconContainer';
import AppButton from './AppButton';
import { Icon } from './AppTheme/Icon';

const MessagePopup = ({ isVisible, hideModal, title, subTitle }) => {
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
        <Block flex={0}>
          <Block flex={0}>
            <Image
              style={styles.image}
              source={require('../assets/images/success_pg.png')}
            />
            <Block
              center
              noflex
              middle
              style={{ alignSelf: 'center' }}
              marginBottom={20}
              width={80}
              height={80}
              radius={40}
              backgroundColor={colors.circleView}>
              <Icon
                type="materialCommunity"
                name="check"
                size={33}
                color={colors.white}
              />
            </Block>
          </Block>
          <Block center flex={0} marginBottom={32}>
            <Text bold marginTop size={18}>
              {title}
            </Text>
            <Text center marginTop={16}>
              {subTitle}
            </Text>
          </Block>
        </Block>
      </Block>
    </Modal>
  );
};

export default MessagePopup;

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
  button: {
    borderTopWidth: 1,
    borderTopColor: colors.grey,
  },
});
