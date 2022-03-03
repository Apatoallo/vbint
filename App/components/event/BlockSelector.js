import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text, Icon } from '../AppTheme';
import colors from '../../config/colors';
import { IconTypes } from '../AppTheme/Icon';
import SelectorPopUp from '../flight/SelectorPopUp';
import { useTranslation } from 'react-i18next';

const BlockSelector = ({ title, onSelect, list, marginBottom }) => {
  const { t } = useTranslation();

  const [selectorVisible, setSelectorVisible] = useState(false);
  const [block, setBlock] = useState({
    id: list[0].id,
    title: t('section') + list[0].blockName,
    blockName: list[0].blockName,
  });

  return (
    <Block flex={0} marginBottom={marginBottom}>
      <Text bold>{title}</Text>
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
          <Text color={'#5191FA'}>{block.title}</Text>
          <Icon
            name={'keyboard-arrow-down'}
            type={IconTypes.material}
            size={24}
            color={colors.secondary}
          />
        </Block>
        <SelectorPopUp
          itemsList={list.map((item) => {
            return {
              ...item,
              id: item.id,
              title: t('section') + item.blockName,
            };
          })}
          isVisible={selectorVisible}
          hideModal={() => {
            setSelectorVisible(false);
          }}
          onSelect={(item) => {
            setBlock(item);
            onSelect(item);
          }}
        />
      </TouchableOpacity>
    </Block>
  );
};

export default BlockSelector;

const styles = StyleSheet.create({});
