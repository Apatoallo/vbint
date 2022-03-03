import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import { Icon, IconTypes } from '../components/AppTheme/Icon';
import BackIcon from '../components/BackIcon';
import EventList from '../screens/EventScreen/EventList';
import EventListSeeAll from '../screens/EventScreen/EventListSeeAll';
import EventListMap from '../screens/EventScreen/EventListMap';
import EventDetail from '../screens/EventScreen/EventDetail';
import EventTicket from '../screens/EventScreen/EventTicket';
import EventSuggest from '../screens/EventScreen/EventSuggest';
import About from '../screens/About';
import Rules from '../screens/Rules';
import FullScreenMap from '../screens/FullScreenMap';
import ServicesAndPossibilities from '../screens/ServicesAndPossibilities';
import Campaigns from '../screens/Campaigns';
import FrequentlyAskedQuestions from '../screens/FrequentlyAskedQuestions';
import Reviews from '../screens/Reviews';
import ReviewsWithoutPoint from '../screens/ReviewsWithoutPoint';
import colors from '../config/colors';
import AppStyles from '../config/AppStyles';
import HotelFiltersScreen from '../screens/HotelScreen/HotelFiltersScreen';
import ImagesListScreen from '../screens/HotelScreen/ImagesListScreen';
import EventRezScreen from '../screens/EventScreen/EventRezScreen';
import EventFiltersScreen from '../screens/EventScreen/EventFiltersScreen';

const Stack = createStackNavigator();

const EventStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.EVENT_LIST}
        component={EventList}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.EVENT_LIST_SEE_ALL}
        component={EventListSeeAll}
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
        name={routes.EVENT_LIST_MAP}
        component={EventListMap}
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
      <Stack.Screen
        name={routes.EVENT_TICKET}
        component={EventTicket}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.EVENT_REZ_SCREEN}
        component={EventRezScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.EVENT_SUGGEST}
        component={EventSuggest}
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
        name={routes.FREQUENTLY_ASKED_QUESTIONS}
        component={FrequentlyAskedQuestions}
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
      <Stack.Screen name={routes.REVIEWS} component={Reviews} />

      <Stack.Screen
        name={routes.FULL_SCREEN_MAP}
        component={FullScreenMap}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.REVIEWS_WITHOUT_POINT}
        component={ReviewsWithoutPoint}
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
        name={routes.EVENT_FILTERS_SCREEN}
        component={EventFiltersScreen}
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

export default EventStack;
