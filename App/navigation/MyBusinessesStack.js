import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import AppStyles from '../config/AppStyles';
import BackIcon from '../components/BackIcon';
// screens
import MyBusinessesScreen from '../screens/MyBusinesses/MyBusinessesScreen';

const Stack = createStackNavigator();

export const MyBusinessesStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.MY_BUSINESSES_SCREEN}
        component={MyBusinessesScreen}
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
