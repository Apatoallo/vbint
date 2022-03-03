import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';

import MyCalenderScreen from '../screens/SideMenu/MyCalenderScreen';
import AppStyles from '../config/AppStyles';
import BackIcon from '../components/BackIcon';
import MyPlanScreen from '../screens/MyPlan/MyPlanScreen';
import NotificationScreen from '../screens/SideMenu/NotificationScreen';

const Stack = createStackNavigator();

export const NotificationStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.NOTIFICATION_SCREEN}
        component={NotificationScreen}
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
