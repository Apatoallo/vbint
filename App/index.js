import React from 'react';
import { StyleSheet } from 'react-native';
import store from './store';
import { Provider } from 'react-redux';
import Navigation from './navigation';
import { useTranslation } from 'react-i18next';
import i18n from './lang/i18n';
import LangContext from './lang/context';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const initI18n = i18n;

const App = () => {
  const { t, i18n } = useTranslation();

  return (
    <LangContext.Provider value={{ t, i18n }}>
      <Provider store={store}>
        <SafeAreaView style={styles.container} edges={['top']} >
          <Navigation />
        </SafeAreaView>
      </Provider>
    </LangContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
