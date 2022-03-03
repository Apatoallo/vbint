import React, { useState } from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { Block, Text, Icon } from './AppTheme';
import { IconTypes } from './AppTheme/Icon';
import colors from '../config/colors';
import Separator from './Separator';

const AppSortListItem = ({ title, onSelect, selected, icon }) => {
  return (
    <TouchableHighlight underlayColor={colors.white} onPress={onSelect}>
      <Block>
        <Block center row space={'between'} padding={[16, 16, 16, 0]}>
          <Block center row>
            <Icon {...icon} />
            <Text marginLeft size={18}>
              {title}
            </Text>
          </Block>
          {selected && (
            <Icon
              name="check"
              size={24}
              color={colors.appGreen}
              type={IconTypes.antdesign}
            />
          )}
        </Block>
        <Separator backgroundColor={colors.grey} />
      </Block>
    </TouchableHighlight>
  );
};

export default AppSortListItem;

const styles = StyleSheet.create({});
