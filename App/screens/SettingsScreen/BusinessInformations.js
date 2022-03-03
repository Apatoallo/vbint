import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme/index';
import SettingsTextInput from '../../components/settings/SettingsTextInput';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import AppButton from '../../components/AppButton';
import HeaderTitle from '../../components/HeaderTitle';
import SettingsInfoItem from '../../components/settings/SettingsInfoItem';
import { useTranslation } from 'react-i18next';
import useApi from '../../hooks/useApi';
import businessInfo from '../../api/businessInfo';
import AppAlert from '../../utils/AppAlert';
import LoadingIndicator from '../../components/LoadingIndicator';
import MessagePopup from '../../components/MessagePopup';

const BusinessInformations = ({ route, navigation }) => {
  const { t } = useTranslation();
  /**
   * İşletme bilgileri gösterilir.
   */
  // useState
  const [businessName, setBusinessName] = useState(route.params.businessName);
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
        <HeaderTitle title={t('business_land_phone')} {...props} />
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
            updateBusinessInfo(businessName);
          }}
        />
      ),
    });
  }, [navigation, businessName]);

  const updateBusinessInfo = async (businessName) => {
    /**
     * Bilgi güncelleme işlemini gerçekleştirir.
     */
    const result = await updateBusinessInfoAPI.request({
      businessName: businessName,
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
          updateInfo();
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
        value={businessName}
        title={t('business_name')}
        containerStyle={styles.inputItem}
        showEditIcon
        onChangeText={(value) => {
          setBusinessName(value);
        }}
      />
      <SettingsInfoItem
        title={t('commercial_title')}
        text={route.params.commercialTitle}
        marginBottom={20}
        isEdit={false}
      />
      <SettingsInfoItem
        title={t('tax_administration')}
        text={route.params.taxAdministration}
        marginBottom={20}
        isEdit={false}
      />
      <SettingsInfoItem
        title={t('tax_no')}
        text={route.params.taxNumber}
        marginBottom={20}
        isEdit={false}
      />
      <SettingsInfoItem
        title={t('mersis')}
        text={route.params.mersisNumber}
        isEdit={false}
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

export default BusinessInformations;

const styles = StyleSheet.create({
  inputItem: {
    marginBottom: 20,
  },
});
