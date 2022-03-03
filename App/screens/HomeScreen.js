import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text, Button } from '../components/AppTheme/index';
import colors from '../config/colors';
import { useCounterSlice } from '../reducers/counterSliceReducer';
import { useTranslation } from 'react-i18next';
import AppButton from '../components/AppButton';

const HomeScreen = () => {
  const { count, down, up } = useCounterSlice();
  const { t, i18n } = useTranslation();
  return (
    <Block>
      <Block padding={16} margin={32} center color={colors.danger} noflex>
        <Text white> This is playground</Text>
      </Block>
      <Block padding={16} margin={32} center color={colors.gold} noflex>
        <Text white> This is Text inside Block</Text>
      </Block>
      <Block margin flex={false}>
        <Text center bold marginBottom>
          redux example
        </Text>
        <Button onPress={up}>
          <Text center white bold>
            Plus
          </Text>
        </Button>
        <Text margin center bold>
          {count}
        </Text>
        <Button onPress={down}>
          <Text center white bold>
            minus
          </Text>
        </Button>
      </Block>
      <Block>
        <Text>Dil example</Text>

        <Text>{t('hello')}</Text>
        <AppButton
          title={'Türkçe'}
          onPress={() => {
            i18n.changeLanguage('tr');
          }}
        />
        <AppButton
          title={'English'}
          onPress={() => {
            i18n.changeLanguage('en');
          }}
        />
      </Block>
    </Block>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
