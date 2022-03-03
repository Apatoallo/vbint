import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { Block, Text } from './AppTheme/index';
import colors from '../config/colors';
import { IconTypes, Icon } from './AppTheme/Icon';
import { useTranslation } from 'react-i18next';

const FloatingMapBtn = ({ onPress }) => {
  const { t } = useTranslation();
  return (
    <Block style={styles.mapBtn} color={colors.transparent}>
      <TouchableHighlight onPress={onPress} underlayColor="none">
        <Block
          color={colors.btnBg}
          row
          center
          padding={[12, 32, 12, 32]}
          radius={16}
          shadow>
          <Icon
            name={'map'}
            type={IconTypes.entypo}
            size={24}
            color={'white'}
          />
          <Text white marginLeft>
            {t('map')}
          </Text>
        </Block>
      </TouchableHighlight>
    </Block>
  );
};

export default FloatingMapBtn;

const styles = StyleSheet.create({
  mapBtn: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: 32,
  },
});
