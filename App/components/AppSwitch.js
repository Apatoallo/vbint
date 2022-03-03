import React from 'react';
import { Switch, StyleSheet } from 'react-native';
import colors from '../config/colors';
import { Block, Text } from './AppTheme';

const AppSwitch = ({ text, value, onChange, style, subText, ...props }) => {
  return (
    <Block noflex style={style}>
      <Block row noflex center>
        <Text marginRight style={styles.switchText} bold>
          {text}
        </Text>
        <Switch
          trackColor={{
            false: colors.switchThumbDisabledBackground,
            true: colors.checkboxBackground,
          }}
          thumbColor={colors.white}
          onValueChange={() => {
            onChange(!value);
          }}
          value={value}
          style={styles.switch}
          {...props}
        />
      </Block>
      {subText ? (
        <Text size={13} color={colors.rowItemSubText} marginBottom={5}>
          {subText}
        </Text>
      ) : null}
    </Block>
  );
};

export default AppSwitch;

const styles = StyleSheet.create({
  switchText: {
    flex: 1,
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
});
