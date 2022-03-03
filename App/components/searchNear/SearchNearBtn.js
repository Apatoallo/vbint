import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import colors from '../../config/colors';
import { Block, Icon, Text } from '../AppTheme';
import { IconTypes } from '../AppTheme/Icon';
import { useTranslation } from 'react-i18next';

const SearchNearBtn = ({ onPress, active }) => {
  const { t } = useTranslation();
  return (
    <TouchableHighlight
      underlayColor={colors.transparent}
      style={styles.searchBtn}
      onPress={onPress}>
      <Block
        color={!active ? colors.btnBg : '#D3D9E0'}
        row
        center
        padding={12}
        radius={16}
        shadow>
        <Icon
          name={'navigate-outline'}
          type={IconTypes.ionicon}
          size={20}
          color={'white'}
        />
        <Text white marginLeft>
          {t('search_near')}
        </Text>
      </Block>
    </TouchableHighlight>
  );
};

export default SearchNearBtn;

const styles = StyleSheet.create({
  searchBtn: { alignSelf: 'flex-end', marginRight: 16, marginBottom: 16 },
});
