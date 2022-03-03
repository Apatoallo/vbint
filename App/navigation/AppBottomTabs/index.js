import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Block } from '../../components/AppTheme/index';
import { IconTypes } from '../../components/AppTheme/Icon';
import colors from '../../config/colors';
import { Dimensions, Platform } from 'react-native';
import BottomBarIcon from '../../components/homePage/BottomBarIcon';
import { HomeStack } from '../HomeStack';
import routes from '../routes';
import { MyPlanStack } from '../MyPlanStack';
import { CalenderStack } from '../CalenderStack';
import { FavoriteStack } from '../FavoriteStack';
import { useAuthReducer } from '../../reducers/authReducer';
import { NotificationStack } from '../NotificationStack';
import { MyBusinessesStack } from '../MyBusinessesStack';

const AppBottomTabs = createBottomTabNavigator();
export const AppBottomTabsScreen = ({ navigation, route }) => {
  const { userIsBusiness, userData, userIsVisitor } = useAuthReducer();

  return (
    <>
      {userIsBusiness ? (
        <AppBottomTabs.Navigator
          tabBarOptions={{
            activeTintColor: colors.white,
            inactiveTintColor: colors.secondaryInactive,
            showLabel: false,
            keyboardHidesTabBar: true,

            style: {
              margin: 16,
              backgroundColor: colors.secondary,
              borderRadius: 16,
              position: 'absolute',
              justifyContent: 'center',
              height: Dimensions.get('window').height * 0.1,
            },
          }}>
          <AppBottomTabs.Screen
            name="HomeStackScreen"
            component={HomeStack}
            options={{
              tabBarIcon: (props) => (
                <BottomBarIcon
                  props={props}
                  name={'home'}
                  type={IconTypes.antdesign}
                />
              ),
            }}
          />

          <AppBottomTabs.Screen
            name={routes.NOTIFICATION_STACk}
            component={NotificationStack}
            listeners={({ navigation2 }) => ({
              tabPress: (e) => {
                if (userIsVisitor) {
                  e.preventDefault();
                  navigation.navigate(routes.LOGIN_STACK, {
                    screen: routes.SING_IN,
                  });
                }
              },
            })}
            options={{
              tabBarIcon: (props) => (
                <BottomBarIcon
                  props={props}
                  type={IconTypes.feather}
                  name="bell"
                />
              ),
            }}
          />

          <AppBottomTabs.Screen
            name={routes.MY_BUSINESSES_STACk}
            component={MyBusinessesStack}
            listeners={({ navigation2 }) => ({
              tabPress: (e) => {
                if (userIsVisitor) {
                  e.preventDefault();
                  navigation.navigate(routes.LOGIN_STACK, {
                    screen: routes.SING_IN,
                  });
                }
              },
            })}
            options={{
              tabBarIcon: (props) => (
                <BottomBarIcon
                  props={props}
                  type={IconTypes.fontAwesome}
                  name="building-o"
                />
              ),
            }}
          />
        </AppBottomTabs.Navigator>
      ) : (
        <AppBottomTabs.Navigator
          tabBarOptions={{
            activeTintColor: colors.white,
            inactiveTintColor: colors.secondaryInactive,
            showLabel: false,
            keyboardHidesTabBar: true,
            style: {
              flex: 1,
              margin: 16,
              backgroundColor: colors.secondary,
              borderRadius: 16,
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              height: 76,
              paddingTop: Platform.OS === 'ios' ? 20 : 0,
            },
          }}>
          <AppBottomTabs.Screen
            name="HomeStackScreen"
            component={HomeStack}
            options={{
              tabBarIcon: (props) => (
                <BottomBarIcon
                  props={props}
                  name={'home'}
                  type={IconTypes.antdesign}
                />
              ),
            }}
          />
          {/*   <AppBottomTabs.Screen
          name="HomeSearch"
          component={SearchStack}
          options={{
            tabBarIcon: (props) => (
              <BottomBarIcon
                props={props}
                type={IconTypes.material}
                name="search"
              />
            ),
          }}
        /> */}
          <AppBottomTabs.Screen
            name={routes.FAVORITE_STACK}
            component={FavoriteStack}
            listeners={({ navigation2 }) => ({
              tabPress: (e) => {
                if (userIsVisitor) {
                  e.preventDefault();
                  navigation.navigate(routes.LOGIN_STACK, {
                    screen: routes.SING_IN,
                  });
                }
              },
            })}
            options={{
              tabBarIcon: (props) => (
                <BottomBarIcon
                  props={props}
                  type={IconTypes.antdesign}
                  name="hearto"
                />
              ),
            }}
          />

          <AppBottomTabs.Screen
            name={routes.MY_PLAN_STACK}
            listeners={({ navigation2 }) => ({
              tabPress: (e) => {
                if (userIsVisitor) {
                  e.preventDefault();
                  navigation.navigate(routes.LOGIN_STACK, {
                    screen: routes.SING_IN,
                  });
                }
              },
            })}
            component={MyPlanStack}
            options={{
              tabBarIcon: (props) => (
                <BottomBarIcon
                  props={props}
                  type={IconTypes.material}
                  name="card-travel"
                />
              ),
            }}
          />
          <AppBottomTabs.Screen
            name={routes.MY_CALENDER_STACK}
            listeners={({ navigation2 }) => ({
              tabPress: (e) => {
                if (userIsVisitor) {
                  e.preventDefault();
                  navigation.navigate(routes.LOGIN_STACK, {
                    screen: routes.SING_IN,
                  });
                }
              },
            })}
            component={CalenderStack}
            options={{
              tabBarIcon: (props) => (
                <BottomBarIcon
                  props={props}
                  type={IconTypes.feather}
                  name="calendar"
                />
              ),
            }}
          />
        </AppBottomTabs.Navigator>
      )}
    </>
  );
};
