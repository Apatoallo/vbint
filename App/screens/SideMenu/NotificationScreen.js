import React, { useState, useEffect, useLayoutEffect } from 'react';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import { Block, Text } from '../../components/AppTheme';
import Separator from '../../components/Separator';
import colors from '../../config/colors';
import NotificationType2 from '../../components/notification/NotificationType2';
import notification from '../../api/notification';
import LoadingIndicator from '../../components/LoadingIndicator';
import AppAlert from '../../utils/AppAlert';
import useApi from '../../hooks/useApi';
import { useAuthReducer } from '../../reducers/authReducer';
import { useTranslation } from 'react-i18next';

const NotificationScreen = ({ navigation }) => {
  const { t } = useTranslation();
  // redux
  const { userIsBusiness } = useAuthReducer();
  // useState
  const [oldNotificationList, setOldNotificationList] = useState([]);
  const [newNotificationList, setNewNotificationList] = useState([]);
  // useApi
  const getNotificationListAPI = useApi(
    userIsBusiness
      ? notification.getCorporationNotificationList
      : notification.getNotificationList,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'center',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
      headerTitle: (props) => (
        <Text bold numberOfLines={1} size={18}>
          {t('notifications')}
        </Text>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getNotificationList();
    });

    return unsubscribe;
  }, []);

  const getNotificationList = async () => {
    /**
     * Bildirim listesini getirir.
     */
    const result = await getNotificationListAPI.request();
    if (result.ok) {
      setNewNotificationList(result.data.data.new);
      setOldNotificationList(result.data.data.old);
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          getNotificationList();
        },
        okText: t('try_again'),
      });
    }
  };

  return (
    <Block white paddingVertical={16}>
      <Block scroll>
        {newNotificationList && newNotificationList.length ? (
          <Block noflex marginBottom>
            <Text bold margin marginLeft={16}>
              {t('new')}
            </Text>
            <Block noflex>
              {newNotificationList.map((item, index) => {
                return (
                  <Block noflex paddingHorizontal={8}>
                    <NotificationType2
                      title={item.title}
                      description={item.description}
                      date={item.timeLeft}
                    />
                    <Separator
                      backgroundColor={colors.lightGray}
                      marginBottom={5}
                    />
                  </Block>
                );
              })}
            </Block>
          </Block>
        ) : null}
        {oldNotificationList && oldNotificationList.length ? (
          <Block>
            <Text bold margin marginLeft={16}>
              {t('old')}
            </Text>
            <Block noflex>
              {oldNotificationList.map((item, index) => {
                return (
                  <Block noflex paddingHorizontal={8}>
                    <NotificationType2
                      title={item.title}
                      description={item.description}
                      date={item.timeLeft}
                    />
                    <Separator
                      backgroundColor={colors.lightGray}
                      marginBottom={5}
                    />
                  </Block>
                );
              })}
            </Block>
          </Block>
        ) : null}
      </Block>
      <LoadingIndicator visible={getNotificationListAPI.loading} />
    </Block>
  );
};

export default NotificationScreen;
