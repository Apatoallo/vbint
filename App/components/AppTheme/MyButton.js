import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Block, Button, Text, Icon } from '.';

import { IconTypes } from './Icon';

const MyButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, { backgroundColor: props.backgroundColor }]}>
      <Block margin noflex center middle>
        <Text marginTop={5} white bold size={20}>
          {props.text}
        </Text>
      </Block>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5191F9',
    margin: 8,
    borderRadius: 8,
    height: 48,
  },
});

export default MyButton;
