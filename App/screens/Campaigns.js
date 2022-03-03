import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Block, Text } from '../components/AppTheme/index';
import Icon from '../components/AppTheme/Icon';
import Separator from '../components/Separator';
import colors from '../config/colors';
import { useTranslation } from 'react-i18next';

const Campaigns = ({ route }) => {
  const { t } = useTranslation();
  /**
   * Kampanyaları gösterir.
   */

  const starIcon = {
    type: 'materialCommunity',
    name: 'star-circle-outline',
    color: colors.star,
    size: 22,
  };

  const renderCampaignItem = ({ item, index }) => {
    /**
     * Kampanya itemlerini gösterir.
     */
    return (
      <Block marginBottom>
        <Block row>
          <Icon {...starIcon} style={styles.starIcon} />
          <Text style={styles.campaignText} marginBottom>
            {item}
          </Text>
        </Block>
        <Separator backgroundColor={colors.lightGray} marginBottom />
      </Block>
    );
  };

  const renderCampaign = () => {
    /**
     * Kampanya listesini gösterir.
     */
    return (
      <FlatList
        data={route.params.list}
        renderItem={({ item, index }) => {
          return renderCampaignItem({ item, index });
        }}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <Block padding={10} white>
      <Text marginBottom bold size={20}>
        {t('campaigns')}
      </Text>
      {renderCampaign()}
    </Block>
  );
};

export default Campaigns;

const styles = StyleSheet.create({
  starIcon: {
    marginRight: 5,
  },
  campaignText: {
    flex: 1,
  },
});
