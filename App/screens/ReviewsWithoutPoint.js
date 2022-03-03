import React, { useLayoutEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Block, Text } from '../components/AppTheme/index';
import Separator from '../components/Separator';
import BackIcon from '../components/BackIcon';
import AppButton from '../components/AppButton';
import colors from '../config/colors';
import AppStyles from '../config/AppStyles';
import { useTranslation } from 'react-i18next';
import { useAuthReducer } from '../reducers/authReducer';

const ReviewsWithoutPoint = ({ route, navigation }) => {
  const { t } = useTranslation();
  /**
   * Değerlendirmeleri gösterir.
   */
  // redux
  const { userIsVisitor } = useAuthReducer();
  // variables
  const reviewData = [
    {
      person: 'Sefa Tamak',
      date: '25 Nisan',
      review:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      person: 'Caner Sabitoğulları',
      date: '25 Nisan',
      review:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      person: 'Motaz Lubbad',
      date: '25 Nisan',
      review:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      person: 'Motaz Lubbad',
      date: '25 Nisan',
      review:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
  ];
  const { id, moduleId } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
      headerStyle: AppStyles.headerWithoutShadow,
      headerRight: () => (
        <AppButton
          paddingRight={16}
          title={t('comment')}
          underlined
          textOnly
          onPress={() => {
            if (userIsVisitor) {
              navigation.navigate(routes.LOGIN_STACK, {
                screen: routes.SING_IN,
              });
            } else {
              navigation.navigate(routes.ADD_COMMENT_SCREEN, {
                moduleId: moduleId,
                id: id,
              });
            }
          }}
          textColor={colors.underlinedText}
        />
      ),
    });
  }, [navigation]);

  const renderReviewItem = ({ item, index }) => {
    /**
     * Yorum itemlerini gösterir.
     */
    return (
      <Block marginBottom={20}>
        <Text marginBottom bold>
          {item.person}
        </Text>
        <Text style={styles.reviewText} marginBottom gray>
          {item.date}
        </Text>
        <Separator backgroundColor={colors.lightGray} marginBottom />
        <Text style={styles.reviewText} marginBottom color={colors.semiBlack}>
          {item.review}
        </Text>
      </Block>
    );
  };

  const renderReviewList = () => {
    /**
     * Yorumları gösterir.
     */
    return (
      <FlatList
        data={reviewData}
        renderItem={({ item, index }) => {
          return renderReviewItem({ item, index });
        }}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <Block padding={16} white>
      {renderReviewList()}
    </Block>
  );
};

export default ReviewsWithoutPoint;

const styles = StyleSheet.create({
  reviewText: {
    flex: 1,
  },
});
