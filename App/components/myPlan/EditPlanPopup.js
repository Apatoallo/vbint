import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../AppTheme';
import Modal from 'react-native-modal';
import colors from '../../config/colors';
import IconContainer from '../IconContainer';
import Icon, { IconTypes } from '../AppTheme/Icon';
import Separator from '../Separator';

const EditPlanPopup = ({ isVisible, hideModal, item, onDelete, onEdit }) => {
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
      <Block padding={[16, 16, 0, 16]} margin={16} radius={16} white flex={0}>
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
        <Text bold size={28}>
          {item?.title}
        </Text>
        <Text medium marginTop>
          {item?.note}
        </Text>
        <Block marginTop={16} center row flex={0} marginBottom marginLeft={-3}>
          <Icon
            name="location"
            size={24}
            color={colors.activityColor}
            type={IconTypes.evilicon}
          />
          <Block>
            <Text color={colors.activityColor}>{item?.address}</Text>
          </Block>
        </Block>
        <Separator backgroundColor={colors.blackGrey} />
        <Block marginTop center row flex={0} marginBottom>
          <Icon
            name="calendar"
            size={20}
            color={colors.activityColor}
            type={IconTypes.feather}
          />
          <Block>
            <Text color={colors.activityColor} marginLeft>
              {item?.startTime + ' - ' + item?.finishTime}
            </Text>
          </Block>
        </Block>
        <Separator backgroundColor={colors.blackGrey} />
        <Text
          onPress={() => {
            onDelete(item);
          }}
          margin
          marginTop={16}
          size={18}
          bold
          color={colors.blackGrey}>
          Sil
        </Text>
        {/* 
        <Block marginTop flex={0} center marginBottom={-30}>
        <Block row>
              <IconContainer
                size={40}
                icon={{
                  type: IconTypes.antdesign,
                  name: 'edit',
                  size: 24,
                  color: colors.white,
                }}
                onPress={onEdit}
                style={styles.editIcon}
              />
              <IconContainer
                size={40}
                icon={{
                  type: IconTypes.antdesign,
                  name: 'delete',
                  size: 24,
                  color: colors.white,
                }}
                onPress={() => {
                  onDelete(item);
                }}
                style={styles.editIcon}
              />
            </Block>
        </Block> */}
      </Block>
    </Modal>
  );
};

export default EditPlanPopup;

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
});
