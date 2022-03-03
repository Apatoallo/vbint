import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text, Icon } from './AppTheme';
import colors from '../config/colors';
import Modal from 'react-native-modal';
import AppButton from './AppButton';
import IconContainer from './IconContainer';

const MessageBox = ({
  isVisible,
  hideModal,
  title,
  subTitle,
  text,
  buttonList = [],
  renderTop,
  renderBottom,
  isSuccess = false,
  renderChildren,
}) => {
  const closeIcon = {
    type: 'materialCommunity',
    name: 'close',
    size: 23,
    color: colors.text,
  };

  const renderSuccessCircle = () => {
    const checkIcon = {
      type: 'materialCommunity',
      name: 'check',
      size: 33,
      color: colors.white,
    };
    return (
      <Block
        center
        noflex
        middle
        marginBottom={20}
        style={{ alignSelf: 'center', width: 80, height: 80, borderRadius: 40 }}
        backgroundColor={colors.circleView}>
        <Icon {...checkIcon} />
      </Block>
    );
  };

  const renderCloseButton = () => {
    return (
      <IconContainer
        icon={closeIcon}
        onPress={hideModal}
        style={styles.closeIcon}
        backgroundColor={colors.iconGray}
        shadow={false}
      />
    );
  };

  const renderHeader = () => {
    return (
      <Block padding={15} noflex>
        {renderCloseButton()}
        {isSuccess ? renderSuccessCircle() : renderTop ? renderTop() : null}
        <Text marginBottom={15} size={18} bold center>
          {title}
        </Text>
        {subTitle ? (
          <Text medium marginBottom={15} center>
            {subTitle}
          </Text>
        ) : null}
        {text ? (
          <Text marginBottom={15} center>
            {text}
          </Text>
        ) : null}
        {renderBottom ? renderBottom() : null}
      </Block>
    );
  };

  const renderButtonList = () => {
    return buttonList.map((button_item, button_index) => {
      return (
        <AppButton
          title={button_item.title}
          onPress={() => {
            hideModal();
            button_item.onPress();
          }}
          backgroundColor={'transparent'}
          textColor={colors.underlinedText}
          style={styles.button}
          titleStyle={styles.buttonTitle}
          paddingVertical={18}
        />
      );
    });
  };

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
      {renderChildren ? (
        renderChildren()
      ) : (
        <Block noflex style={styles.container} white radius={10}>
          {renderHeader()}
          {renderButtonList()}
        </Block>
      )}
    </Modal>
  );
};

export default MessageBox;

const styles = StyleSheet.create({
  closeIcon: {
    borderRadius: 12,
    borderTopRightRadius: 30,
    alignSelf: 'flex-end',
  },
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  button: {
    borderTopWidth: 1,
    borderTopColor: colors.grey,
  },
  buttonTitle: {
    fontWeight: '600',
  },
});
