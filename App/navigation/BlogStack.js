import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import HotelSearchScreen from '../screens/HotelScreen/HotelSearchScreen';
import BackIcon from '../components/BackIcon';
import AppStyles from '../config/AppStyles';

import BlogListScreen from '../screens/BlogScreens/BlogListScreen';
import BlogDetailsScreen from '../screens/BlogScreens/BlogDetailsScreen';
import About from '../screens/About';
import Reviews from '../screens/Reviews';

const Stack = createStackNavigator();

export const BlogStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.BLOG_LIST_SCREEN}
        component={BlogListScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.BLOG_DETAILS_SCREEN}
        component={BlogDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.ABOUT}
        component={About}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen name={routes.REVIEWS} component={Reviews} />
    </Stack.Navigator>
  );
};
