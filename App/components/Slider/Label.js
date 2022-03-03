import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../../config/colors';
import { Text } from '../AppTheme';

const Label = ({ text, ...restProps }) => {
  return (
    <View style={styles.root} {...restProps}>
      <Text black medium>
        {text} ₺
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 8,

    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
});

export default memo(Label);
