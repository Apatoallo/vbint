import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';

import MyCalenderScreen from '../screens/SideMenu/MyCalenderScreen';
import AppStyles from '../config/AppStyles';
import BackIcon from '../components/BackIcon';
import MyPlanScreen from '../screens/MyPlan/MyPlanScreen';
import CreateTravelPlanScreen from '../screens/MyPlan/CreateTravelPlanScreen';

const Stack = createStackNavigator();

export const TravelPlanStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.CREATE_TRAVEL_PLAN_SCREEN}
        component={CreateTravelPlanScreen}
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
