import React, { useLayoutEffect, useState, useEffect } from 'react';
import { Block, Text } from '../../components/AppTheme/index';
import SettingsTextInput from '../../components/settings/SettingsTextInput';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import AppButton from '../../components/AppButton';
import HeaderTitle from '../../components/HeaderTitle';
import { useTranslation } from 'react-i18next';
import useApi from '../../hooks/useApi';
import businessInfo from '../../api/businessInfo';
import AppAlert from '../../utils/AppAlert';
import MessagePopup from '../../components/MessagePopup';
import LoadingIndicator from '../../components/LoadingIndicator';
import AddressSelector from '../../components/settings/AddressSelector';

const BusinessAddress = ({ route, navigation }) => {
  const { t } = useTranslation();
  /**
   * İşletme adres işlemlerini gerçekleştirir.
   */
  // useState
  const [address, setAddress] = useState(route.params.address);
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  const [townData, setTownData] = useState([]);
  const [selectedTown, setSelectedTown] = useState(null);
  // useApi
  const updateBusinessInfoAPI = useApi(businessInfo.updateBusinessInfo);
  const getTownListAPI = useApi(businessInfo.getTownList);
  // variables
  const provinceData = [
    {
      title: 'Muğla',
      id: 1,
    },
  ];
  const districtData = [
    {
      title: 'Bodrum',
      id: 1,
    },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: AppStyles.headerWithoutShadow,
      headerTitle: (props) => (
        <HeaderTitle title={t('business_address')} {...props} />
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
            updateAddress({ address, selectedTown });
          }}
        />
      ),
    });
  }, [navigation, address, selectedTown]);

  useEffect(() => {
    getTownList();
  }, []);

  const getTownList = async () => {
    /**
     * Mahalle listesini getirir.
     */
    const result = await getTownListAPI.request();
    if (result.ok) {
      const townIndex = result.data.data.findIndex(
        (item, index) => item.neighborhoodId == route.params.townValue,
      );
      setSelectedTown({
        id: result.data.data[townIndex].neighborhoodId,
        title: result.data.data[townIndex].name,
      });
      setTownData(result.data.data);
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          getTownList();
        },
        okText: 'Tekrar Dene',
      });
    }
  };

  const updateAddress = async ({ address, selectedTown }) => {
    /**
     * Adres güncelleme işlemini gerçekleştirir.
     */
    const result = await updateBusinessInfoAPI.request({
      address: address,
      town: selectedTown.id,
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
          updateAddress(address);
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
      <AddressSelector
        title={t('city')}
        list={provinceData}
        onSelect={({ value }) => {}}
        zIndex={99999}
        selectedItem={provinceData[0]}
      />
      <AddressSelector
        title={t('district')}
        list={districtData}
        onSelect={({ value }) => {}}
        zIndex={99998}
        selectedItem={districtData[0]}
      />
      {townData && townData.length ? (
        <AddressSelector
          title={t('neighborhood')}
          list={townData.map((item, index) => {
            return { title: item.name, id: item.neighborhoodId };
          })}
          onSelect={(newSelectedItem) => {
            setSelectedTown(newSelectedItem);
          }}
          zIndex={99997}
          marginBottom={20}
          selectedItem={selectedTown}
          defaultValue={selectedTown ? selectedTown.value : null}
        />
      ) : null}

      <SettingsTextInput
        value={address}
        title={t('address')}
        showEditIcon
        onChangeText={(value) => {
          setAddress(value);
        }}
        placeholder={t('enter')}
        multiline={true}
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
      <LoadingIndicator
        visible={updateBusinessInfoAPI.loading || getTownListAPI.loading}
      />
    </Block>
  );
};

export default BusinessAddress;
