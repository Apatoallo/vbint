import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text, Icon } from '../AppTheme';
import colors from '../../config/colors';
import { IconTypes } from '../AppTheme/Icon';
import SelectorPopUp from '../flight/SelectorPopUp';

const LoginSelector = ({ title, onSelect, list, errors, selectedItem }) => {
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [item, setItem] = useState(null);
  useEffect(() => {
    setItem(null);
  }, [list]);
  return (
    <Block flex={0}>
      <TouchableOpacity
        onPress={() => {
          list.length > 0 ? setSelectorVisible(true) : null;
        }}>
        <Block
          marginTop={16}
          row
          center
          space={'between'}
          marginBottom
          style={styles.container}
          paddingBottom={16}>
          <Text color={list.length > 0 ? colors.black : colors.blackGrey}>
            {list.length === 0 ? title : item ? item.title : title}
          </Text>
          <Icon
            name={'keyboard-arrow-down'}
            type={IconTypes.material}
            size={20}
            color={colors.black}
          />
        </Block>
        <SelectorPopUp
          itemsList={list.map((item) => {
            return { ...item, id: item.id, title: item.title };
          })}
          isVisible={selectorVisible}
          hideModal={() => {
            setSelectorVisible(false);
          }}
          onSelect={(item) => {
            setItem(item);
            onSelect(item);
          }}
        />
      </TouchableOpacity>
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

export default LoginSelector;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.transparent,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});
