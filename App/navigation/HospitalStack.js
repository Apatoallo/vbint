import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import { Icon, IconTypes } from '../components/AppTheme/Icon';
import BackIcon from '../components/BackIcon';
import HospitalList from '../screens/HospitalScreen/HospitalList';
import HospitalDetail from '../screens/HospitalScreen/HospitalDetail';
import colors from '../config/colors';
import AppStyles from '../config/AppStyles';
import HotelFiltersScreen from '../screens/HotelScreen/HotelFiltersScreen';
import About from '../screens/About';

const Stack = createStackNavigator();

const HospitalStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={routes.HOSPITAL_LIST} component={HospitalList} />
      <Stack.Screen
        name={routes.HOSPITAL_DETAIL}
        component={HospitalDetail}
        options={{
          headerTitle: '',
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
    </Stack.Navigator>
  );
};

export default HospitalStack;
