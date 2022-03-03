import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from '../../config/colors';
import { Block, Text } from '../AppTheme';

const DropDownSelector = ({
  title,
  errors = [],
  onSelect,
  list = [],
  selectedItem,
  defaultValue,
  ...otherProps
}) => {
  const [selected, setSelected] = useState(selectedItem);
  let controller;

  return (
    <Block flex={0} {...otherProps}>
      <DropDownPicker
        defaultValue={defaultValue}
        items={list}
        value={selected}
        controller={(instance) => (controller = instance)}
        placeholderStyle={{
          fontFamily: 'Montserrat-Regular',
          marginLeft: -8,
        }}
        onChangeList={(items, callback) => {
          new Promise((resolve, reject) => resolve(console.log(items)))
            .then(() => callback())
            .catch(() => {});
        }}
        disabled={list.length === 0 ? true : false}
        style={styles.container}
        labelStyle={styles.label}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        selectedLabelStyle={{
          fontFamily: 'Montserrat-Bold',
          marginLeft: -8,
        }}
        dropDownStyle={{ backgroundColor: colors.white }}
        onChangeItem={(item) => {
          setSelected(item);
          onSelect(item);
        }}
      />
      {Array.isArray(errors) ? (
        errors.map((error) => (
          <Text marginTop size={12} color={colors.errorColor}>
            {error}
          </Text>
        ))
      ) : (
        <Text marginTop size={12} color={colors.errorColor}>
          {errors}
        </Text>
      )}
    </Block>
  );
};

export default DropDownSelector;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.transparent,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomColor: 'black',
  },
  label: {
    fontSize: RFValue(16, Dimensions.get('window').height),
    color: colors.semiBlack,
    fontFamily: 'Montserrat-Regular',
  },
});
