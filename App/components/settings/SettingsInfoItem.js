import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text } from '../AppTheme';
import IconWithClick from '../IconWithClick';
import { IconTypes } from '../AppTheme/Icon';
import colors from '../../config/colors';
import Separator from '../Separator';

const SettingsInfoItem = ({
  title,
  text,
  isEdit = true,
  onPressEditIcon,
  marginBottom,
}) => {
  const editIcon = {
    type: IconTypes.antdesign,
    name: 'edit',
    size: 18,
    color: colors.black,
  };
  return (
    <TouchableOpacity
      onPress={onPressEditIcon}
      disabled={isEdit ? false : true}>
      <Block noflex marginBottom={marginBottom}>
        <Block noflex>
          <Text marginBottom={5} bold size={18}>
            {title}
          </Text>
          <Block center marginBottom={15} row>
            <Text
              size={16}
              color={colors.inputValueText}
              style={styles.dateText}>
              {text}
            </Text>
            {isEdit && (
              <IconWithClick
                {...editIcon}
                style={styles.editIcon}
                onPress={() => {}}
              />
            )}
          </Block>
        </Block>
        <Separator backgroundColor={colors.lightGray} />
      </Block>
    </TouchableOpacity>
  );
};

export default SettingsInfoItem;

const styles = StyleSheet.create({
  editIcon: {
    marginLeft: 10,
  },
  dateText: {
    flex: 1,
  },
});
