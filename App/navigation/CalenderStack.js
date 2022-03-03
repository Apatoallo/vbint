import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';

import MyCalenderScreen from '../screens/SideMenu/MyCalenderScreen';
import AppStyles from '../config/AppStyles';
import BackIcon from '../components/BackIcon';

const Stack = createStackNavigator();

export const CalenderStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.MY_CALENDER_SCREEN}
        component={MyCalenderScreen}
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
