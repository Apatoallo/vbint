import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import { Icon } from 'native-base';
import ScreenWithImageBg from '../../components/homePage/ScreenWithImageBg';
import SMSVerifyCode from 'react-native-sms-verifycode';
import AppButton from '../../components/AppButton';
import routes from '../../navigation/routes';
import { useTranslation } from 'react-i18next';

function CodeVerifyScreen({ navigation }) {
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
        <Block padding={0}>
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

            <Text center style={{ paddingHorizontal: 20, paddingTop: 30 }}>
              {t('mail_code')}
            </Text>

            <SMSVerifyCode
              autoFocus={true}
              verifyCodeLength={6}
              containerPaddingVertical={10}
              containerPaddingHorizontal={50}
              codeViewBorderColor="#000000"
              focusedCodeViewBorderColor="#5191F9"
              //focusedCodeViewColor="#0000FF"
              codeViewBorderWidth={0.5}
              codeViewBorderRadius={6}
            />

            <TouchableOpacity>
              <Text
                center
                style={{ color: '#5191F9', fontSize: 12, paddingVertical: 10 }}>
                {t('code_again')} (117)
              </Text>
            </TouchableOpacity>
            <AppButton
              title={t('send')}
              margin={20}
              onPress={() => {
                navigation.navigate(routes.RESET_PASSWORD_SCREEN);
              }}
            />
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

export default CodeVerifyScreen;
