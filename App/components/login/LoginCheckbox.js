import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../AppTheme';
import CheckBox from '@react-native-community/checkbox';
import colors from '../../config/colors';

const LoginCheckbox = ({ errors = [], title, onChange }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <Block>
      <Block flex={0} row>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          tintColors={{ true: colors.secondary }}
          onValueChange={(newValue) => {
            setToggleCheckBox(newValue);
            onChange(newValue);
          }}
        />
        <Block>
          <Text marginLeft>{title}</Text>
        </Block>
      </Block>
      {Array.isArray(errors) ? (
        errors.map((error) => (
          <Text marginTop size={12} color={colors.errorColor}>
            {error}
          </Text>
        ))
      ) : (
        <Text marginTop size={12} color={colors.errorColor}>
          {errors}
        </Text>
      )}
    </Block>
  );
};

export default LoginCheckbox;

const styles = StyleSheet.create({});
