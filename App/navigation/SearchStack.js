import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';

import colors from '../config/colors';
import SearchScreen from '../screens/SerachPage/SearchScreen';

const Stack = createStackNavigator();

export const SearchStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.SEARCH_SCREEN}
        component={SearchScreen}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};
