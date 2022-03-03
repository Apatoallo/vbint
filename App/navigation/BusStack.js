import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';

import AppStyles from '../config/AppStyles';
import BackIcon from '../components/BackIcon';
import BusTicketHomeScreen from '../screens/BusTicket/BusTicketHomeScreen';
import BusListScreen from '../screens/BusTicket/BusListScreen';
import BusRezScreen from '../screens/BusTicket/BusRezScreen';

const Stack = createStackNavigator();

export const BusStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.BUS_HOME_SCREEN}
        component={BusTicketHomeScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.BUS_LIST_SCREEN}
        component={BusListScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.BUS_REZ_SCREEN}
        component={BusRezScreen}
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
