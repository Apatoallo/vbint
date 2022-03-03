import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text, Icon } from '../AppTheme';
import colors from '../../config/colors';
import { IconTypes } from '../AppTheme/Icon';
import RoomsListSelector from './RoomsListSelector';
import { useTranslation } from 'react-i18next';

const RoomSelectorItem = ({ title = '', list, onSelect }) => {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { t } = useTranslation();

  return (
    <Block flex={0}>
      <Text bold>{title}</Text>
      <TouchableOpacity
        onPress={() => {
          setCalendarVisible(true);
        }}>
        <Block
          marginTop
          row
          center
          space={'between'}
          padding={12}
          radius={12}
          borderWidth={0.5}
          borderColor={colors.inputBorder}>
          <Text color={'#5191FA'}>
            {selectedRoom ? selectedRoom.title + '' : t('choose')}
          </Text>
          <Icon
            name={'plus'}
            type={IconTypes.materialCommunity}
            size={24}
            color={colors.semiBlack}
          />
        </Block>
      </TouchableOpacity>
      <RoomsListSelector
        isVisible={calendarVisible}
        onClose={() => {
          setCalendarVisible(false);
        }}
        list={list}
        onSelect={(room) => {
          setSelectedRoom(room);
          console.log('test', room);
          onSelect(room);
          setCalendarVisible(false);
        }}
      />
    </Block>
  );
};

export default RoomSelectorItem;

const styles = StyleSheet.create({});
