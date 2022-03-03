import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../AppTheme';
import Modal from 'react-native-modal';
import colors from '../../config/colors';
import AppButton from '../AppButton';
import PersonCountSelector from '../PersonCountSelector';
import { useTranslation } from 'react-i18next';

const PassengersSelectorPopUp = ({ isVisible, hideModal, onSelect }) => {
  const { t } = useTranslation();
  const [adultsCount, setAdultsCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  return (
    <Modal
      isVisible={isVisible}
      avoidKeyboard={true}
      backdropColor={colors.black}
      backdropOpacity={0.8}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
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
      <Block padding={16} flex={0} style={styles.block} radius={16} white>
        <Block white>
          <Block flex={0} center>
            <Text medium size={20}>
              {t('passengers')}
            </Text>
            <Text size={14} color={'#909090'}>
              {adultsCount + t('adult')}
            </Text>
            <Text size={14} color={'#909090'}>
              {childrenCount + t('child')}
            </Text>
          </Block>
          <PersonCountSelector
            title={t('adults')}
            subTitle={t('up_13')}
            name={t('adult')}
            updateCount={(count) => {
              setAdultsCount(count);
            }}
            marginTop
          />
          <PersonCountSelector
            title={t('children')}
            subTitle={t('between_2_12')}
            name={t('child')}
            updateCount={(count) => {
              setChildrenCount(count);
            }}
          />
        </Block>
        <AppButton
          margin={16}
          disabled={adultsCount > 0 ? false : true}
          title={t('ok')}
          onPress={() => {
            onSelect({ adult: adultsCount, child: childrenCount });
            hideModal();
          }}
        />
      </Block>
    </Modal>
  );
};

export default PassengersSelectorPopUp;

const styles = StyleSheet.create({
  block: {
    height: '60%',
    marginTop: 'auto',
  },
  input: {
    height: '100%',
    textAlignVertical: 'top',
    padding: 16,
  },
});
