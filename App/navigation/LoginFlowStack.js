import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';

import LoginHomeScreen from '../screens/loginFlow/LoginHomeScreen';
import RegisterType from '../screens/loginFlow/RegisterTypeScreen';
import RegisterScreen from '../screens/loginFlow/RegisterScreen';
import colors from '../config/colors';
import { Icon, IconTypes } from '../components/AppTheme/Icon';
import SignIn from '../screens/loginFlow/SignInScreen';
import RegisterCompanyScreen from '../screens/loginFlow/RegisterCompanyScreen';
import ResetPasswordScreen from '../screens/loginFlow/ResetPasswordScreen';
import BackIcon from '../components/BackIcon';
import AppStyles from '../config/AppStyles';
import RegisterAppleScreen from '../screens/loginFlow/RegisterAppleScreen';

const Stack = createStackNavigator();

export const LoginFlowStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.LOGIN_HOME}
        component={LoginHomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={routes.REGISTER_TYPE}
        component={RegisterType}
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.REGISTER}
        component={RegisterScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.REGISTER_APPLE_SCREEN}
        component={RegisterAppleScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.REGISTER_COMPANY}
        component={RegisterCompanyScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.SING_IN}
        component={SignIn}
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.RESET_PASSWORD_SCREEN}
        component={ResetPasswordScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
    </Stack.Navigator>
  );
};
