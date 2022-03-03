import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import BackIcon from '../components/BackIcon';
import UserSettingsHome from '../screens/SettingsScreen/UserSettingsHome';
import AppStyles from '../config/AppStyles';
import UserOperations from '../screens/SettingsScreen/UserOperations';
import UserPhone from '../screens/SettingsScreen/UserPhone';
import PermissionsAndPrivacy from '../screens/SettingsScreen/PermissionsAndPrivacy';
import UserInformation from '../screens/SettingsScreen/UserInformation';
import UserIdentityNo from '../screens/SettingsScreen/UserIdentityNo';
import UserPassword from '../screens/SettingsScreen/UserPassword';
import UserAddress from '../screens/SettingsScreen/UserAddress';
import UserBirthDate from '../screens/SettingsScreen/UserBirthDate';
import Notification from '../screens/SettingsScreen/Notification';
import Language from '../screens/SettingsScreen/Language';
import MembershipCancellation from '../screens/SettingsScreen/MembershipCancellation';
import HeaderTitle from '../components/HeaderTitle';
import BusinessOperations from '../screens/SettingsScreen/BusinessOperations';
import BusinessPhone from '../screens/SettingsScreen/BusinessPhone';
import BusinessAddress from '../screens/SettingsScreen/BusinessAddress';
import BusinessInformations from '../screens/SettingsScreen/BusinessInformations';

const Stack = createStackNavigator();

const SettingsStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.SETTINGS}
        component={UserSettingsHome}
        options={{
          headerTitle: (props) => <HeaderTitle title={'AYARLAR'} {...props} />,
          headerTitleAlign: 'center',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.USER_OPERATIONS}
        component={UserOperations}
        options={{
          headerTitle: (props) => (
            <HeaderTitle title={'KULLANICI İŞLEMLERİ'} {...props} />
          ),
          headerTitleAlign: 'center',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.BUSINESS_OPERATIONS}
        component={BusinessOperations}
        options={{
          headerTitle: (props) => (
            <HeaderTitle title={'İŞLETME İŞLEMLERİ'} {...props} />
          ),
          headerTitleAlign: 'center',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.PERMISSIONS_AND_PRIVACY}
        component={PermissionsAndPrivacy}
        options={{
          headerTitle: (props) => (
            <HeaderTitle title={'İZİNLER VE GİZLİLİK'} {...props} />
          ),
          headerTitleAlign: 'center',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.MEMBERSHIP_CANCELLATION}
        component={MembershipCancellation}
        options={{
          headerTitle: (props) => (
            <HeaderTitle title={'ÜYELİK İPTALİ'} {...props} />
          ),
          headerTitleAlign: 'center',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen
        name={routes.USER_INFORMATION}
        component={UserInformation}
      />
      <Stack.Screen name={routes.USER_PHONE} component={UserPhone} />
      <Stack.Screen name={routes.BUSINESS_PHONE} component={BusinessPhone} />
      <Stack.Screen
        name={routes.BUSINESS_INFORMATIONS}
        component={BusinessInformations}
      />
      <Stack.Screen name={routes.USER_PASSWORD} component={UserPassword} />
      <Stack.Screen name={routes.USER_ADDRESS} component={UserAddress} />
      <Stack.Screen
        name={routes.BUSINESS_ADDRESS}
        component={BusinessAddress}
      />
      <Stack.Screen name={routes.USER_BIRTH_DATE} component={UserBirthDate} />
      <Stack.Screen name={routes.NOTIFICATION} component={Notification} />
      <Stack.Screen
        name={routes.USER_IDENTITY_NO}
        component={UserIdentityNo}
        options={{
          headerTitle: (props) => (
            <HeaderTitle title={'TC KİMLİK NUMARANIZ'} {...props} />
          ),
          headerTitleAlign: 'center',
          headerStyle: AppStyles.headerWithoutShadow,
          headerBackTitle: ' ', // ios için
          headerBackImage: () => <BackIcon />,
        }}
      />
      <Stack.Screen name={routes.LANGUAGE} component={Language} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
