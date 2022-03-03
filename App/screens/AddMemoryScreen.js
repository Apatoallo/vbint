import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text, TextInput } from '../components/AppTheme';
import useApi from '../hooks/useApi';
import LoadingIndicator from '../components/LoadingIndicator';
import MessagePopup from '../components/MessagePopup';
import colors from '../config/colors';
import AppButton from '../components/AppButton';
import memoryBook from '../api/memoryBook';
import { useTranslation } from 'react-i18next';

const AddMemoryScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { id, moduleId } = route.params;
  const addMemoryApi = useApi(memoryBook.addMemory);
  const [text, onChangeText] = React.useState(null);

  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  const addCafeMemory = async (text) => {
    const result = await addMemoryApi.request({
      id: id,
      moduleId: moduleId,
      description: text,
    });
    if (result.ok) {
      setMessagePopupVisible({
        isVisible: true,
        title: t('successful'),
        subTitle: result.data.message,
      });
    } else {
    }
  };

  return (
    <Block white>
      <Block padding={16} flex={1} style={styles.block} white>
        <Text bold color={colors.secondary}>
          {t('add_note')}
        </Text>
        <Text marginTop={16}>{t('your_note')}</Text>
        <Block noflex marginTop={16} marginBottom={32}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            multiline={true}
          />
        </Block>

        <AppButton
          title={t('save')}
          onPress={() => {
            addCafeMemory(text);
          }}
        />
      </Block>
      <MessagePopup
        isVisible={messagePopupVisible.isVisible}
        title={messagePopupVisible.title}
        subTitle={messagePopupVisible.subTitle}
        hideModal={() => {
          setMessagePopupVisible({ isVisible: false });
          navigation.goBack();
        }}
      />
      <LoadingIndicator visible={addMemoryApi.loading} />
    </Block>
  );
};

export default AddMemoryScreen;

const styles = StyleSheet.create({
  input: {
    height: 500,
    textAlignVertical: 'top',
    padding: 16,
  },
});
