import React, { useState } from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { Block, Text, Icon } from './AppTheme';
import { IconTypes } from './AppTheme/Icon';
import colors from '../config/colors';
import Separator from './Separator';

const AppCheckbox = ({ status, title, updateStatus }) => {
  const [selected, setSelected] = useState(status);
  return (
    <TouchableHighlight
      underlayColor={colors.white}
      onPress={() => {
        setSelected(!selected);
        updateStatus(!selected);
      }}>
      <Block flex={0}>
        <Block row center padding={[16, 16, 16, 0]}>
          {selected ? (
            <Icon
              name="checkcircle"
              size={24}
              color={colors.appGreen}
              type={IconTypes.antdesign}
            />
          ) : (
            <Icon
              name="circle"
              size={24}
              color={colors.black}
              type={IconTypes.feather}
            />
          )}
          <Text marginLeft size={18}>
            {title}
          </Text>
        </Block>
        <Separator backgroundColor={colors.grey} />
      </Block>
    </TouchableHighlight>
  );
};

export default AppCheckbox;

const styles = StyleSheet.create({});
