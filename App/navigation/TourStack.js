import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import { Icon, IconTypes } from '../components/AppTheme/Icon';
import BackIcon from '../components/BackIcon';
import colors from '../config/colors';
import TourListScreen from '../screens/TourScreen/TourListScreen';
import TourListSeeAllScreen from '../screens/TourScreen/TourListSeeAllScreen';
import TourDetailScreen from '../screens/TourScreen/TourDetailScreen';
import About from '../screens/About';
import ServicesAndPossibilities from '../screens/ServicesAndPossibilities';
import Campaigns from '../screens/Campaigns';
import Rules from '../screens/Rules';
import FrequentlyAskedQuestions from '../screens/FrequentlyAskedQuestions';
import Reviews from '../screens/Reviews';
import TourRoute from '../screens/TourScreen/TourRoute';
import Map from '../screens/Map';
import Header from '../components/Header';
import HotelFiltersScreen from '../screens/HotelScreen/HotelFiltersScreen';
import ImagesListScreen from '../screens/HotelScreen/ImagesListScreen';
import ReservationPersonInfo from '../screens/ReservationPersonInfo';
import ReservationRequest from '../screens/TourScreen/ReservationRequest';
import AppStyles from '../config/AppStyles';
import TourFiltersScreen from '../screens/TourScreen/TourFiltersScreen';

const Stack = createStackNavigator();

export const TourStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.TOUR_LIST_SCREEN}
        component={TourListScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.TOUR_LIST_SEE_ALL_SCREEN}
        component={TourListSeeAllScreen}
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
        name={routes.TOUR_ROUTE}
        component={TourRoute}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />

      <Stack.Screen
        name={routes.TOUR_DETAIL_SCREEN}
        component={TourDetailScreen}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={routes.RESERVATION_REQUEST}
        component={ReservationRequest}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.MAP}
        component={Map}
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
        name={routes.RULES}
        component={Rules}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.TOUR_FILTERS_SCREEN}
        component={TourFiltersScreen}
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
