import React, { useReducer } from 'react';
import { StyleSheet, TextInput as RNInput } from 'react-native';

import expoTheme from './theme';
import { mergeTheme, rgba } from './utils/index';

export const INITIAL_STATE = {
  focused: false,
  blurred: false,
};
export const focus = () => {
  return { type: 'focus' };
};
export const blur = () => {
  return { type: 'blur' };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'focus':
      return { ...state, focused: true, blurred: false };
    case 'blur':
      return { ...state, focused: false, blurred: true };
    default:
      return state;
  }
};

const TextInput = (props) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const handleValidation = (value) => {
    const { pattern } = props;
    if (!pattern) {
      return true;
    }

    // string pattern, one validation rule
    if (typeof pattern === 'string') {
      const condition = new RegExp(pattern, 'g');
      return condition.test(value);
    }

    // array patterns, multiple validation rules
    if (typeof pattern === 'object') {
      const conditions = pattern.map((rule) => new RegExp(rule, 'g'));
      return conditions.map((condition) => condition.test(value));
    }
  };

  const handleChange = (value) => {
    const { onChangeText, onValidation } = props;
    const isValid = handleValidation(value);
    onValidation && onValidation(isValid);
    onChangeText && onChangeText(value);
  };

  const handleFocus = (event) => {
    const { onFocus } = props;
    dispatch(focus());
    onFocus && onFocus(event);
  };

  const handleBlur = (event) => {
    const { onBlur } = props;
    dispatch(blur());
    onBlur && onBlur(event);
  };

  const handleTextType = (type) => {
    return type === 'email'
      ? 'emailAddress'
      : type === 'phone'
      ? 'telephoneNumber'
      : type;
  };

  const {
    autoCorrect,
    autoCapitalize,
    placeholder,
    children,
    borderWidth,
    borderColor,
    type,
    style,
    theme,
    internalRef,
    onFocus,
    onBlur,
    onChangeText,
    multiline,
    ...rest
  } = props;
  const { SIZES, COLORS } = mergeTheme({ ...expoTheme }, theme);

  const textStyles = StyleSheet.flatten([
    {
      borderWidth: 1,
      height: SIZES.base * 5.5,
      borderRadius: SIZES.radius,
      borderColor: rgba(COLORS.primary, 0.4),
      paddingHorizontal: SIZES.base,
      fontSize: SIZES.font,
      paddingLeft: 16,
    },
    borderWidth && { borderWidth },
    borderColor && { borderColor },
    style,
    multiline && {
      height: SIZES.base * 11,
      paddingVertical: SIZES.base,
    },
  ]);
  const textType = handleTextType(type);

  const internalProps = {
    style: textStyles,
    autoCorrect,
    autoCapitalize,
    placeholder,
    textContentType: textType,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChangeText: handleChange,
  };

  return (
    <RNInput
      ref={internalRef}
      multiline={multiline}
      {...props}
      {...internalProps}
      {...rest}
      testID="text-input">
      {children}
    </RNInput>
  );
};

TextInput.defaultProps = {
  pattern: null,
  onFocus: null,
  onBlur: null,
  onChangeText: null,
  onValidation: null,
  placeholder: null,
  autoCorrect: false,
  autoCapitalize: 'none',
  internalRef: null,
  theme: {},
  style: {},
  multiline: false,
};

export default TextInput;
