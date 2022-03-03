import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import AppCheckbox from '../AppCheckbox';
import Block from '../AppTheme/Block';
import RoomListItem from './RoomListItem';
import { Icon, IconTypes } from '../AppTheme/Icon';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';

const CheckBoxRoomListItem = ({ onSelectItem, item }) => {
  const [selected, setSelected] = useState(false);

  return (
    <TouchableHighlight
      underlayColor={colors.transparent}
      onPress={(item) => {
        onSelectItem(item);
      }}>
      <Block white row center>
        <Block white row center padding={[16, 16, 16, 0]}>
          {selected ? (
            <Icon
              name="checkcircle"
              size={24}
              color={colors.appGreen}
              type={IconTypes.antdesign}
            />
          ) : (
            <Icon
              name="circle"
              size={24}
              color={colors.black}
              type={IconTypes.feather}
            />
          )}
        </Block>
        <Block margin={[8, 16, 8, 0]}>
          <RoomListItem item={item} />
        </Block>
      </Block>
    </TouchableHighlight>
  );
};

export default CheckBoxRoomListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    ...AppStyles.shadow,
  },
});
