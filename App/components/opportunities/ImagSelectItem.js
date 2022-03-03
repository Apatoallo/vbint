import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text } from '../AppTheme';
import Icon from '../AppTheme/Icon';
import colors from '../../config/colors';

const ImagSelectItem = ({ iconName, iconType, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Block space={'between'} center row padding={16}>
        <Block row center>
          <Icon
            type={iconType}
            name={iconName}
            color={'#6A6A6A'}
            size={24}
            style={styles.icon}
          />
          <Text marginLeft bold color={colors.semiBlack}>
            {title}
          </Text>
        </Block>
        <Icon
          type={'fontAwesome'}
          name={'angle-right'}
          color={colors.semiBlack}
          size={24}
          style={styles.icon}
        />
      </Block>
    </TouchableOpacity>
  );
};

export default ImagSelectItem;

const styles = StyleSheet.create({});
