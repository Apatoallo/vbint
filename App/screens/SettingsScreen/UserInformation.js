import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block } from '../../components/AppTheme/index';
import SettingsTextInput from '../../components/settings/SettingsTextInput';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import AppButton from '../../components/AppButton';
import HeaderTitle from '../../components/HeaderTitle';
import useApi from '../../hooks/useApi';
import profile from '../../api/profile';
import MessagePopup from '../../components/MessagePopup';
import LoadingIndicator from '../../components/LoadingIndicator';
import AppAlert from '../../utils/AppAlert';
import { useAuthReducer } from '../../reducers/authReducer';
import { useTranslation } from 'react-i18next';

const UserInformation = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { userIsBusiness } = useAuthReducer();

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const updateProfileApi = useApi(profile.updateProfile);
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  useEffect(() => {
    const { user } = route.params;
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setFullName(user.authorName);
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: AppStyles.headerWithoutShadow,
      headerTitle: (props) => (
        <HeaderTitle title={'KULLANICI BİLGİLERİ'} {...props} />
      ),
      headerTitleAlign: 'center',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
      headerRight: () => (
        <AppButton
          paddingRight={16}
          title={'Kaydet'}
          textOnly
          textColor={colors.black}
          onPress={() => {
            updateProfile();
          }}
        />
      ),
    });
  }, [navigation, firstName, lastName, email, fullName]);

  const updateProfile = async () => {
    const result = await updateProfileApi.request({
      firstName: firstName,
      lastName: lastName,
      email: userIsBusiness ? null : email,
      authorName: fullName,
    });
    if (result.ok) {
      setMessagePopupVisible({
        isVisible: true,
        title: t('successful'),
        subTitle: result.data.message,
      });
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          navigation.goBack();
        },
      });
    }
  };

  return (
    <Block>
      <Block padding={16} scroll white>
        {userIsBusiness ? (
          <SettingsTextInput
            value={fullName}
            title={'Adınız Soyadınız'}
            containerStyle={styles.inputItem}
            showEditIcon
            onChangeText={(value) => {
              setFullName(value);
            }}
          />
        ) : (
          <Block>
            <SettingsTextInput
              value={firstName}
              title={'Adınız '}
              containerStyle={styles.inputItem}
              showEditIcon
              onChangeText={(value) => {
                setFirstName(value);
              }}
            />
            <SettingsTextInput
              value={lastName}
              title={'Soyadınız'}
              containerStyle={styles.inputItem}
              showEditIcon
              onChangeText={(value) => {
                setLastName(value);
              }}
            />
          </Block>
        )}

        <SettingsTextInput
          value={email}
          title={'E-Posta Adresiniz'}
          editable={userIsBusiness ? false : true}
          onChangeText={(value) => {
            setEmail(value);
          }}
        />
        <MessagePopup
          isVisible={messagePopupVisible.isVisible}
          title={messagePopupVisible.title}
          subTitle={messagePopupVisible.subTitle}
          hideModal={() => {
            setMessagePopupVisible({ isVisible: false });
            navigation.goBack();
          }}
        />
      </Block>
      <LoadingIndicator visible={updateProfileApi.loading} />
    </Block>
  );
};

export default UserInformation;

const styles = StyleSheet.create({
  inputItem: {
    marginBottom: 10,
  },
});
