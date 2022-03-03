import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';

import AppStyles from '../config/AppStyles';
import BackIcon from '../components/BackIcon';
import FlightHomePage from '../screens/FlightTicket/FlightHomePage';
import FlightsListScreen from '../screens/FlightTicket/FlightsListScreen';
import FlightsRezScreen from '../screens/FlightTicket/FlightsRezScreen';

const Stack = createStackNavigator();

export const FlightStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.FLIGHT_HOME_SCREEN}
        component={FlightHomePage}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.FLIGHT_LIST_SCREEN}
        component={FlightsListScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.FLIGHT_REZ_SCREEN}
        component={FlightsRezScreen}
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
