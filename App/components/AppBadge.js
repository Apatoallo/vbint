import React from 'react';
import { StyleSheet } from 'react-native';
import { Block } from './AppTheme';

const AppBadge = ({ ...rest }) => {
  return <Block height={6} width={6} radius={3} black {...rest}></Block>;
};

export default AppBadge;

const styles = StyleSheet.create({});
