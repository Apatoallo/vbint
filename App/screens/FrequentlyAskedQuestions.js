import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Block, Text } from '../components/AppTheme/index';
import Separator from '../components/Separator';
import colors from '../config/colors';
import { useTranslation } from 'react-i18next';

const FrequentlyAskedQuestions = ({ route }) => {
  const { t } = useTranslation();
  const renderQuestionItem = ({ item, index }) => {
    /**
     * Sık sorulan sorular itemlerini gösterir.
     */
    return (
      <Block margin={[8, 16, 8, 16]}>
        <Block row>
          <Text marginBottom gray bold>
            {index + 1 + '. '}
          </Text>
          <Text style={styles.campaignText} colors={colors.hotelCardGrey}>
            {item.question}
          </Text>
        </Block>
        <Text style={styles.campaignText} colors={colors.hotelCardGrey}>
          {item.reply}
        </Text>
      </Block>
    );
  };

  const renderQuestion = () => {
    /**
     * Sık sorulan sorular listesini gösterir.
     */
    return (
      <FlatList
        data={route.params.list}
        renderItem={({ item, index }) => {
          return renderQuestionItem({ item, index });
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
        {t('faq')}
      </Text>
      {renderQuestion()}
    </Block>
  );
};

export default FrequentlyAskedQuestions;

const styles = StyleSheet.create({
  starIcon: {
    marginRight: 5,
  },
  campaignText: {
    flex: 1,
  },
});
