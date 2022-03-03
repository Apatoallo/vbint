import React, { useLayoutEffect, useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme/index';
import SettingsTextInput from '../../components/settings/SettingsTextInput';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import AppButton from '../../components/AppButton';
import HeaderTitle from '../../components/HeaderTitle';
import { Formik } from 'formik';
import { ChangePasswordSchema } from '../../utils/ValidationSchemas';
import profile from '../../api/profile';
import useApi from '../../hooks/useApi';
import MessagePopup from '../../components/MessagePopup';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useTranslation } from 'react-i18next';
import { useAuthReducer } from '../../reducers/authReducer';

const UserPassword = ({ route, navigation }) => {
  const { t } = useTranslation();
  /**
   * Kullanıcı şifre işlemlerini gerçekleştirir.
   */
  // redux
  const { userIsBusiness } = useAuthReducer();
  // useApi
  const changePasswordAPI = useApi(
    userIsBusiness ? profile.updateCorporationProfile : profile.updateProfile,
  );
  // useState
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  // useRef
  const submitRef = useRef(null); // header den handleSubmit e erişebilmek için eklendi.

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: AppStyles.headerWithoutShadow,
      headerTitle: (props) => <HeaderTitle title={t('password')} {...props} />,
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
            submitRef.current();
          }}
        />
      ),
    });
  }, [navigation]);

  const changePassword = async (values) => {
    /**
     * Şifre değiştirme işlemini gerçekleştirir.
     */
    const result = await changePasswordAPI.request({
      oldPassword: values.currentPassword,
      rePassword: values.rePassword,
      password: values.newPassword,
    });
    if (result.ok) {
      setMessagePopupVisible({
        isVisible: true,
        title: t('successful'),
        subTitle: result.data.message,
      });
    } else {
      const error = {
        currentPassword: [result.data.message],
        newPassword: [result.data.message],
        rePassword: [result.data.message],
      };
      return error;
    }
  };

  return (
    <Block padding={16} scroll white>
      <Text marginBottom={30} size={14} color={colors.hotelCardLightGrey}>
        {
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius.'
        }
      </Text>
      <Formik
        ref={(ref) => (submitRef.current = ref)}
        initialValues={{
          currentPassword: '',
          newPassword: '',
          rePassword: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          let errorList = await changePassword(values);
          if (errorList) {
            setErrors(errorList);
          }
        }}
        validationSchema={ChangePasswordSchema}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          handleSubmit,
        }) => {
          submitRef.current = handleSubmit;
          return (
            <>
              <SettingsTextInput
                value={values.currentPassword}
                title={t('current_password')}
                containerStyle={styles.inputItem}
                onChangeText={handleChange('currentPassword')}
                type={'password'}
                placeholder={t('enter')}
                onBlur={() => setFieldTouched('currentPassword')}
                errors={
                  touched.currentPassword && errors.currentPassword
                    ? errors?.currentPassword
                    : []
                }
              />
              <SettingsTextInput
                value={values.newPassword}
                title={t('new_password')}
                containerStyle={styles.inputItem}
                onChangeText={handleChange('newPassword')}
                type={'password'}
                placeholder={t('enter')}
                onBlur={() => setFieldTouched('newPassword')}
                errors={
                  touched.newPassword && errors.newPassword
                    ? errors?.newPassword
                    : []
                }
              />
              <SettingsTextInput
                value={values.rePassword}
                title={t('new_password_confirm')}
                ü
                containerStyle={styles.inputItem}
                onChangeText={handleChange('rePassword')}
                type={'password'}
                placeholder={t('enter')}
                onBlur={() => setFieldTouched('rePassword')}
                errors={
                  touched.rePassword && errors.rePassword
                    ? errors?.rePassword
                    : []
                }
              />
            </>
          );
        }}
      </Formik>
      <MessagePopup
        isVisible={messagePopupVisible.isVisible}
        title={messagePopupVisible.title}
        subTitle={messagePopupVisible.subTitle}
        hideModal={() => {
          setMessagePopupVisible({ isVisible: false });
          navigation.goBack();
        }}
      />
      <LoadingIndicator visible={changePasswordAPI.loading} />
    </Block>
  );
};

export default UserPassword;

const styles = StyleSheet.create({
  inputItem: {
    marginBottom: 10,
  },
});
