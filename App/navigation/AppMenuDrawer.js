import React, { useEffect, useContext, useMemo } from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Alert } from 'react-native';
import Block from '../components/AppTheme/Block';
import { ScrollView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { Icon, IconTypes } from '../components/AppTheme/Icon';
import Separator from '../components/Separator';
import colors from '../config/colors';
import { AppBottomTabsScreen } from './AppBottomTabs';
import routes from './routes';
import storage from '../auth/storage';
import { StackActions } from '@react-navigation/native';
import { useAuthReducer } from '../reducers/authReducer';
import { useNavigation } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';

const DrawerContext = React.createContext();

export const DrawerStyle = (props) => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 20],
    outputRange: [0, 16],
  });
  const value = useMemo(() => {
    const animatedStyle = { borderRadius, transform: [{ scale }] };
    return { animatedStyle, setProgress };
  }, [borderRadius, scale]);
  return (
    <DrawerContext.Provider value={value}>
      {props.children}
    </DrawerContext.Provider>
  );
};
export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error(
      'Toggle compound components cannot be rendered outside the Toggle component',
    );
  }
  return context;
};

const Stack = createStackNavigator();
const DrawerBody = ({ navigation }) => {
  const { animatedStyle } = useDrawerContext();
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, animatedStyle])}>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
        }}
        headerMode="none">
        <Stack.Screen name="Tabs" component={AppBottomTabsScreen} />
      </Stack.Navigator>
    </Animated.View>
  );
};

const DrawerNavContent = (props) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { setProgress } = useDrawerContext();
  const {
    loginStatus,
    doLogout,
    userIsBusiness,
    userIsVisitor,
    setLogin,
    userType,
  } = useAuthReducer();

  const iconSize = 20;

  useEffect(() => {
    setProgress(props.progress);
  }, [props.progress, setProgress]);

  const doUserLogout = async () => {
    storage.removeToken();
    storage.removeUser();
    doLogout();
    props.navigation.dispatch(StackActions.replace(routes.SPLASH_SCREEN));
  };

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={styles.contentContainerStyle}>
      <Block>
        <Block flex={0.17} margin={[10, 10, 0, 0]} bottom>
          {/*    <Image
            source={require('../assets/header-logo.png')}
            style={styles.avatar}
          /> */}
        </Block>
        <Block>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <DrawerItem
              icon={() => (
                <Icon
                  type={IconTypes.material}
                  name="notifications-none"
                  color="white"
                  size={iconSize}
                />
              )}
              label={t('notifications_min')}
              labelStyle={styles.drawerLabel}
              style={styles.drawerItem}
              onPress={() => {
                props.navigation.navigate(routes.NOTIFICATION_SCREEN);
              }}
            />
            <DrawerItem
              icon={() => (
                <Icon
                  type={IconTypes.entypo}
                  name="ticket"
                  color="white"
                  size={iconSize}
                />
              )}
              label={t('tickets')}
              labelStyle={styles.drawerLabel}
              style={styles.drawerItem}
              onPress={() => {
                props.navigation.navigate(routes.MY_TICKET_SCREEN);
              }}
            />
            <DrawerItem
              icon={() => (
                <Icon
                  type={IconTypes.feather}
                  name="calendar"
                  color="white"
                  size={iconSize}
                />
              )}
              label={t('calendar')}
              labelStyle={styles.drawerLabel}
              style={styles.drawerItem}
              onPress={() => {
                props.navigation.navigate(routes.MY_CALENDER_STACK);
              }}
            />
            <DrawerItem
              icon={() => (
                <Icon
                  type={IconTypes.material}
                  name="card-travel"
                  color="white"
                  size={iconSize}
                />
              )}
              label={t('travel_plan_min')}
              labelStyle={styles.drawerLabel}
              style={styles.drawerItem}
              onPress={() => {
                props.navigation.navigate(routes.MY_PLAN_STACK);
              }}
            />

            <DrawerItem
              icon={() => (
                <Icon
                  type={IconTypes.antdesign}
                  name="hearto"
                  color="white"
                  size={iconSize}
                />
              )}
              label={t('favorites')}
              labelStyle={styles.drawerLabel}
              style={styles.drawerItem}
              onPress={() => {
                props.navigation.navigate(routes.FAVORITE_STACK);
              }}
            />

            <DrawerItem
              icon={() => (
                <Icon
                  type={IconTypes.octicon}
                  name="comment"
                  color="white"
                  size={iconSize}
                />
              )}
              label={t('comments')}
              labelStyle={styles.drawerLabel}
              style={styles.drawerItem}
              onPress={() => {
                navigation.navigate(routes.COMMENT_STACK);
              }}
            />

            <DrawerItem
              icon={() => (
                <Icon
                  type={IconTypes.materialCommunity}
                  name="square-edit-outline"
                  color="white"
                  size={iconSize}
                />
              )}
              label={t('memory_book_min')}
              labelStyle={styles.drawerLabel}
              style={styles.drawerItem}
              onPress={() => {
                props.navigation.navigate(routes.MY_NOTEBOOK_STACK);
              }}
            />

            <DrawerItem
              icon={() => (
                <Icon
                  type={IconTypes.antdesign}
                  name="staro"
                  color="white"
                  size={iconSize}
                />
              )}
              label={t('rewarded_campaigns')}
              labelStyle={styles.drawerLabel}
              style={styles.drawerItem}
              onPress={() => {
                props.navigation.navigate(routes.OPPORTUNITIES_STACk);
              }}
            />
            <Block margin marginLeft={16} marginRight={32}>
              <Separator />
            </Block>
            <DrawerItem
              icon={() => (
                <Icon
                  type={IconTypes.antdesign}
                  name="setting"
                  color="white"
                  size={iconSize}
                />
              )}
              label={t('settings')}
              labelStyle={styles.drawerLabel}
              style={styles.drawerItem}
              onPress={() => {
                props.navigation.navigate(routes.SETTINGS_STACK);
              }}
            />
            <Block margin marginLeft={16} marginRight={32}>
              <Separator />
            </Block>
            {loginStatus && !userIsVisitor && (
              <DrawerItem
                label={t('exit')}
                labelStyle={styles.drawerLabel2}
                style={styles.drawerItem}
                onPress={() => {
                  t('exit'),
                    Alert.alert(
                      t('exit'),
                      t('are_you_sure_drawer'),
                      [
                        {
                          text: t('no'),
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: t('yes_min'),
                          onPress: () => {
                            doUserLogout();
                          },
                        },
                      ],
                      { cancelable: false },
                    );
                }}
              />
            )}
          </ScrollView>
        </Block>
      </Block>
    </DrawerContentScrollView>
  );
};

