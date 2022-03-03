import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme/index';
import IconContainer from '../../components/IconContainer';
import { IconTypes } from '../../components/AppTheme/Icon';
import SettingsProfileItem from '../../components/settings/SettingsProfileItem';
import MessageBox from '../../components/MessageBox';
import routes from '../../navigation/routes';
import ListsItems from '../../config/ListsItems';
import { useAuthReducer } from '../../reducers/authReducer';
import colors from '../../config/colors';
import AppImage from '../../components/AppImage';
import ImageResizer from 'react-native-image-resizer';
import AppAlert from '../../utils/AppAlert';
import useApi from '../../hooks/useApi';
import profile from '../../api/profile';
import MessagePopup from '../../components/MessagePopup';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useTranslation } from 'react-i18next';
import storage from '../../auth/storage';
import { StackActions } from '@react-navigation/native';

const UserSettingsHome = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [cancelMembershipVisible, setCancelMembershipVisible] = useState(false);
  const { userIsBusiness, userData, setLogin, doLogout } = useAuthReducer();
  const updateImageApi = useApi(profile.updateImage);
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  const userFirstName = userIsBusiness
    ? userData.authorName
    : userData
    ? userData.firstName
    : '';

  const photoIcon = {
    type: IconTypes.simpleLineIcon,
    name: 'camera',
    size: 20,
  };
  const settingsData = !userIsBusiness
    ? ListsItems.individualProfileSettingsData
    : ListsItems.corporateProfileSettingsData;

  const cancelMessageText = t('data_deleted');

  const toggleCancelMembershipVisible = () => {
    setCancelMembershipVisible(!cancelMembershipVisible);
  };

  const onPressItem = (item) => {
    if (item.type === 'cancelMembership') {
      setCancelMembershipVisible(true);
    } else if (item.type === 'logout') {
      doUserLogout();
    } else {
      navigation.navigate(item.navigateTo);
    }
  };
  const doUserLogout = async () => {
    storage.removeToken();
    storage.removeUser();
    doLogout();
    navigation.dispatch(StackActions.replace(routes.SPLASH_SCREEN));
  };

  const resizeImage = async (image) => {
    try {
      const { width, height, path } = image;
      //let divider = height > 500 ? 1.5 : 1;
      let newImage = await ImageResizer.createResizedImage(
        path,
        parseInt(width),
        parseInt(height),
        'JPEG',
        50, //quality
        0, //rotation
        null, //outputPath if null will save  on cache
        false,
      );
      return newImage;
    } catch (error) {
      return image;
    }
  };

  const addImage = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => formData.append(key, values[key]));
    const result = await updateImageApi.request(formData);
    if (result.ok) {
      setLogin({ ...userData, image: result.data.data.image });
      setMessagePopupVisible({
        isVisible: true,
        title: t('successful'),
        subTitle: result.data.message,
      });
    } else {
      AppAlert.errorAlert({
        onOk: () => {},
      });
    }
  };

  return (
    <Block>
      <Block padding={16} white>
        <Block noflex row>
          {!userIsBusiness && (
            <Block noflex borderRadius={50}>
              <AppImage url={userData?.image} style={styles.personImage} />
              <IconContainer
                size={32}
                icon={photoIcon}
                onPress={() => {
                  navigation.navigate(routes.OPPORTUNITIES_STACk, {
                    screen: routes.UPLOAD_IMAGE_SCREEN,
                    params: {
                      onReturn: async (image) => {
                        let resizedImage = await resizeImage(image);
                        addImage({
                          image: {
                            uri: resizedImage?.uri,
                            type: 'image/jpeg',
                            name: resizedImage?.name || 'randomImage',
                          },
                        });
                      },
                    },
                  });
                }}
                style={styles.photoIcon}
              />
            </Block>
          )}
          <Block noflex>
            <Text bold title size={22} color={colors.semiBlack}>
              {t('hello')}
            </Text>
            <Text bold title marginTop={userIsBusiness ? 0 : 16}>
              {userFirstName}
            </Text>
            <Text marginTop={4} size={13} medium color={colors.semiBlack}>
              {userData?.email}
            </Text>
          </Block>
        </Block>

        <Block noflex shadow white padding={16} radius={18} marginTop={32}>
          {settingsData.map((item, index) => {
            return (
              <SettingsProfileItem
                text={t(item.text)}
                icon={item.icon}
                index={index}
                dataLength={settingsData.length}
                onPress={() => {
                  onPressItem(item);
                }}
              />
            );
          })}
        </Block>
        <MessageBox
          isVisible={cancelMembershipVisible}
          hideModal={toggleCancelMembershipVisible}
          subTitle={t('are_you_sure')}
          title={t('hello') + ' ' + userFirstName}
          text={cancelMessageText}
          buttonList={[
            {
              title: t('yes_cancel'),
              onPress: () => {
                navigation.navigate(routes.MEMBERSHIP_CANCELLATION);
              },
            },
            {
              title: t('no_give_up'),
              onPress: () => {},
            },
          ]}
        />
        <MessagePopup
          isVisible={messagePopupVisible.isVisible}
          title={messagePopupVisible.title}
          subTitle={messagePopupVisible.subTitle}
          hideModal={() => {
            setMessagePopupVisible({ isVisible: false });
          }}
        />
      </Block>
      <LoadingIndicator visible={updateImageApi.loading} />
    </Block>
  );
};

export default UserSettingsHome;

const styles = StyleSheet.create({
  personImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  photoIcon: {
    position: 'absolute',
    bottom: 0,
    right: 8,
  },
});
