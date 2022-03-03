import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '../config/colors';
import { Block, Text } from './AppTheme';

const ErrorListItem = ({ errors = [] }) => {
  return (
    <Block>
      {Array?.isArray(errors?.certificate) ? (
        errors.certificate.map((error) => (
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

export default ErrorListItem;

const styles = StyleSheet.create({});
