import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Block, Text } from './AppTheme';
import colors from '../config/colors';

const AppTextInput = ({
  value,
  title,
  onChangeText,
  marginBottom,
  multiline,
  inputStyle,
  titleBold,
  titleColor,
  errors = [],
  ...otherProps
}) => {
  return (
    <Block noflex marginBottom={marginBottom}>
      <Text
        marginBottom
        medium={titleBold ? false : true}
        bold={titleBold}
        color={titleColor}>
        {title}
      </Text>
      <TextInput
        value={value}
        style={[styles.input, multiline && { height: 70 }, inputStyle]}
        onChangeText={onChangeText}
        multiline={multiline}
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

export default AppTextInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    borderColor: colors.inputBorder,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    fontFamily: 'Montserrat-Regular',
  },
});
