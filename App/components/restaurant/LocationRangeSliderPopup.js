import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Block, Text } from '../AppTheme';
import Modal from 'react-native-modal';
import colors from '../../config/colors';
import IconContainer from '../IconContainer';
import AppButton from '../AppButton';
import Slider from '@react-native-community/slider';
import { Icon, IconTypes } from '../AppTheme/Icon';
import { useTranslation } from 'react-i18next';

const LocationRangeSliderPopup = ({ isVisible, hideModal, onYes }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(1);
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
        <Block noflex white>
          <Text center bold size={18}>
            {t('location_selection')}
          </Text>
          <Block row center space={'between'} marginTop>
            <Icon name={'md-home-outline'} type={IconTypes.ionicon} size={26} />
            <Block>
              <Slider
                step={1}
                style={styles.slider}
                minimumValue={1}
                minimumTrackTintColor="#00D983"
                maximumValue={25}
                onValueChange={(value) => setValue(value)}
              />
            </Block>
            <Icon
              name={'location-outline'}
              type={IconTypes.ionicon}
              size={26}
            />
          </Block>
          <Text center bold>
            {value === 25 ? t('all_distances') : value} Km
          </Text>
          <AppButton
            marginTop={16}
            title={t('apply')}
            onPress={() => {
              onYes(value);
            }}
          />
        </Block>
      </Block>
    </Modal>
  );
};

export default LocationRangeSliderPopup;

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
  slider: {
    width: '100%',
    opacity: 1,
    height: 50,
  },
});
