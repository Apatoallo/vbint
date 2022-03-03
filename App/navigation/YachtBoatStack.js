import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import { Icon, IconTypes } from '../components/AppTheme/Icon';
import BackIcon from '../components/BackIcon';
import colors from '../config/colors';
import YachtBoatSearchScreen from '../screens/YachtBoatScreen/YachtBoatSearchScreen';
import YachtBoatDetailScreen from '../screens/YachtBoatScreen/YachtBoatDetailScreen';
import About from '../screens/About';
import ServicesAndPossibilities from '../screens/ServicesAndPossibilities';
import Campaigns from '../screens/Campaigns';
import FrequentlyAskedQuestions from '../screens/FrequentlyAskedQuestions';
import Reviews from '../screens/Reviews';
import TourRoute from '../screens/TourScreen/TourRoute';
import Map from '../screens/Map';
import HotelFiltersScreen from '../screens/HotelScreen/HotelFiltersScreen';
import ReservationPersonInfo from '../screens/ReservationPersonInfo';
import ReservationRequest from '../screens/YachtBoatScreen/ReservationRequest';
import AppStyles from '../config/AppStyles';
import BoatFiltersScreen from '../screens/YachtBoatScreen/BoatFiltersScreen';

const Stack = createStackNavigator();

export const YachtBoatStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.YACHT_BOAT_SEARCH_SCREEN}
        component={YachtBoatSearchScreen}
      />
      <Stack.Screen
        name={routes.ABOUT}
        component={About}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
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
        name={routes.CAMPAIGN}
        component={Campaigns}
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
        name={routes.FREQUENTLY_ASKED_QUESTIONS}
        component={FrequentlyAskedQuestions}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen name={routes.REVIEWS} component={Reviews} />
      <Stack.Screen
        name={routes.YACHT_BOAT_DETAIL_SCREEN}
        component={YachtBoatDetailScreen}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.RESERVATION_PERSON_INFO}
        component={ReservationPersonInfo}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
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
        name={routes.BOAT_FILTERS_SCREEN}
        component={BoatFiltersScreen}
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
