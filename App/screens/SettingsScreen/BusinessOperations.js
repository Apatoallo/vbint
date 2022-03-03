import React, { useEffect, useState } from 'react';
import { Block, Text } from '../../components/AppTheme/index';
import SettingsRowItem from '../../components/settings/SettingsRowItem';
import colors from '../../config/colors';
import routes from '../../navigation/routes';
import { useTranslation } from 'react-i18next';
import businessInfo from '../../api/businessInfo';
import AppAlert from '../../utils/AppAlert';
import LoadingIndicator from '../../components/LoadingIndicator';

const BusinessOperations = ({ route, navigation }) => {
  const { t } = useTranslation();
  /**
   * İşletme işlemleri gösterilir.
   */
  // useApi
  const getBusinessInfoAPI = useApi(businessInfo.getBusinessInfo);
  // useState
  const [businessData, setBusinessData] = useState({});
  // variables
  const operationData = [
    {
      text: t('business_info'),
      subText: t('business_info_update'),
      navigationName: routes.BUSINESS_INFORMATIONS,
      type: 'info',
    },
    {
      text: t('business_land_phone'),
      subText: t('land_phone_update'),
      navigationName: routes.BUSINESS_PHONE,
      type: 'phone',
    },
    {
      text: t('business_address'),
      subText: t('business_address_update'),
      navigationName: routes.BUSINESS_ADDRESS,
      type: 'address',
    },
  ];

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      getBusinessInfo();
    });
    return focusListener;
  }, []);

  const getBusinessInfo = async () => {
    /**
     * İşletme bilgilerini getirir.
     */
    const result = await getBusinessInfoAPI.request();
    if (result.ok) {
      setBusinessData(result.data.data);
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          getBusinessInfo();
        },
        okText: 'Tekrar Dene',
      });
    }
  };

  const getInfoParams = (type) => {
    if (type === 'phone') {
      return { businessPhone: businessData.businessPhone };
    } else if (type === 'address') {
      return {
        address: businessData.address,
        townValue: businessData.town,
      };
    } else if (type === 'info') {
      return {
        taxNumber: businessData.taxNumber,
        mersisNumber: businessData.mersisNumber,
        taxAdministration: businessData.taxAdministration,
        businessName: businessData.businessName,
        commercialTitle: businessData.commercialTitle,
      };
    }
  };

  return (
    <Block padding={16} scroll white>
      <Text marginBottom={20} size={14} color={colors.hotelCardLightGrey}>
        {
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius.'
        }
      </Text>
      <Block>
        {operationData.map((item, index) => {
          return (
            <SettingsRowItem
              text={item.text}
              subText={item.subText}
              marginBottom
              onPress={() => {
                navigation.navigate(
                  item.navigationName,
                  getInfoParams(item.type),
                );
              }}
            />
          );
        })}
      </Block>
      <LoadingIndicator visible={getBusinessInfoAPI.loading} />
    </Block>
  );
};

export default BusinessOperations;
