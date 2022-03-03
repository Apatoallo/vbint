import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Icon } from './AppTheme';

const BackIcon = () => {
  return (
    <Icon
      type={'fontAwesome'}
      name={'angle-left'}
      color="gray"
      size={26}
      style={styles.icon}
    />
  );
};

export default BackIcon;

const styles = StyleSheet.create({
  icon: {
    paddingLeft: Platform.OS === 'ios' ? 16 : 3,
  },
});
