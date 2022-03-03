import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';

import MyCalenderScreen from '../screens/SideMenu/MyCalenderScreen';
import AppStyles from '../config/AppStyles';
import BackIcon from '../components/BackIcon';
import MyPlanScreen from '../screens/MyPlan/MyPlanScreen';

const Stack = createStackNavigator();

export const MyPlanStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.MY_PLAN_SCREEN}
        component={MyPlanScreen}
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
