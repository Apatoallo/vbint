import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Block, Text, Icon } from '../AppTheme';
import colors from '../../config/colors';
import { IconTypes } from '../AppTheme/Icon';
import SelectorPopUp from '../flight/SelectorPopUp';
import Separator from '../Separator';

const AddressSelector = ({
  title,
  onSelect,
  list,
  selectedItem,
  marginTop,
}) => {
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [selectedAddressItem, setSelectedAddressItem] = useState(selectedItem);

  return (
    <Block flex={0} marginTop>
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
          paddingBottom={10}
          paddingRight={8}>
          <Text>{selectedAddressItem.title}</Text>
          <Icon
            name={'keyboard-arrow-down'}
            type={IconTypes.material}
            size={19}
          />
        </Block>
        <Separator backgroundColor={colors.lightGray} />
        <SelectorPopUp
          itemsList={list.map((item) => {
            return { ...item, id: item.id, title: item.title };
          })}
          isVisible={selectorVisible}
          hideModal={() => {
            setSelectorVisible(false);
          }}
          onSelect={(item) => {
            setSelectedAddressItem(item);
            onSelect(item);
          }}
        />
      </TouchableOpacity>
    </Block>
  );
};

export default AddressSelector;
