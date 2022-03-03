import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import HotelSearchScreen from '../screens/HotelScreen/HotelSearchScreen';
import BackIcon from '../components/BackIcon';
import AppStyles from '../config/AppStyles';

import RestaurantMultiListScreen from '../screens/RestaurantScreens/RestaurantMultiListScreen';
import RestaurantListScreen from '../screens/RestaurantScreens/RestaurantListScreen';
import RestaurantDetailsScreen from '../screens/RestaurantScreens/RestaurantDetailsScreen';
import RestaurantMenuScreen from '../screens/RestaurantScreens/RestaurantMenuScreen';
import RestaurantRezScreen from '../screens/RestaurantScreens/RestaurantRezScreen';
import RestaurantListMapScreen from '../screens/RestaurantScreens/RestaurantListMapScreen';
import ServicesAndPossibilities from '../screens/ServicesAndPossibilities';
import RestaurantFiltersScreen from '../screens/RestaurantScreens/RestaurantFiltersScreen';

const Stack = createStackNavigator();

export const RestaurantStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.RESTAURANT_MULTI_LIST_SCREEN}
        component={RestaurantMultiListScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.RESTAURANT_LIST_SCREEN}
        component={RestaurantListScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />

      <Stack.Screen
        name={routes.RESTAURANT_DETAILS_SCREEN}
        component={RestaurantDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.RESTAURANT_MENU_SCREEN}
        component={RestaurantMenuScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.RESTAURANT_REZ_SCREEN}
        component={RestaurantRezScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.RESTAURANT_MAP_LIST_SCREEN}
        component={RestaurantListMapScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.SERVICES_AND_POSSIBILITES}
        component={ServicesAndPossibilities}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.RESTAURANT_FILTERS_SCREEN}
        component={RestaurantFiltersScreen}
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
