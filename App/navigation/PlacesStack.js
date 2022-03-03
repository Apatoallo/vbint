import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import BackIcon from '../components/BackIcon';
import TransferDetailsScreen from '../screens/TransferScreens/TransferDetailsScreen';
import PlacesListScreen from '../screens/PlacesToVisit/PlacesListScreen';
import PlacesDetailsScreen from '../screens/PlacesToVisit/PlacesDetailsScreen';
import AppStyles from '../config/AppStyles';

const Stack = createStackNavigator();

export const PlacesStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.PLACES_LISTING_SCREEN}
        component={PlacesListScreen}
        options={{
          headerTitle: '',

          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.PLACES_DETAILS_SCREEN}
        component={PlacesDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
