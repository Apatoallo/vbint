import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import HotelSearchScreen from '../screens/HotelScreen/HotelSearchScreen';
import BackIcon from '../components/BackIcon';
import AppStyles from '../config/AppStyles';

import GalleryMultiListScreen from '../screens/Gallery/GalleryMultiListScreen';
import GalleryDetailsScreen from '../screens/Gallery/GalleryDetailsScreen';

const Stack = createStackNavigator();

export const GalleryStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.GALLERY_MULTI_LIST_SCREEN}
        component={GalleryMultiListScreen}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />

      <Stack.Screen
        name={routes.GALLERY_DETAILS_SCREEN}
        component={GalleryDetailsScreen}
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
