import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';

import MyCalenderScreen from '../screens/SideMenu/MyCalenderScreen';
import AppStyles from '../config/AppStyles';
import BackIcon from '../components/BackIcon';
import MyPlanScreen from '../screens/MyPlan/MyPlanScreen';
import NotificationScreen from '../screens/SideMenu/NotificationScreen';
import OpportunitiesListScreen from '../screens/OpportunitiesScreens/OpportunitiesListScreen';
import UploadImageScreen from '../screens/OpportunitiesScreens/UploadImageScreen';

const Stack = createStackNavigator();

export const OpportunitiesStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.OPPORTUNITIES_LIST_SCREEN}
        component={OpportunitiesListScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.UPLOAD_IMAGE_SCREEN}
        component={UploadImageScreen}
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
