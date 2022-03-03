import React, { useLayoutEffect, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Block } from '../../components/AppTheme/index';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import LoadingIndicator from '../../components/LoadingIndicator';
import Separator from '../../components/Separator';
import AppSwitch from '../../components/AppSwitch';
import HeaderTitle from '../../components/HeaderTitle';
import useApi from '../../hooks/useApi';
import permissions from '../../api/permissions';
import AppAlert from '../../utils/AppAlert';
import MessagePopup from '../../components/MessagePopup';
import { useAuthReducer } from '../../reducers/authReducer';
import { useTranslation } from 'react-i18next';

const Notification = ({ route, navigation }) => {
  /**
   * Bildirim ayarlarını gerçekleştirir.
   */
  // useTranslation
  const { t } = useTranslation();
  // redux
  const { userIsBusiness } = useAuthReducer();
  // variables
  const permissionType = route.params.permissionType;
  // useState
  const [notificationData, setNotificationData] = useState(null);
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  // useApi
  const getPermissionListAPI = useApi(
    userIsBusiness
      ? permissions.getCorporationPermissionList
      : permissions.getPermissionList,
  );
  const updatePermissionAPI = useApi(
    userIsBusiness
      ? permissions.updateCorporationPermission
      : permissions.updatePermission,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: AppStyles.headerWithoutShadow,
      headerTitle: (props) => (
        <HeaderTitle title={route.params.title} {...props} />
      ),
      headerBackTitle: ' ',
      headerTitleAlign: 'center',
      headerBackImage: () => <BackIcon />,
    });
  }, [navigation]);

  useEffect(() => {
    getPermissionList();
  }, []);

  const getPermissionList = async () => {
    /**
     * İzin listesini getirir.
     */
    const result = await getPermissionListAPI.request();
    if (result.ok) {
      setNotificationData(result.data.data);
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          getPlacesList(q);
        },
        okText: 'Tekrar Dene',
      });
    }
  };

  const updatePermission = async ({ value, permissionID, index }) => {
    /**
     * İzinin değerini günceller.
     */
    const result = await updatePermissionAPI.request({
      permission: value ? false : true,
      permissionType: route.params.permissionType,
      permissionId: permissionID,
    });
    if (result.ok) {
      let newNotificationData = notificationData;
      newNotificationData[index].permissions[permissionType] =
        !newNotificationData[index].permissions[permissionType];
      setNotificationData(newNotificationData);
      setMessagePopupVisible({
        isVisible: true,
        title: t('successful'),
        subTitle: result.data.message,
      });
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          updatePermission({ value, permissionID });
        },
        okText: 'Tekrar Dene',
      });
    }
  };

  return (
    <Block padding={16} scroll white>
      {notificationData &&
        notificationData.length &&
        notificationData.map((item, index) => {
          return (
            <Block noflex style={styles.notificationItem}>
              <AppSwitch
                text={item.title}
                subText={item.description}
                value={item.permissions[permissionType]}
                onChange={() => {
                  updatePermission({
                    value: item.permissions[permissionType],
                    permissionID: item.permissionId,
                    index,
                  });
                }}
                style={styles.switchItem}
              />
              <Separator />
            </Block>
          );
        })}
      <LoadingIndicator visible={getPermissionListAPI.loading} />
      <MessagePopup
        isVisible={messagePopupVisible.isVisible}
        title={messagePopupVisible.title}
        subTitle={messagePopupVisible.subTitle}
        hideModal={() => {
          setMessagePopupVisible({ isVisible: false });
        }}
      />
    </Block>
  );
};

export default Notification;

const styles = StyleSheet.create({
  notificationItem: {
    marginBottom: 10,
  },
  switchItem: {
    marginBottom: 10,
  },
});
