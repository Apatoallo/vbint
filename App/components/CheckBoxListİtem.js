import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from './AppTheme';
import AppCheckbox from './AppCheckbox';
import colors from '../config/colors';

const CheckBoxListİtem = ({ title, itemList, updateItem }) => {
  return (
    <Block noFex white>
      <Block flex={0} color={colors.titleBg} padding={16}>
        <Text medium size={18}>
          {title}
        </Text>
      </Block>
      <Block margin={[0, 16, 16, 0]}>
        {itemList.map((item) => {
          return (
            <AppCheckbox
              title={item.title}
              status={item.selected}
              updateStatus={(status) =>
                updateItem({ ...item, selected: status })
              }
            />
          );
        })}
      </Block>
    </Block>
  );
};

export default CheckBoxListİtem;

const styles = StyleSheet.create({});
