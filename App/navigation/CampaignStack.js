import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import { Icon, IconTypes } from '../components/AppTheme/Icon';
import BackIcon from '../components/BackIcon';
import CampaignList from '../screens/CampaignScreen/CampaignList';
import colors from '../config/colors';
import AppStyles from '../config/AppStyles';

const Stack = createStackNavigator();

const CampaignStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={routes.CAMPAIGN_LIST} component={CampaignList} />
    </Stack.Navigator>
  );
};

export default CampaignStack;
