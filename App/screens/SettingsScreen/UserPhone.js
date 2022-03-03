import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme/index';
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

const UserPhone = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { userIsBusiness } = useAuthReducer();

  const updateProfileApi = useApi(profile.updateProfile);
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });

  const [phone, setPhone] = useState(null);

  const updateProfile = async () => {
    const result = await updateProfileApi.request(
      userIsBusiness
        ? {
            businessMobile: phone,
          }
        : {
            phone: phone,
          },
    );
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
  useEffect(() => {
    const { user } = route.params;
    setPhone(userIsBusiness ? user.businessMobile : user.phone);
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: AppStyles.headerWithoutShadow,
      headerTitle: (props) => (
        <HeaderTitle title={t('your_phone')} {...props} />
      ),
      headerBackTitle: ' ',
      headerTitleAlign: 'center',
      headerBackImage: () => <BackIcon />,
      headerRight: () => (
        <AppButton
          paddingRight={16}
          title={t('save')}
          textOnly
          textColor={colors.black}
          onPress={() => {
            updateProfile();
          }}
        />
      ),
    });
  }, [navigation, phone]);

  return (
    <Block padding={16} scroll white>
      <Text marginBottom={30} size={14} color={colors.hotelCardLightGrey}>
        {
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius.'
        }
      </Text>
      <SettingsTextInput
        value={phone}
        title={t('your_phone_low')}
        showEditIcon
        onChangeText={(value) => {
          setPhone(value);
        }}
        keyboardType={'phone-pad'}
        isPhone
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
      <LoadingIndicator visible={updateProfileApi.loading} />
    </Block>
  );
};

export default UserPhone;

const styles = StyleSheet.create({});
