import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme/index';
import SettingsTextInput from '../../components/settings/SettingsTextInput';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import AppButton from '../../components/AppButton';
import HeaderTitle from '../../components/HeaderTitle';
import useApi from '../../hooks/useApi';
import AppAlert from '../../utils/AppAlert';
import businessInfo from '../../api/businessInfo';
import MessagePopup from '../../components/MessagePopup';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useTranslation } from 'react-i18next';

const BusinessPhone = ({ route, navigation }) => {
  const { t } = useTranslation();
  /**
   * İşletme telefon bilgisi düzenlenir.
   */
  // useState
  const [phone, setPhone] = useState(route.params.businessPhone);
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  // useApi
  const updateBusinessInfoAPI = useApi(businessInfo.updateBusinessInfo);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: AppStyles.headerWithoutShadow,
      headerTitle: (props) => (
        <HeaderTitle title={'İŞLETME SABİT TELEFON'} {...props} />
      ),
      headerBackTitle: ' ',
      headerTitleAlign: 'center',
      headerBackImage: () => <BackIcon />,
      headerRight: () => (
        <AppButton
          paddingRight={16}
          title={'Kaydet'}
          textOnly
          textColor={colors.black}
          onPress={() => {
            updatePhone(phone);
          }}
        />
      ),
    });
  }, [navigation, phone]);

  const updatePhone = async (phone) => {
    /**
     * Telefon numarasını güncelleme işlemini gerçekleştirir.
     */
    const result = await updateBusinessInfoAPI.request({
      businessPhone: phone,
    });
    if (result.ok) {
      setMessagePopupVisible({
        isVisible: true,
        title: 'Başarılı',
        subTitle: result.data.message,
      });
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          updatePhone(phone);
        },
        okText: 'Tekrar Dene',
      });
    }
  };

  return (
    <Block padding={16} scroll white>
      <Text marginBottom={30} size={14} color={colors.hotelCardLightGrey}>
        {
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius.'
        }
      </Text>
      <SettingsTextInput
        value={phone}
        title={t('business_land_phone')}
        containerStyle={styles.inputItem}
        showEditIcon
        onChangeText={(value) => {
          setPhone(value);
        }}
        keyboardType={'phone-pad'}
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
      <LoadingIndicator visible={updateBusinessInfoAPI.loading} />
    </Block>
  );
};

export default BusinessPhone;

const styles = StyleSheet.create({
  inputItem: {
    marginBottom: 10,
  },
});
