import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../AppTheme';
import Checkbox from '../Checkbox';
import colors from '../../config/colors';

const SettingsCheckboxList = ({ title, itemList, onChange, marginBottom }) => {
  const onChangeValue = ({ index, itemList }) => {
    let newItemList = JSON.parse(JSON.stringify(itemList));
    newItemList.forEach((p_item, p_index) => {
      p_item.selected = false;
    });
    newItemList[index].selected = true;
    onChange({ newItemList, selectedItem: newItemList[index] });
  };

  return (
    <Block noflex white marginBottom={marginBottom}>
      <Block>
        {itemList.map((item, index) => {
          return (
            <Checkbox
              boxType={'circle'}
              text={item.title}
              value={item.selected}
              style={styles.listItem}
              onChange={() => {
                onChangeValue({ index, itemList });
              }}
              selectedBoxColor={colors.appGreen}
              boxStyle={styles.itemBox}
            />
          );
        })}
      </Block>
    </Block>
  );
};

export default SettingsCheckboxList;

const styles = StyleSheet.create({
  listItem: {
    marginBottom: 20,
  },
  itemBox: {
    marginRight: 15,
  },
});
