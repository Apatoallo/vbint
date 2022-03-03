import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import SplashScreen from '../screens/SplashScreen';
import { AppMenuDrawerScreen } from './AppMenuDrawer';
import TutorialScreen from '../screens/loginFlow/TutorialScreen';
import { HotelStack } from './HotelStack';
import { TourStack } from './TourStack';
import { TransferStack } from './TransferStack';
import { YachtBoatStack } from './YachtBoatStack';
import EventStack from './EventStack';
import EmailForResetPasswordScreen from '../screens/loginFlow/EmailForResetPasswordScreen';
import CodeVerifyScreen from '../screens/loginFlow/CodeVerifyScreen';
import { LoginFlowStack } from './LoginFlowStack';
import SearchScreen from '../screens/SerachPage/SearchScreen';
import AppStyles from '../config/AppStyles';
import BackIcon from '../components/BackIcon';
import { RestaurantStack } from './RestaurantStack';
import { BlogStack } from './BlogStack';
import FullScreenImage from '../components/login/FullScreenImage';
import FullScreenMap from '../screens/FullScreenMap';
import WorkingTimeScreen from '../screens/WorkingTimeScreen';
import Campaigns from '../screens/Campaigns';
import FrequentlyAskedQuestions from '../screens/FrequentlyAskedQuestions';
import { PlacesStack } from './PlacesStack';
import NotificationScreen from '../screens/SideMenu/NotificationScreen';
import MyTicketScreen from '../screens/SideMenu/MyTicketScreen';
import HospitalStack from './HospitalStack';
import CampaignStack from './CampaignStack';
import { TravelPlanStack } from './TravelPlanStack';
import { MyNotebookStack } from './MyNotebookStack';
import { OpportunitiesStack } from './OpportunitiesStack';
import HotelFiltersScreen from '../screens/HotelScreen/HotelFiltersScreen';
import { FlightStack } from './FlightStack';
import { BusStack } from './BusStack';
import { CarStack } from './CarStack';
import SettingsStack from './SettingsStack';
import CommentStack from './CommentStack';
import { GalleryStack } from './GalleryStack';
import ReservationPersonInfo from '../screens/ReservationPersonInfo';
import AddMemoryScreen from '../screens/AddMemoryScreen';
import AddCommentScreen from '../screens/AddCommentScreen';
import Reviews from '../screens/Reviews';
import FiltersScreen from '../screens/FiltersScreen';
import About from '../screens/About';
import ServicesAndPossibilities from '../screens/ServicesAndPossibilities';
import FullScreenImageSlider from '../screens/FullScreenImageSlider';

const RootStackScreen = () => {
  const RootStack = createStackNavigator();

  return (
    <RootStack.Navigator
      screenOptions={{ animationEnabled: true, headerBackTitleVisible: false }}
      mode="modal">
      <RootStack.Screen
        name={routes.SPLASH_SCREEN}
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={routes.HOME_PAGE}
        component={AppMenuDrawerScreen}
        options={{
          headerShown: false,
        }}
      />

      <RootStack.Screen
        name={routes.TUTORIAL_SCREEN}
        component={TutorialScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={routes.LOGIN_STACK}
        component={LoginFlowStack}
        options={{
          headerShown: false,
        }}
      />

      <RootStack.Screen
        name={routes.HOTEL_STACK}
        component={HotelStack}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={routes.TOUR_STACK}
        component={TourStack}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={routes.YACHT_BOAT_STACK}
        component={YachtBoatStack}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={routes.EVENT_STACK}
        component={EventStack}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={routes.RESTAURANT_STACK}
        component={RestaurantStack}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={routes.TRANSFER_STACK}
        component={TransferStack}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={routes.PLACES_STACK}
        component={PlacesStack}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={routes.HOSPITAL_STACK}
        component={HospitalStack}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={routes.BLOG_STACK}
        component={BlogStack}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={routes.CAMPAIGN_STACK}
        component={CampaignStack}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={routes.SETTINGS_STACK}
        component={SettingsStack}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={routes.COMMENT_STACK}
        component={CommentStack}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={routes.SEARCH_SCREEN}
        component={SearchScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <RootStack.Screen
        name={routes.FILTER_SCREEN}
        component={FiltersScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <RootStack.Screen
        name={routes.CODE_VERIFY_SCREEN}
        component={CodeVerifyScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={routes.FULL_SCREEN_MAP}
        component={FullScreenMap}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={routes.NOTIFICATION_SCREEN}
        component={NotificationScreen}
        options={{
          headerTitleAlign: 'center',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <RootStack.Screen
        name={routes.MY_TICKET_SCREEN}
        component={MyTicketScreen}
        options={{
          headerTitleAlign: 'center',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <RootStack.Screen
        name={routes.WORKING_TIME_SCREEN}
        component={WorkingTimeScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <RootStack.Screen
        name={routes.CAMPAIGN}
        component={Campaigns}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <RootStack.Screen
        name={routes.FREQUENTLY_ASKED_QUESTIONS}
        component={FrequentlyAskedQuestions}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <RootStack.Screen
        name={routes.RESERVATION_PERSON_INFO}
        component={ReservationPersonInfo}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <RootStack.Screen
        name={routes.ADD_MEMORY_SCREEN}
        component={AddMemoryScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <RootStack.Screen name={routes.REVIEWS} component={Reviews} />

      <RootStack.Screen
        name={routes.ADD_COMMENT_SCREEN}
        component={AddCommentScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <RootStack.Screen
        name={routes.TRAVEL_PLAN_STACK}
        component={TravelPlanStack}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={routes.MY_NOTEBOOK_STACK}
        component={MyNotebookStack}
        options={{
          headerShown: false,
        }}
      />

      <RootStack.Screen
        name={routes.OPPORTUNITIES_STACk}
        component={OpportunitiesStack}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={routes.GALLERY_STACK}
        component={GalleryStack}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={routes.FLIGHT_STACK}
        component={FlightStack}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={routes.BUS_STACK}
        component={BusStack}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={routes.CAR_STACK}
        component={CarStack}
        options={{
          headerShown: false,
        }}
      />

      <RootStack.Screen
        name={routes.FILTERS_SCREEN}
        component={HotelFiltersScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />

      <RootStack.Screen
        name={routes.ABOUT}
        component={About}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />

      <RootStack.Screen
        name={routes.SERVICES_AND_POSSIBILITES}
        component={ServicesAndPossibilities}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />

      <RootStack.Screen
        name={routes.FULL_SCREEN_IMAGE_SLIDER}
        component={FullScreenImageSlider}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};
