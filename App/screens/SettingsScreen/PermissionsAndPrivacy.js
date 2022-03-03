import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme/index';
import { IconTypes } from '../../components/AppTheme/Icon';
import SettingsRowItem from '../../components/settings/SettingsRowItem';
import colors from '../../config/colors';
import routes from '../../navigation/routes';
import { useTranslation } from 'react-i18next';

const PermissionsAndPrivacy = ({ route, navigation }) => {
  const { t } = useTranslation();
  /**
   * İzinler ve gizlilik ekranı gösterilir.
   */
  const settingsData = [
    {
      text: t('notify_in_app_low'),
      screenTitle: t('notifiy_in_app'),
      icon: {
        type: IconTypes.ionicon,
        name: 'person-outline',
      },
      value: 'notification',
    },
    {
      text: t('notify_sms_low'),
      screenTitle: t('notify_sms'),
      icon: {
        type: IconTypes.feather,
        name: 'lock',
      },
      value: 'sms',
    },
    {
      text: t('notify_email_low'),
      screenTitle: t('notify_email'),
      icon: {
        type: IconTypes.material,
        name: 'privacy-tip',
      },
      value: 'email',
    },
  ];
  return (
    <Block padding={16} scroll white>
      <Text marginBottom={20} size={14} color={colors.hotelCardLightGrey}>
        {
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius.'
        }
      </Text>
      <Block>
        {settingsData.map((item, index) => {
          return (
            <SettingsRowItem
              text={item.text}
              marginBottom
              onPress={() => {
                navigation.navigate(routes.NOTIFICATION, {
                  permissionType: item.value,
                  title: item.screenTitle,
                });
              }}
            />
          );
        })}
      </Block>
    </Block>
  );
};

export default PermissionsAndPrivacy;
