import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import HotelSearchScreen from '../screens/HotelScreen/HotelSearchScreen';
import HotelListingScreen from '../screens/HotelScreen/HotelListingScreen';
import { Icon, IconTypes } from '../components/AppTheme/Icon';
import colors from '../config/colors';
import HomePageScreen from '../screens/HomeScreen/HomePageScreen';

const Stack = createStackNavigator();

export const HomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.HOME_SCREEN}
        component={HomePageScreen}
        options={{
          headerShown: false,

          headerStyle: {
            backgroundColor: colors.transparent,
          },
        }}
      />
    </Stack.Navigator>
  );
};
