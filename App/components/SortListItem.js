import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from './AppTheme';
import AppSortListItem from './AppSortListItem';
import colors from '../config/colors';
import { IconTypes } from './AppTheme/Icon';

const SortListItem = ({ title, itemList, setSelectedItem }) => {
  const [selected, setSelected] = useState(null);

  return (
    <Block noFex white>
      <Block flex={0} color={'#33363636'} padding={16}>
        <Text medium size={18}>
          {title}
        </Text>
      </Block>
      <Block margin={[0, 16, 16, 0]}>
        {itemList.map((item, index) => {
          return (
            <AppSortListItem
              title={item.title}
              onSelect={() => {
                setSelected(item);
                setSelectedItem(item);
              }}
              icon={{
                name:
                  index === 0 ? 'sort-amount-down-alt' : 'sort-amount-up-alt',
                size: 24,
                color: colors.semiBlack,
                type: IconTypes.fontAwesome5,
              }}
              selected={selected && item.id === selected.id ? true : false}
            />
          );
        })}
      </Block>
    </Block>
  );
};

export default SortListItem;

const styles = StyleSheet.create({});
