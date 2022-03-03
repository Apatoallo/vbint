import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import register from '../../api/register';
import AppButton from '../../components/AppButton';
import AppTextInput from '../../components/FloatingTextInput';
import { Block, Text, Icon } from '../../components/AppTheme';
import FullScreenImage from '../../components/login/FullScreenImage';
import useApi from '../../hooks/useApi';
import BlockWithBlur from '../../components/login/BlockWithBlur';
import { Formik } from 'formik';
import { CorporateUserSchema } from '../../utils/ValidationSchemas';
import LoginCheckbox from '../../components/login/LoginCheckbox';
import DropDownSelector from '../../components/login/DropDownSelector';
import ImagePicker from 'react-native-image-crop-picker';
import colors from '../../config/colors';
import { IconTypes } from '../../components/AppTheme/Icon';
import ImageResizer from 'react-native-image-resizer';
import MessagePopup from '../../components/MessagePopup';
import LoginSelector from '../../components/login/LoginSelector';
import ErrorListItem from '../../components/ErrorListItem';
import { useTranslation } from 'react-i18next';

const RegisterCompanyScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  const [webErrors, setErrors] = useState({});
  const [registerTypes, setRegisterTypes] = useState([]);
  const [businessTypes, setBusinessTypes] = useState([]);
  const [townsList, setTownsList] = useState([]);
  const registerTypeApi = useApi(register.getRegisterType);
  const businessTypeApi = useApi(register.getBusinessType);
  const registerNewUserApi = useApi(register.registerNewBusiness);
  const getTownsApi = useApi(register.getTowns);

  const registerNewUser = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => formData.append(key, values[key]));
    const result = await registerNewUserApi.request(formData);
    if (result.ok) {
      setMessagePopupVisible({
        isVisible: true,
        title: 'Başarılı',
        subTitle: result.data.message,
      });
    } else {
      return result.data.errorList;
    }
  };

  const getRegisterType = async () => {
    const result = await registerTypeApi.request();
    if (result.ok) {
      setRegisterTypes(
        result.data.data.map((item) => ({
          title: item.title,
          id: item.registration_type,
        })),
      );
    } else {
      setErrors(result.data.errors);
    }
  };

  const getBusinessType = async (id) => {
    const result = await businessTypeApi.request(id);
    if (result.ok) {
      setBusinessTypes(
        result.data.data.map((item) => ({
          title: item.business_type_name,
          id: item.business_type_id,
        })),
      );
    } else {
      setErrors(result.data.errors);
    }
  };
  const getTowns = async (id) => {
    const result = await getTownsApi.request();
    if (result.ok) {
      setTownsList(
        result.data.map((item) => ({
          title: item.name,
          id: item.district_id,
        })),
      );
    } else {
      setErrors(result.data.errors);
    }
  };

  const resizeImage = async (image) => {
    try {
      const { width, height, path } = image;
      //let divider = height > 500 ? 1.5 : 1;
      let newImage = await ImageResizer.createResizedImage(
        path,
        parseInt(width),
        parseInt(height),
        'JPEG',
        100, //quality
        0, //rotation
        null, //outputPath if null will save  on cache
        false,
      );
      return newImage;
    } catch (error) {
      return image;
    }
  };

  useEffect(() => {
    getRegisterType();
    getTowns();
  }, []);

  return (
    <FullScreenImage
      scroll
      isLoading={
        registerNewUserApi.loading ||
        getTownsApi.loading ||
        businessTypeApi.loading ||
        registerTypeApi.loading
      }>
      <Block flex={0} center marginTop={32}>
        <Image source={require('../../assets/images/logo.png')} />
      </Block>

      <Formik
        initialValues={{
          registration_type: '',
          business_name: '',
          author_name: '',
          author_identify_number: '',
          commercial_title: '',
          email: '',
          business_mobile: '',
          business_phone: '',
          city: 6,
          district: 60,
          town: '',
          tax_administration: '',
          tax_number: '',
          mersis_number: '',
          certificate: null,
          address: '',
          category_type_id: '',
          information_text: false,
        }}
        onSubmit={async (values, { setErrors }) => {
          let errorList = await registerNewUser(values);
          if (errorList) {
            setErrors(errorList);
          }
        }}
        validationSchema={CorporateUserSchema}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
          setFieldValue,
        }) => (
          <BlockWithBlur>
            <Text bold center margin={16} size={18}>
              {t('corporate_membership')}
            </Text>
            <Block flex={0} margin={[0, 16, 0, 16]}>
              <LoginSelector
                title={t('corporate_membership_type')}
                list={registerTypes}
                onSelect={(item) => {
                  setFieldValue('registration_type', item.id);
                  setBusinessTypes([]);
                  setFieldValue('category_type_id', '0');
                  getBusinessType(item.id);
                }}
                errors={
                  touched.registration_type && errors.registration_type
                    ? errors?.registration_type
                    : []
                }
              />
              <LoginSelector
                title={t('business_type')}
                list={businessTypes}
                onSelect={(item) => {
                  setFieldValue('category_type_id', item.id);
                }}
                marginTop={16}
                errors={
                  touched.category_type_id && errors.category_type_id
                    ? errors?.category_type_id
                    : []
                }
              />

              <AppTextInput
                title={t('business_name')}
                value={values.business_name}
                onChangeText={handleChange('business_name')}
                errors={
                  touched.business_name && errors.business_name
                    ? errors?.business_name
                    : []
                }
                onBlur={() => setFieldTouched('business_name')}
              />
              <AppTextInput
                title={t('authorized_name')}
                value={values.author_name}
                onChangeText={handleChange('author_name')}
                errors={
                  touched.author_name && errors.author_name
                    ? errors?.author_name
                    : []
                }
                onBlur={() => setFieldTouched('author_name')}
              />
              <AppTextInput
                keyboardType={'phone-pad'}
                title={t('authorized_TC')}
                value={values.author_identify_number}
                onChangeText={handleChange('author_identify_number')}
                errors={
                  touched.author_identify_number &&
                  errors.author_identify_number
                    ? errors?.author_identify_number
                    : []
                }
                onBlur={() => setFieldTouched('author_identify_number')}
                maxLength={11}
              />
              <AppTextInput
                keyboardType={'phone-pad'}
                title={t('commercial_title')}
                value={values.commercial_title}
                onChangeText={handleChange('commercial_title')}
                errors={
                  touched.commercial_title && errors.commercial_title
                    ? errors?.commercial_title
                    : []
                }
                onBlur={() => setFieldTouched('commercial_title')}
              />

              <AppTextInput
                keyboardType={'email-address'}
                title={t('email')}
                value={values.email}
                onChangeText={handleChange('email')}
                errors={touched.email && errors.email ? errors?.email : []}
                onBlur={() => setFieldTouched('email')}
              />
              <AppTextInput
                keyboardType={'phone-pad'}
                title={t('phone')}
                value={values.business_mobile}
                onChangeText={handleChange('business_mobile')}
                errors={
                  touched.business_mobile && errors.business_mobile
                    ? errors?.business_mobile
                    : []
                }
                onBlur={() => setFieldTouched('business_mobile')}
                isPhone
              />
              <AppTextInput
                keyboardType={'phone-pad'}
                title={t('business_phone')}
                value={values.business_phone}
                onChangeText={handleChange('business_phone')}
                errors={
                  touched.business_phone && errors.business_phone
                    ? errors?.business_phone
                    : []
                }
                onBlur={() => setFieldTouched('business_phone')}
                isPhone
              />
              <LoginSelector
                title={t('town')}
                marginTop={16}
                list={townsList}
                onSelect={(item) => {
                  setFieldValue('town', item.id);
                }}
                errors={touched.town && errors.town ? errors?.town : []}
              />
              <AppTextInput
                title={t('address')}
                value={values.address}
                onChangeText={handleChange('address')}
                errors={
                  touched.address && errors.address ? errors?.address : []
                }
                onBlur={() => setFieldTouched('address')}
              />
              <AppTextInput
                title={t('tax_administration')}
                value={values.tax_administration}
                onChangeText={handleChange('tax_administration')}
                errors={
                  touched.tax_administration && errors.tax_administration
                    ? errors?.tax_administration
                    : []
                }
                onBlur={() => setFieldTouched('tax_administration')}
              />
              <AppTextInput
                keyboardType={'phone-pad'}
                title={t('tax_no')}
                value={values.tax_number}
                onChangeText={handleChange('tax_number')}
                errors={
                  touched.tax_number && errors.tax_number
                    ? errors?.tax_number
                    : []
                }
                onBlur={() => setFieldTouched('tax_number')}
                maxLength={11}
              />
              <AppTextInput
                keyboardType={'phone-pad'}
                title={t('mersis')}
                value={values.mersis_number}
                onChangeText={handleChange('mersis_number')}
                errors={
                  touched.mersis_number && errors.mersis_number
                    ? errors?.mersis_number
                    : []
                }
                onBlur={() => setFieldTouched('mersis_number')}
                maxLength={16}
              />
              <TouchableOpacity
                onPress={async () => {
                  ImagePicker.openPicker({
                    mediaType: 'photo',
                    cropping: false,
                    multiple: false,
                    width: 1000,
                    height: 750,
                    maxFiles: 1,
                  }).then(async (image) => {
                    let resizedImage = await resizeImage(image);
                    setFieldValue('certificate', {
                      uri: resizedImage?.uri,
                      type: 'image/jpeg',
                      name: resizedImage?.name || 'randomImage',
                    });
                  });
                }}>
                <Block
                  marginTop={16}
                  row
                  space={'between'}
                  center
                  style={styles.addPhoto}
                  padding={[8, 8, 8, 0]}>
                  <Text marginBottom>
                    {values.certificate ? t('doc_added') : t('add_doc')}
                  </Text>
                  <Icon
                    type={IconTypes.entypo}
                    name="plus"
                    color={colors.semiBlack}
                    size={24}
                  />
                </Block>
                <ErrorListItem
                  errors={
                    touched.certificate && errors.certificate
                      ? errors?.certificate
                      : []
                  }
                />
              </TouchableOpacity>
            </Block>

            <Block margin={16} flex={0}>
              <LoginCheckbox
                title={t('pre_membership')}
                onChange={(status) => {
                  setFieldValue('information_text', status);
                }}
                errors={
                  touched.information_text && errors.information_text
                    ? errors?.information_text
                    : []
                }
              />
              <AppButton
                marginTop
                title={t('sign_up')}
                onPress={handleSubmit}
              />
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
          navigation.pop(2);
        }}
      />
    </FullScreenImage>
  );
};

export default RegisterCompanyScreen;

const styles = StyleSheet.create({
  addPhoto: {
    borderBottomColor: colors.semiBlack,
    borderBottomWidth: 1,
  },
});
