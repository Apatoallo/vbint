import React, { useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../components/AppTheme/index';
import Separator from '../components/Separator';
import BackIcon from '../components/BackIcon';
import AppButton from '../components/AppButton';
import colors from '../config/colors';
import IconLabel from '../components/IconLabel';
import AppStyles from '../config/AppStyles';
import routes from '../navigation/routes';
import { useTranslation } from 'react-i18next';
import { useAuthReducer } from '../reducers/authReducer';

const Reviews = ({ route, navigation }) => {
  const { t } = useTranslation();
  // redux
  const { userIsVisitor } = useAuthReducer();
  // variables
  const { id, commentsList, reviewData = [], moduleId } = route.params;

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
  }, [id, moduleId, navigation]);

  return (
    <Block padding={16} white scroll>
      <IconLabel
        icon={{
          type: 'materialCommunity',
          name: 'star',
          color: colors.star,
          size: 22,
        }}
        text={` (${commentsList.length} ${t('evaluation')})`}
        marginBottom={20}
      />
      <Block style={styles.pointContainer}>
        {reviewData.map((item, index) => {
          const pointPercentValue = 20 * parseFloat(item.rating);
          return (
            <Block row center marginBottom>
              <Text numberOfLines={1} marginRight style={styles.pointName}>
                {item.title}
              </Text>
              <Block style={styles.pointBarOut}>
                <Block
                  style={[
                    styles.pointBarIn,
                    { width: pointPercentValue + '%' },
                  ]}
                />
              </Block>
              <Text medium marginLeft>
                {item.rating}
              </Text>
            </Block>
          );
        })}
      </Block>
      {commentsList.map((item, index) => {
        return (
          <Block marginBottom={20}>
            <Text marginBottom bold>
              {item.userName}
            </Text>
            <Text style={styles.campaignText} marginBottom gray>
              {item.date}
            </Text>
            <Separator backgroundColor={colors.lightGray} marginBottom />
            <Text
              style={styles.campaignText}
              marginBottom
              color={colors.semiBlack}>
              {item.comment}
            </Text>
          </Block>
        );
      })}
    </Block>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  starIcon: {
    marginRight: 5,
  },
  campaignText: {
    flex: 1,
  },
  pointBarOut: {
    flex: 1,
    height: 7,
    borderRadius: 6,
    backgroundColor: colors.grey,
  },
  pointBarIn: {
    borderRadius: 6,
    backgroundColor: colors.star,
  },
  pointName: {
    width: 70,
  },
  pointContainer: {
    marginBottom: 20,
  },
});
