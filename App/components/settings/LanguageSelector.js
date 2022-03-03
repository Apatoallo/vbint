import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text, Icon } from '../AppTheme';
import colors from '../../config/colors';
import { IconTypes } from '../AppTheme/Icon';

import SelectorPopUp from '../flight/SelectorPopUp';

const LanguageSelector = ({ title, onSelect, list }) => {
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [lang, setLang] = useState();
  useEffect(() => {
    setLang(
      list.filter((item) => {
        return item.selected === true;
      })[0],
    );
  }, [list]);
  return (
    <Block flex={0}>
      <TouchableOpacity
        onPress={() => {
          setSelectorVisible(true);
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
          <Text color={'#5191FA'}>{lang?.title}</Text>
          <Icon
            name={'keyboard-arrow-down'}
            type={IconTypes.material}
            size={24}
            color={colors.secondary}
          />
        </Block>
        <SelectorPopUp
          itemsList={list}
          isVisible={selectorVisible}
          hideModal={() => {
            setSelectorVisible(false);
          }}
          onSelect={(item) => {
            setLang(item);
            onSelect(item);
          }}
        />
      </TouchableOpacity>
    </Block>
  );
};

export default LanguageSelector;

const styles = StyleSheet.create({});
