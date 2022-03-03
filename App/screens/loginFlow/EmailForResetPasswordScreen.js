import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import { Icon, Form, Item, Input } from 'native-base';
import AppButton from '../../components/AppButton';
import routes from '../../navigation/routes';
import ScreenWithImageBg from '../../components/homePage/ScreenWithImageBg';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

function EmailForResetPasswordScreen({ navigation }) {
  const { t } = useTranslation();
  _handleSubmit = (values) => {
    alert(JSON.stringify(values));
  };
  return (
    <ScreenWithImageBg fullPage>
      <Block>
        <Block noflex row>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Block
              noflex
              style={{
                height: 22,
                marginLeft: 20,
                marginRight: 50,
                marginTop: Platform.OS == 'ios' ? 80 : 10,
              }}>
              <Icon
                active
                type={IconTypes.fontAwesome}
                name="chevron-left"
                style={{ color: '#676767', fontSize: 20 }}
              />
            </Block>
          </TouchableOpacity>

          <Block noflex marginBottom={10} style={styles.logo}>
            <Image source={require('../../assets/images/logo.png')}></Image>
          </Block>
        </Block>
        <Block padding={10}>
          <ImageBackground
            style={{
              flex: 1,
              width: '100%',
              opacity: 0.88,
            }}
            source={require('../../assets/images/Rectangle.png')}
            imageStyle={{ borderRadius: 30 }}
            blurRadius={11}>
            <Text style={styles.text}>{t('forget_pass')}</Text>
            <ScrollView>
              <Block noflex style={styles.form}>
                <Formik
                  initialValues={{ email: '', password: '' }}
                  onSubmit={this._handleSubmit}
                  validationSchema={Yup.object().shape({
                    email: Yup.string()
                      .email(t('email_format'))
                      .required(t('email_required')),
                    password: Yup.string()
                      .min(6, t('password_min'))
                      .required(t('password_required')),
                  })}>
                  {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
                    setFieldTouched,
                  }) => (
                    <Form>
                      <Item style={{ borderColor: 'black' }}>
                        <Input
                          onChangeText={handleChange('email')}
                          value={values.email}
                          placeholder={t('email_write')}
                          onBlur={() => setFieldTouched('email')}
                          autoCapitalize="none"
                        />
                      </Item>
                      {errors.email && touched.email && (
                        <Text
                          style={{
                            color: 'red',
                            paddingHorizontal: 14,
                            fontSize: 10,
                          }}>
                          {errors.email}
                        </Text>
                      )}

                      <AppButton
                        title={t('send')}
                        marginTop={40}
                        onPress={() => {
                          navigation.navigate(routes.CODE_VERIFY_SCREEN);
                        }}
                      />
                    </Form>
                  )}
                </Formik>
              </Block>
            </ScrollView>
          </ImageBackground>
        </Block>
      </Block>
    </ScreenWithImageBg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  logo: {
    marginTop: Platform.OS == 'ios' ? 80 : 10,
    alignSelf: 'center',
  },

  text: {
    alignSelf: 'center',
    paddingTop: 15,
    fontSize: 16,
    fontWeight: '600',
  },
  form: {
    paddingHorizontal: 10,
  },
});

export default EmailForResetPasswordScreen;
