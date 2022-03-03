import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';

import AppStyles from '../config/AppStyles';
import BackIcon from '../components/BackIcon';
import FlightHomePage from '../screens/FlightTicket/FlightHomePage';
import FlightsListScreen from '../screens/FlightTicket/FlightsListScreen';
import FlightsRezScreen from '../screens/FlightTicket/FlightsRezScreen';
import CarRentHomeScreen from '../screens/CarRentScreens/CarRentHomeScreen';
import CarsListScreen from '../screens/CarRentScreens/CarsListScreen';
import CarDetailsScreen from '../screens/CarRentScreens/CarDetailsScreen';

const Stack = createStackNavigator();

export const CarStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.CAR_HOME_SCREEN}
        component={CarRentHomeScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.CAR_LIST_SCREEN}
        component={CarsListScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.CAR_DETAILS_SCREEN}
        component={CarDetailsScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
    </Stack.Navigator>
  );
};
