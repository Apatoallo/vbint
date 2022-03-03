import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Block, Text } from '../components/AppTheme/index';
import Separator from '../components/Separator';
import colors from '../config/colors';
import { useTranslation } from 'react-i18next';

const Rules = () => {
  const { t } = useTranslation();
  /**
   * Kuralları gösterir.
   */
  const ruleData = [
    {
      rule: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      rule: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      rule: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      rule: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
  ];

  const renderRuleItem = ({ item, index }) => {
    /**
     * Kural itemlerini gösterir.
     */
    return (
      <Block margin={[8, 16, 16, 16]}>
        <Block row>
          <Text marginBottom gray bold>
            {index + 1 + '. '}
          </Text>
          <Text style={styles.ruleText} colors={colors.hotelCardGrey}>
            {item.rule}
          </Text>
        </Block>
      </Block>
    );
  };

  const renderRules = () => {
    /**
     * Kurallar listesini gösterir.
     */
    return (
      <FlatList
        data={ruleData}
        renderItem={({ item, index }) => {
          return renderRuleItem({ item, index });
        }}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <Separator backgroundColor={colors.lightGray} marginBottom />
        )}
      />
    );
  };

  return (
    <Block white>
      <Text margin={16} marginBottom bold size={20}>
        {t('event_rules')}
      </Text>
      {renderRules()}
    </Block>
  );
};

export default Rules;

const styles = StyleSheet.create({
  ruleText: {
    flex: 1,
  },
});
