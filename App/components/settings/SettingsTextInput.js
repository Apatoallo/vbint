import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TextInput } from 'react-native';
import { Block, Text } from '../AppTheme';
import { IconTypes } from '../AppTheme/Icon';
import colors from '../../config/colors';
import IconWithClick from '../IconWithClick';
import Separator from '../Separator';
import { RFValue } from 'react-native-responsive-fontsize';
import TextInputMask from 'react-native-text-input-mask';
import { useTranslation } from 'react-i18next';

const SettingsTextInput = ({
  title,
  value,
  onChangeText,
  errors = [],
  onBlur,
  containerStyle,
  showEditIcon = false,
  editable = true,
  multiline,
  type = 'normal', // ['normal', 'password'] olabilir
  isPhone,
  ...otherProps
}) => {
  //  useTranslation
  const { t } = useTranslation();
  // useState
  const [inputEditable, setInputEditable] = useState(
    showEditIcon || type === 'password',
  );
  const [hideText, setHideText] = useState(type === 'password' ? true : false);
  // variables
  const editIcon = {
    type: IconTypes.antdesign,
    name: 'edit',
    size: 18,
    color: colors.black,
  };

  useEffect(() => {
    setInputEditable(showEditIcon || type === 'password');
  }, [showEditIcon, type]);
  return (
    <Block noflex marginTop style={containerStyle}>
      <Text marginBottom={5} bold size={18}>
        {title}
      </Text>
      <Block row center noflex marginBottom={8}>
        {isPhone ? (
          <TextInputMask
            {...otherProps}
            mask={'+[000][000][000][000][000]'}
            style={[styles.input, { maxHeight: multiline ? 150 : 40 }]}
            placeholder={t('enter')}
            value={value}
            onChangeText={onChangeText}
          />
        ) : (
          <TextInput
            editable={inputEditable}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={type === 'password' ? hideText : false}
            style={[styles.input, { maxHeight: multiline ? 150 : 40 }]}
            placeholder={t('enter')}
            multiline={multiline}
            {...otherProps}
          />
        )}
        {showEditIcon && (
          <IconWithClick
            {...editIcon}
            marginLeft
            marginBottom={12}
            style={styles.editIcon}
            onPress={() => {
              setInputEditable(true);
            }}
          />
        )}
        {type === 'password' && (
          <IconWithClick
            type={IconTypes.entypo}
            name={hideText ? 'eye-with-line' : 'eye'}
            color={colors.semiBlack}
            size={20}
            onPress={() => {
              setHideText(!hideText);
            }}
          />
        )}
      </Block>
      <Separator backgroundColor={colors.lightGray} />
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

export default SettingsTextInput;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontFamily: 'Montserrat-Regular',
    color: colors.inputValueText,
    fontSize: RFValue(16, Dimensions.get('window').height),
  },
  editIcon: {
    alignSelf: 'flex-end',
  },
});
