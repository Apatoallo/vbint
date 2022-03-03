import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Block, Icon } from './AppTheme';
import colors from '../config/colors';

const Checkbox = ({
  value,
  text,
  onChange,
  style,
  boxType = 'square', // circle or square
  selectedBoxColor = colors.checkboxBackground,
  boxStyle,
}) => {
  const uncheckedStyle = {
    borderWidth: 1.5,
    borderColor: colors.lightGray,
  };
  const checkedStyle = {
    backgroundColor: selectedBoxColor,
  };
  const checkIcon = {
    type: 'materialCommunity',
    name: 'check',
    size: 16,
    color: colors.white,
  };
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => {
        onChange();
      }}>
      <Block
        center
        middle
        style={[
          styles.square,
          { borderRadius: boxType === 'square' ? 4 : 10 },
          value ? checkedStyle : uncheckedStyle,
          boxStyle,
        ]}
        marginRight
        noflex>
        {value && <Icon {...checkIcon} />}
      </Block>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = {
  container: {
    flexDirection: 'row',
  },
  square: {
    width: 20,
    height: 20,
  },
  text: {
    flex: 1,
  },
};
