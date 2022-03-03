import React from 'react';
import { StyleSheet,Platform } from 'react-native';
import { Block, Icon } from '../AppTheme/index';
import { IconTypes } from '../AppTheme/Icon';

const BottomBarIcon = ({ props, name, type }) => {
  return (
    <Block style={{ justifyContent: 'center', alignItems: 'center'}}>
      <Icon
        type={type}
        name={name}
        size={props.size}
        color={props.color}
        style={styles.icon}
      />
      {props.focused && <Block style={styles.circle} noflex></Block>}
    </Block>
  );
};

export default BottomBarIcon;

const styles = StyleSheet.create({
  icon: { },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    backgroundColor: 'white',
    bottom: Platform.OS==='ios' ? -15 : 10,
    position:'absolute'
  },
});
