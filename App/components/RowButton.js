import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../config/colors';
import { Text, Icon, Block } from './AppTheme';
import { useTranslation } from 'react-i18next';

const RowButton = ({ text, onPress, style }) => {
  const { t } = useTranslation();
  const rightArrowIcon = {
    type: 'fontAwesome',
    name: 'angle-right',
    size: 16,
    color: colors.underlinedText,
  };
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Block flex={0} row center>
        <Text color={colors.hotelCardGrey} marginRight>
          {text ? text : t('choose')}
        </Text>
        <Icon {...rightArrowIcon} />
      </Block>
    </TouchableOpacity>
  );
};

export default RowButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
