import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text, Icon } from '../AppTheme';
import colors from '../../config/colors';
import { IconTypes } from '../AppTheme/Icon';
import SelectorPopUp from '../flight/SelectorPopUp';

const ChildAgeSelector = ({ title, onSelect, list }) => {
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [block, setBlock] = useState({
    id: list[0].id,
    title: list[0].title,
  });

  return (
    <Block flex={0} row center marginTop>
      <Block>
        <Text size={18} bold>
          {title}
        </Text>
      </Block>
      <Block>
        <TouchableOpacity
          onPress={() => {
            setSelectorVisible(true);
          }}>
          <Block
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
              return { id: item.id, title: item.title };
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
    </Block>
  );
};

export default ChildAgeSelector;

const styles = StyleSheet.create({});
