import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import register from '../../api/register';
import AppButton from '../../components/AppButton';
import AppTextInput from '../../components/FloatingTextInput';
import { Block, Text } from '../../components/AppTheme';
import FullScreenImage from '../../components/login/FullScreenImage';
import useApi from '../../hooks/useApi';
import BlockWithBlur from '../../components/login/BlockWithBlur';
import { Formik } from 'formik';
import { resetPasswordSchema } from '../../utils/ValidationSchemas';
import MessagePopup from '../../components/MessagePopup';
import { useTranslation } from 'react-i18next';

function ResetPasswordScreen({ navigation }) {
  const { t } = useTranslation();
  const [webErrors, setErrors] = useState({});
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  const restPasswordApi = useApi(register.resetPassword);

  const restPassword = async (values) => {
    const result = await restPasswordApi.request(values);

    if (result.ok) {
      setMessagePopupVisible({
        isVisible: true,
        title: t('successful'),
        subTitle: result.data.message,
      });
    } else {
      return result.data.error;
      //setErrors(result.data.errors);
    }
  };

  return (
    <FullScreenImage isLoading={restPasswordApi.loading}>
      <Block flex={0} center marginTop={32}>
        <Image source={require('../../assets/images/logo.png')} />
      </Block>
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={async (values, { setFieldError }) => {
          let errorList = await restPassword(values);
          setFieldError('email', errorList);
        }}
        validationSchema={resetPasswordSchema}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
          setFieldValue,
          setFieldError,
        }) => (
          <BlockWithBlur>
            <Text bold center margin={16} size={18}>
              {t('forget_pass')}
            </Text>
            <Block flex={0} margin={[0, 16, 0, 16]}>
              <AppTextInput
                keyboardType={'email-address'}
                title={t('email')}
                value={values.email}
                onChangeText={handleChange('email')}
                errors={
                  webErrors.email
                    ? webErrors.email
                    : touched.email && errors.email
                    ? errors?.email
                    : []
                }
                onBlur={() => setFieldTouched('email')}
              />
            </Block>

            <Block margin={16} flex={0}>
              <AppButton marginTop title={t('send')} onPress={handleSubmit} />
            </Block>
          </BlockWithBlur>
        )}
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
    </FullScreenImage>
  );
}

const styles = StyleSheet.create({});

export default ResetPasswordScreen;
