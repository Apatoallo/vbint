import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import routes from '../../navigation/routes';
import FloatingMapBtn from '../../components/FloatingMapBtn';
import useApi from '../../hooks/useApi';
import activities from '../../api/activities';
import LoadingIndicator from '../../components/LoadingIndicator';
import IconContainer from '../../components/IconContainer';
import { IconTypes } from '../../components/AppTheme/Icon';
import colors from '../../config/colors';
import ActivityCategoryList from '../../components/event/ActivityCategoryList';
import { useAuthReducer } from '../../reducers/authReducer';

const EventList = ({ navigation }) => {
  // redux
  const { userIsVisitor } = useAuthReducer();
  // useApi
  const getActivitiesApi = useApi(activities.getActivitiesCategories);
  // useState
  const [activitiesList, setActivitiesList] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'left',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
    });
  }, [navigation]);

  const getActivitiesList = async (q) => {
    const result = await getActivitiesApi.request(q);

    if (result.ok) {
      setActivitiesList((list) => {
        return [...list, ...result.data.data];
      });
    } else {
    }
  };
  useEffect(() => {
    getActivitiesList();
  }, []);

  return (
    <Block white>
      <Block scroll contentContainerStyle={styles.contentContainer}>
        {activitiesList.map((item) => {
          if (item.list.length > 0) {
            return (
              <ActivityCategoryList
                title={item.categoryName}
                itemList={item.list}
                onSeeAllPress={() => {
                  navigation.navigate(routes.EVENT_LIST_SEE_ALL, {
                    categoryId: item.categoryId,
                  });
                }}
                onPress={(item) => {
                  navigation.navigate(routes.EVENT_DETAIL, {
                    id: item.id,
                  });
                }}
              />
            );
          }
        })}
      </Block>
      <FloatingMapBtn
        onPress={() => navigation.navigate(routes.EVENT_LIST_MAP)}
      />
      <LoadingIndicator visible={getActivitiesApi.loading} />
      <IconContainer
        size={60}
        icon={{
          type: IconTypes.fontAwesome5,
          name: 'theater-masks',
          size: 28,
          color: colors.underlinedText,
        }}
        onPress={() => {
          if (userIsVisitor) {
            navigation.navigate(routes.LOGIN_STACK, { screen: routes.SING_IN });
          } else {
            navigation.navigate(routes.EVENT_SUGGEST);
          }
        }}
        style={styles.theaterIcon}
      />
    </Block>
  );
};

export default EventList;

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 100,
  },
  theaterIcon: {
    position: 'absolute',
    bottom: 85,
    right: 25,
  },
});
