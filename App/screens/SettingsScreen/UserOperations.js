import React, { useEffect, useState } from 'react';
import { Block, Text } from '../../components/AppTheme/index';
import { IconTypes } from '../../components/AppTheme/Icon';
import SettingsRowItem from '../../components/settings/SettingsRowItem';
import colors from '../../config/colors';
import routes from '../../navigation/routes';
import useApi from '../../hooks/useApi';
import profile from '../../api/profile';
import LoadingIndicator from '../../components/LoadingIndicator';

const UserOperations = ({ route, navigation }) => {
  const [userInfo, setUserInfo] = useState([]);
  const [operationData, setOperationData] = useState([]);
  const getProfileApi = useApi(profile.getProfile);

  const getProfile = async () => {
    const result = await getProfileApi.request();
    if (result.ok) {
      setUserInfo(result.data.data);
      setOperationData([
        {
          text: 'Kullanıcı Bilgileri',
          subText: 'Kullanıcı bilgilerinizi değiştirin ve/ya güncelleyin.',
          onPress: () => {
            navigation.navigate(routes.USER_INFORMATION, {
              user: result.data.data,
            });
          },
        },
        {
          text: 'Doğum Tarihi',
          subText: result.data.data.birthDay
            ? 'Doğum tarihizi değiştirin ve/ya Güncelleyin'
            : 'Doğum tarihi bilgileriniz girilmemiş duruyor. Şimdi ekleyin.',
          onPress: () => {
            navigation.navigate(routes.USER_BIRTH_DATE, {
              user: result.data.data,
            });
          },
        },
        {
          text: 'Telefon Numaranız',
          subText: 'Telefon numaranızı değiştirin ve/ya Güncelleyin',
          onPress: () => {
            navigation.navigate(routes.USER_PHONE, { user: result.data.data });
          },
        },
        {
          text: 'TC Kimlik Numaranız',
          subText: 'TC Kimlik numaranız değiştirilemez.',
          onPress: () => {
            navigation.navigate(routes.USER_IDENTITY_NO, {
              user: result.data.data,
            });
          },
        },
        {
          text: 'Adresiniz',
          subText: 'Adres bilgilerinizi değiştirin veya güncelleyin.',
          onPress: () => {
            navigation.navigate(routes.USER_ADDRESS, {
              user: result.data.data,
            });
          },
        },
        {
          text: 'Dil Ayarları',
          subText: 'Dil ayarlarınızı seçiniz, güncelleyiniz.',
          onPress: () => {
            navigation.navigate(routes.LANGUAGE);
          },
        },
      ]);
    } else {
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProfile();
    });

    return unsubscribe;
  }, []);

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
              onPress={item.onPress}
            />
          );
        })}
      </Block>
      <LoadingIndicator visible={getProfileApi.loading} />
    </Block>
  );
};

export default UserOperations;