const AppMenuDrawer = createDrawerNavigator();
const getUserType = () => {
  const { userType } = useAuthReducer();
  return userType === 'user' ? true : false;
};
export const AppMenuDrawerScreen = () => (
  <Block color={colors.primary}>
    <DrawerStyle>
      <AppMenuDrawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={styles.drawerStyles}
        contentContainerStyle={styles.contentContainerStyle}
        drawerContentOptions={{
          activeBackgroundColor: 'transparent',
          activeTintColorscene: 'white',
          inactiveTintColor: 'white',
        }}
        sceneContainerStyle={styles.sceneContainerStyle}
        drawerContent={(props) => <DrawerNavContent {...props} />}>
        <AppMenuDrawer.Screen
          name="Screens"
          options={{
            swipeEnabled: getUserType(),
          }}>
          {(props) => (
            <Block>
              <DrawerBody {...props} />
            </Block>
          )}
        </AppMenuDrawer.Screen>
      </AppMenuDrawer.Navigator>
    </DrawerStyle>
  </Block>
);

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
  },
  drawerItem: {
    marginTop: 0,
    marginBottom: 0,
  },
  drawerStyles: { flex: 1, width: '60%', backgroundColor: 'transparent' },
  drawerLabel: {
    color: 'white',
    fontSize: 16,
    marginLeft: -20,
    fontFamily: 'Montserrat-Regular',
  },
  drawerLabel2: { color: 'white', fontSize: 16 },
  avatar: {},
  iconRight: {
    paddingRight: 10,
  },
  contentContainerStyle: { flex: 1 },
  sceneContainerStyle: { backgroundColor: 'transparent' },
  test: { backgroundColor: 'black', padding: 12 },
});
