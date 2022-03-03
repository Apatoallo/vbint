import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text } from '../AppTheme';
import colors from '../../config/colors';
import AppBadge from '../AppBadge';

const CalenderDayItem = ({
  dayName,
  dayNumber,
  selected,
  onPress,
  showBadge = false,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Block
        white
        radius={12}
        flex={0}
        margin={selected ? 0 : 4}
        style={selected ? styles.selected : null}
        center
        shadow={selected ? true : false}
        padding={selected ? [18, 24, 18, 24] : [12, 24, 12, 24]}
        color={selected ? colors.underlinedText : colors.whiteGrey}>
        <Text color={selected ? colors.white : colors.blackGrey}>
          {dayName}
        </Text>
        <Text
          bold
          marginTop={2}
          color={selected ? colors.white : colors.calenderBlack}>
          {dayNumber}
        </Text>
        {showBadge && <AppBadge style={styles.badge} />}
      </Block>
    </TouchableOpacity>
  );
};

export default CalenderDayItem;

const styles = StyleSheet.create({
  selected: { marginLeft: 4, marginRight: 4 },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 8,
    backgroundColor: colors.danger,
  },
});
