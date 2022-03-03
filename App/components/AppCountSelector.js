import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Block, Text, Icon } from './AppTheme';
import { IconTypes } from './AppTheme/Icon';
import colors from '../config/colors';

const AppCountSelector = ({ title, updateCount }) => {
  const [count, setCount] = useState(0);
  return (
    <Block marginTop noFlex center space={'between'} margin={16} row>
      <Text size={18}>{title}</Text>
      <Block noFlex row center>
        <TouchableOpacity
          onPress={() => {
            setCount(count !== 0 ? count - 1 : 0);
            updateCount(count !== 0 ? count - 1 : 0);
          }}>
          <Icon
            type={IconTypes.antdesign}
            name={'minuscircle'}
            color={count === 0 ? colors.lightGray : colors.appGreen}
            size={30}
          />
        </TouchableOpacity>
        <Text margin>{count}</Text>
        <TouchableOpacity
          onPress={() => {
            setCount(count + 1);
            updateCount(count + 1);
          }}>
          <Icon
            type={IconTypes.antdesign}
            name={'pluscircle'}
            color={colors.appGreen}
            size={30}
          />
        </TouchableOpacity>
      </Block>
    </Block>
  );
};

export default AppCountSelector;

const styles = StyleSheet.create({
  border: {
    borderColor: '#4CB7FE',
    borderRadius: 16,
    borderWidth: 0.5,
  },
  viewStyle: {
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: colors.white,
  },
});
