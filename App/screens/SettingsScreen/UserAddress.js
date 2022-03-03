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
import { useTranslation } from 'react-i18next';

const UserAddress = ({ route, navigation }) => {
  const { t } = useTranslation();
  const updateProfileApi = useApi(profile.updateProfile);
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  const [address, setAddress] = useState(null);

  const updateProfile = async () => {
    const result = await updateProfileApi.request({
      address: address,
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
  useEffect(() => {
    const { user } = route.params;
    setAddress(user.address);
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: AppStyles.headerWithoutShadow,
      headerTitle: (props) => (
        <HeaderTitle title={t('your_address')} {...props} />
      ),
      headerTitleAlign: 'center',
      headerBackTitle: ' ',
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
  }, [navigation, address]);

  return (
    <Block padding={16} scroll white>
      <Text marginBottom={30} size={14} color={colors.hotelCardLightGrey}>
        {
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius.'
        }
      </Text>

      <SettingsTextInput
        value={address}
        title={t('address')}
        containerStyle={styles.inputItem}
        showEditIcon
        onChangeText={(value) => {
          setAddress(value);
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
      <LoadingIndicator isVisible={updateProfileApi.loading} />
    </Block>
  );
};

export default UserAddress;

const styles = StyleSheet.create({
  inputItem: {
    marginBottom: 10,
  },
});
