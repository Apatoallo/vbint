import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, RefreshControl, Dimensions } from 'react-native';
import { Block, Text } from '../../components/AppTheme/index';
import AppStyles from '../../config/AppStyles';
import listsItems from '../../config/ListsItems';
import HomePageNavigationItem from '../../components/homePage/HomePageNavigationItem';
import HomeBanner from '../../components/homePage/HomeBanner';
import HomePageSlider from '../../components/homePage/HomePageSlider';
import ScreenWithImageBg from '../../components/homePage/ScreenWithImageBg';
import routes from '../../navigation/routes';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import NotificationHelper from '../../utils/NotificationHelper';
import home from '../../api/home';
import useApi from '../../hooks/useApi';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import colors from '../../config/colors';
import profile from '../../api/profile';
import AppAlert from '../../utils/AppAlert';
import { useAuthReducer } from '../../reducers/authReducer';

const HomePageScreen = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const { userIsVisitor, userIsBusiness } = useAuthReducer();

  const api = useApi(home.getHomePage);
  const updateTokenApi = useApi(profile.updateToken);

  const [homeData, setHomeData] = useState(null);
  async function getHomePage() {
    let response = await api.request();
    if (response.ok) {
      setHomeData(response.data.data);
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          getHomePage();
        },
      });
    }
  }
  useEffect(() => {
    if (!api.loading) {
      getHomePage();
    }
  }, []);
  const updateToken = async (token) => {
    const result = await updateTokenApi.request({ fcmId: token });

    if (result.ok) {
    } else {
    }
  };
  useEffect(() => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN :', token);
        updateToken(token.token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        if (notification.foreground && !notification.userInteraction) {
          NotificationHelper.localPushNotification(notification);
        }
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onRegistrationError: function (err) {
        console.log(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,

      requestPermissions: true,
    });
  }, []);

  return (
    <ScreenWithImageBg
      showHeader
      openNavigation={() => {
        if (userIsVisitor) {
          navigation.navigate(routes.LOGIN_STACK, {
            screen: routes.SING_IN,
          });
        } else navigation.openDrawer();
      }}
      onPressPersonImage={() => {
        if (userIsVisitor) {
          navigation.navigate(routes.LOGIN_STACK, {
            screen: routes.SING_IN,
          });
        } else navigation.navigate(routes.SETTINGS_STACK);
      }}
      refreshControl={
        <RefreshControl
          refreshing={api.loading}
          onRefresh={(params) => {
            getHomePage();
          }}
        />
      }>
      <Block margin height={200} space={'between'} marginTop={16}>
        <Text medium size={18} white marginTop center>
          {homeData?.header?.header}
        </Text>
        <Text
          marginTop={16}
          center
          notera
          size={120}
          white
          shadow
          style={AppStyles.textShadow}>
          {homeData?.header?.subTitle}
        </Text>
      </Block>
      <Block marginTop>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={styles.navigationList}
          data={listsItems.mainPage}
          renderItem={(item) => (
            <HomePageNavigationItem
              item={item}
              onPress={() => {
                if (item.item.index === 14) {
                  if (userIsBusiness || userIsVisitor) {
                    navigation.navigate(routes.LOGIN_STACK, {
                      screen: routes.SING_IN,
                    });
                  } else {
                    navigation.navigate(item.item.navigate);
                  }
                } else {
                  navigation.navigate(item.item.navigate);
                }
              }}
            />
          )}
          keyExtractor={(item) => item.index}
        />
      </Block>
      <Block height={Dimensions.get('screen').height * 0.3} flex={0}>
        <Carousel
          layout="default"
          data={homeData?.banner}
          renderItem={({ item }) => {
            return (
              <HomeBanner
                margin={[16, 16, 0, 16]}
                image={item.imageLink}
                title={item.subTitle}
                subTitle={item.title}
                onPress={() => {
                  switch (item.destination) {
                    case 'hotels':
                      navigation.navigate(routes.HOTEL_STACK);
                      break;
                    case 'cafes':
                      navigation.navigate(routes.RESTAURANT_STACK);
                      break;
                    case 'activities':
                      navigation.navigate(routes.EVENT_STACK);
                      break;
                    case 'boats':
                      navigation.navigate(routes.YACHT_BOAT_STACK);
                      break;
                    case 'tours':
                      navigation.navigate(routes.TOUR_STACK);
                      break;
                    case 'placestovisit':
                      navigation.navigate(routes.PLACES_STACK);
                      break;
                    case 'travelplan':
                      navigation.navigate(routes.TRAVEL_PLAN_STACK);
                      break;
                  }
                }}
              />
            );
          }}
          sliderWidth={Dimensions.get('screen').width}
          itemWidth={Math.round(Dimensions.get('screen').width)}
          onSnapToItem={(index) => setIndex(index)}
          useScrollView={false}
        />
        <Pagination
          dotsLength={homeData?.banner?.length}
          activeDotIndex={index}
          dotStyle={styles.dot}
          inactiveDotStyle={styles.inactiveDot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={1}
          containerStyle={styles.paginationContainer}
        />
      </Block>

      {homeData?.list?.map((listItem, index) => {
        return (
          <HomePageSlider
            key={index}
            item={listItem}
            seeAllOnPress={() => {
              switch (listItem.destination) {
                case 'hotels':
                  navigation.navigate(routes.HOTEL_STACK);
                  break;
                case 'cafes':
                  navigation.navigate(routes.RESTAURANT_STACK);
                  break;
                case 'activities':
                  navigation.navigate(routes.EVENT_STACK);
                  break;
                case 'boats':
                  navigation.navigate(routes.YACHT_BOAT_STACK);
                  break;
                case 'tours':
                  navigation.navigate(routes.TOUR_STACK);
                  break;
                case 'placestovisit':
                  navigation.navigate(routes.PLACES_STACK);
                  break;
                case 'placestovisit':
                  navigation.navigate(routes.PLACES_STACK);
                  break;
              }
            }}
            onItemPress={(item) => {
              switch (item.destination) {
                case 'hotels':
                  navigation.navigate(routes.HOTEL_STACK, {
                    screen: routes.HOTEL_DETAILS_SCREEN,
                    params: { id: item.id },
                  });
                  break;
                case 'cafes':
                  navigation.navigate(routes.RESTAURANT_STACK, {
                    screen: routes.RESTAURANT_DETAILS_SCREEN,
                    params: { id: item.id },
                  });
                  break;
                case 'activities':
                  navigation.navigate(routes.EVENT_STACK, {
                    screen: routes.EVENT_DETAIL,
                    params: { id: item.id },
                  });
                  break;
                case 'boats':
                  navigation.navigate(routes.YACHT_BOAT_STACK, {
                    screen: routes.YACHT_BOAT_DETAIL_SCREEN,
                    params: { id: item.id },
                  });
                  break;
                case 'tours':
                  navigation.navigate(routes.TOUR_STACK, {
                    screen: routes.TOUR_DETAIL_SCREEN,
                    params: { id: item.id },
                  });
                  break;
              }
            }}
          />
        );
      })}
    </ScreenWithImageBg>
  );
};

export default HomePageScreen;

const styles = StyleSheet.create({
  navigationList: {
    paddingLeft: 8,
    paddingRight: 8,
  },

  image: {
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },

  populers: {
    fontSize: 20,
    color: '#4E4E4E',
  },
  hepsinigor: {
    padding: 4,
    marginLeft: 30,
    marginRight: 10,
    color: '#027BCB',
  },
  dot: {
    width: 12,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.white,
  },
  inactiveDot: {
    width: 10,
    backgroundColor: colors.lightGray,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
