import React, { useState } from 'react';
import { StyleSheet, Switch } from 'react-native';
import { Block, Text } from '../AppTheme';
import colors from '../../config/colors';

const TypeSwitch = ({ title, onChange, ...rest }) => {
  const [status, setStatus] = useState(false);
  return (
    <Block
      style={styles.block}
      row
      center
      space={'between'}
      {...rest}
      paddingBottom={16}
      paddingLeft
      paddingRight>
      <Text color={'#484848'} medium>
        {title}
      </Text>
      <Switch
        style={styles.switch}
        trackColor={{ false: '#D3D9E0', true: colors.circleView }}
        thumbColor={colors.white}
        onValueChange={() => {
          setStatus(!status);
          onChange(!status);
        }}
        value={status}
      />
    </Block>
  );
};

export default TypeSwitch;

const styles = StyleSheet.create({
  switch: {
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
  },
  block: {
    borderBottomColor: colors.semiBlack,
    borderBottomWidth: 0.5,
  },
});
