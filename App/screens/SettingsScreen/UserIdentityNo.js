import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Block, Text } from '../../components/AppTheme/index';
import SettingsTextInput from '../../components/settings/SettingsTextInput';
import colors from '../../config/colors';
import useApi from '../../hooks/useApi';
import profile from '../../api/profile';
import MessagePopup from '../../components/MessagePopup';
import LoadingIndicator from '../../components/LoadingIndicator';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import AppButton from '../../components/AppButton';
import HeaderTitle from '../../components/HeaderTitle';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import AppAlert from '../../utils/AppAlert';

const UserIdentityNo = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { user } = route.params;
  const updateProfileApi = useApi(profile.updateProfile);
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });

  const [identityNo, setIdentityNo] = useState(route.params.user.tc);

  const updateProfile = async () => {
    const result = await updateProfileApi.request({
      tc: identityNo,
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: AppStyles.headerWithoutShadow,
      headerTitle: (props) => <HeaderTitle title={t('tc')} {...props} />,
      headerBackTitle: ' ',
      headerTitleAlign: 'center',
      headerBackImage: () => <BackIcon />,
      headerRight: () => {
        return route.params.user.tc ? null : (
          <AppButton
            paddingRight={16}
            title={t('save')}
            textOnly
            textColor={colors.black}
            onPress={() => {
              updateProfile();
            }}
          />
        );
      },
    });
  }, [navigation, identityNo]);

  return (
    <Block padding={16} scroll white>
      <Text marginBottom={30} size={14} color={colors.hotelCardLightGrey}>
        {
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius.'
        }
      </Text>
      <SettingsTextInput
        value={identityNo}
        title={t('tc_low')}
        containerStyle={styles.inputItem}
        showEditIcon={route.params.user.tc ? false : true}
        onChangeText={(value) => {
          setIdentityNo(value);
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
      <LoadingIndicator visible={updateProfileApi.loading} />
    </Block>
  );
};

export default UserIdentityNo;

const styles = StyleSheet.create({
  inputItem: {
    marginBottom: 10,
  },
});
