import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { Block, Icon } from '../components/AppTheme/index';
import AppBadge from './AppBadge';

const IconWithClick = ({
  onPress,
  name,
  type,
  size,
  color,
  showBadge = false,
  ...otherProps
}) => {
  return (
    <Block flex={0} {...otherProps}>
      {showBadge && <AppBadge style={styles.badge} />}
      <TouchableHighlight underlayColor="none" onPress={onPress}>
        <Icon name={name} size={size} type={type} color={color} />
      </TouchableHighlight>
    </Block>
  );
};

export default IconWithClick;

const styles = StyleSheet.create({
  badge: { position: 'absolute', top: 0, right: 0, marginTop: -6 },
});
