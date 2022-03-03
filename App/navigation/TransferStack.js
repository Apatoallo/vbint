import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import BackIcon from '../components/BackIcon';
import AppStyles from '../config/AppStyles';
import RestaurantListMapScreen from '../screens/RestaurantScreens/RestaurantListMapScreen';
import TransferListingScreen from '../screens/TransferScreens/TransferListingScreen';
import TransferDetailsScreen from '../screens/TransferScreens/TransferDetailsScreen';
import TransferRezScreen from '../screens/TransferScreens/TransferRezScreen';
import TransferFiltersScreen from '../screens/TransferScreens/TransferFiltersScreen';

const Stack = createStackNavigator();

export const TransferStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.TRANSFER_LISTING_SCREEN}
        component={TransferListingScreen}
        options={{
          headerTitle: '',

          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.TRANSFER_REZ_SCREEN}
        component={TransferRezScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.TRANSFER_FILTERS_SCREEN}
        component={TransferFiltersScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />

      <Stack.Screen
        name={routes.TRANSFER_DETAILS_SCREEN}
        component={TransferDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
