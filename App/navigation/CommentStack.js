import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import { Icon, IconTypes } from '../components/AppTheme/Icon';
import BackIcon from '../components/BackIcon';
import colors from '../config/colors';
import AppStyles from '../config/AppStyles';
import MyComments from '../screens/CommentScreen/MyComments';
import MyCommentsDetail from '../screens/CommentScreen/MyCommentsDetail';

const Stack = createStackNavigator();

const CommentStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.MY_COMMENTS}
        component={MyComments}
        options={{
          headerTitle: '',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.MY_COMMENTS_DETAIL}
        component={MyCommentsDetail}
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

export default CommentStack;
