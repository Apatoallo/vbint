import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import AppStyles from '../config/AppStyles';
import BackIcon from '../components/BackIcon';
import MyNotebookHomePage from '../screens/MyNotebook/MyNotebookHomePage';
import MyNotebookListingScreen from '../screens/MyNotebook/MyNotebookListingScreen';
import RestaurantDetailsScreen from '../screens/RestaurantScreens/RestaurantDetailsScreen';
import HotelDetailsScreen from '../screens/HotelScreen/HotelDetailsScreen';
import TourDetailScreen from '../screens/TourScreen/TourDetailScreen';
import YachtBoatDetailScreen from '../screens/YachtBoatScreen/YachtBoatDetailScreen';
import BlogDetailsScreen from '../screens/BlogScreens/BlogDetailsScreen';
import EventDetail from '../screens/EventScreen/EventDetail';
import PlacesDetailsScreen from '../screens/PlacesToVisit/PlacesDetailsScreen';

const Stack = createStackNavigator();

export const MyNotebookStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.MY_NOTEBOOK_HOME}
        component={MyNotebookHomePage}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.MY_NOTEBOOK_LISTING}
        component={MyNotebookListingScreen}
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
        name={routes.HOTEL_DETAILS_SCREEN}
        component={HotelDetailsScreen}
        options={{
          headerShown: false,
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
        name={routes.YACHT_BOAT_DETAIL_SCREEN}
        component={YachtBoatDetailScreen}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.PLACES_DETAILS_SCREEN}
        component={PlacesDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.BLOG_DETAILS_SCREEN}
        component={BlogDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.EVENT_DETAIL}
        component={EventDetail}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
