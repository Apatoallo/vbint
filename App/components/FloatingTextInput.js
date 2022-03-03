import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Item, Input, Label, Title } from 'native-base';
import { Block, Text } from './AppTheme';
import colors from '../config/colors';
import FloatingLabelInput from '../components/login/FloatingInput';

const FloatingTextInput = ({
  title,
  value,
  onChangeText,
  errors = [],
  isPassword,
  onBlur,
  containerStyle,
  isPhone,
  ...otherProps
}) => {
  return (
    <Block flex={0} marginTop style={containerStyle}>
      <FloatingLabelInput
        label={title}
        isPhone={isPhone}
        value={value}
        onChangeText={onChangeText}
        isPassword={isPassword}
        onBlur={onBlur}
        showError={errors.length === 0 ? false : true}
        {...otherProps}
      />
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

export default FloatingTextInput;

const styles = StyleSheet.create({
  Label: {
    color: colors.black,
  },
  LabelError: {
    color: 'red',
  },
});
