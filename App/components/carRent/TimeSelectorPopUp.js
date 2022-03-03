import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Block, Text } from '../AppTheme';
import Modal from 'react-native-modal';
import colors from '../../config/colors';
import AppButton from '../AppButton';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { useTranslation } from 'react-i18next';

const TimeSelectorPopUp = ({ isVisible, onClose, onSelect, defaultDate }) => {
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(defaultDate);
  const [selectedTime, setSelectedTime] = useState();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setCurrentTime(defaultDate);
  }, [defaultDate]);
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
      onBackdropPress={onClose}
      onRequestClose={onClose}>
      <Block
        center
        padding={20}
        noflex
        white
        radius={16}
        borderWidth={0}
        style={styles.block}>
        <Block>
          <Text center marginTop={20} bold size={18}>
            {currentTime
              ? moment(currentTime).format('MMMM YYYY')
              : t('choose_time')}
          </Text>
          {currentTime && (
            <Text center marginBottom={20} size={12}>
              {moment(currentTime).format('Do MMMM')},{' '}
              {selectedTime ? moment(selectedTime).format('HH:mm') : ''}
            </Text>
          )}
          <DatePicker
            is24hourSource="locale"
            date={selectedTime ? selectedTime : new Date()}
            onDateChange={(date) => {
              setSelectedTime(date);
            }}
            mode="time"
            androidVariant={'nativeAndroid'}
            minuteInterval={5}
            locale="tr-TR"
          />
        </Block>
        <AppButton
          title={t('ok')}
          onPress={() => {
            onClose();
            onSelect(selectedTime);
          }}
          disabled={false}
          width={'100%'}
        />
      </Block>
    </Modal>
  );
};

export default TimeSelectorPopUp;

const styles = StyleSheet.create({
  block: {
    height: '50%',
    marginTop: 'auto',
  },
  input: {
    height: '100%',
    textAlignVertical: 'top',
    padding: 16,
  },
});
