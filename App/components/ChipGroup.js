import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text } from './AppTheme';
import colors from '../config/colors';

const ChipGroup = ({
  data,
  onChange,
  title,
  style,
  singleSelect,
  selectedValue,
}) => {
  const changeSelectedItem = (selectedIndex) => {
    let newData = JSON.parse(JSON.stringify(data));
    newData[selectedIndex].selected = !newData[selectedIndex].selected;
    let selectedValues = [];
    newData.forEach((p_item, p_index) => {
      selectedValues.push(p_item);
    });
    onChange({ selectedValues, data: newData });
  };
  return (
    <Block noflex style={style}>
      <Text bold size={18} marginBottom>
        {title}
      </Text>
      <Block marginTop noflex row style={styles.horizontalContainer}>
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.chipItem,
                {
                  backgroundColor: item.selected
                    ? colors.chipBackground
                    : item.id === selectedValue
                    ? colors.chipBackground
                    : 'transparent',
                },
              ]}
              onPress={() => {
                singleSelect ? onChange(item) : changeSelectedItem(index);
              }}>
              <Text
                style={{
                  color: item.selected
                    ? colors.white
                    : item.id === selectedValue
                    ? colors.white
                    : colors.black,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Block>
    </Block>
  );
};

export default ChipGroup;

const styles = StyleSheet.create({
  chipItem: {
    marginBottom: 15,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginRight: 10,
    borderColor: colors.chipBackground,
    borderWidth: 1,
  },
  horizontalContainer: {
    flexWrap: 'wrap',
  },
});
