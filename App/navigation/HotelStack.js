import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import HotelSearchScreen from '../screens/HotelScreen/HotelSearchScreen';
import HotelListingScreen from '../screens/HotelScreen/HotelListingScreen';
import { Icon, IconTypes } from '../components/AppTheme/Icon';
import HotelListMapScreen from '../screens/HotelScreen/HotelListMapScreen';
import HotelFiltersScreen from '../screens/HotelScreen/HotelFiltersScreen';
import BackIcon from '../components/BackIcon';
import AppStyles from '../config/AppStyles';
import HotelDetailsScreen from '../screens/HotelScreen/HotelDetailsScreen';
import RoomListScreen from '../screens/HotelScreen/RoomListScreen';
import ImagesListScreen from '../screens/HotelScreen/ImagesListScreen';
import HotelRezScreen from '../screens/HotelScreen/HotelRezScreen';
import HotelMultiListScreen from '../screens/HotelScreen/HotelMultiListScreen';
import HotelReservationPersonInfo from '../screens/HotelScreen/HotelReservationPersonInfo';

const Stack = createStackNavigator();

export const HotelStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.HOTEL_MULTI_LIST_SCREEN}
        component={HotelMultiListScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.HOTEL_LISTING_SCREEN}
        component={HotelListingScreen}
      />
      <Stack.Screen
        name={routes.HOTEL_LISTING_MAP_SCREEN}
        component={HotelListMapScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.HOTEL_FILTERS_SCREEN}
        component={HotelFiltersScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.HOTEL_DETAILS_SCREEN}
        component={HotelDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.HOTEL_ROOMS_LIST}
        component={RoomListScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.HOTEL_IMAGES_LIST}
        component={ImagesListScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.HOTEL_REZ_SCREEN}
        component={HotelRezScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.HOTEL_REZ_USER_INFO_SCREEN}
        component={HotelReservationPersonInfo}
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
