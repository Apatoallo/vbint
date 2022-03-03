import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from './AppTheme/index';
import Icon, { IconTypes } from './AppTheme/Icon';
import colors from '../config/colors';
import { useTranslation } from 'react-i18next';

const CampaignAvailableItem = ({ campaignAvailable = false }) => {
  const { t } = useTranslation();
  return campaignAvailable ? (
    <Block
      style={styles.item}
      margin
      row
      center
      white
      padding
      radius={24}
      shadow>
      <Text marginRight={2} size={12}>
        {t('campaign')}
      </Text>
      <Icon
        name={'star'}
        type={IconTypes.antdesign}
        size={14}
        color={colors.gold}
      />
    </Block>
  ) : null;
};

export default CampaignAvailableItem;

const styles = StyleSheet.create({
  item: { position: 'absolute', top: 0, left: 0 },
});
