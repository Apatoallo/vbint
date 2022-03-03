import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Block, Text, Icon } from '../../components/AppTheme/index';
import AppButton from '../../components/AppButton';
import MessageBox from '../../components/MessageBox';
import AppTextInput from '../../components/AppTextInput';
import colors from '../../config/colors';
import { useTranslation } from 'react-i18next';

const ReservationPersonInfo = ({ route, navigation }) => {
  const { t } = useTranslation();
  /**
   * Rezervasyon için kişi bilgileri istenir.
   */
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [fullName, setFullName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [description, setDescription] = useState(null);

  const toggleSuccessMessageVisible = () => {
    /**
     * Rezervasyon başarılı mesajını gösterir.
     */
    setSuccessMessageVisible(!successMessageVisible);
  };

  const renderSuccessCircle = () => {
    /**
     * Rezervasyon başarılı ikonu gösterilir.
     */
    const checkIcon = {
      type: 'materialCommunity',
      name: 'check',
      size: 33,
      color: colors.white,
    };
    return (
      <Block
        center
        noflex
        middle
        marginBottom={20}
        style={{ alignSelf: 'center', width: 80, height: 80, borderRadius: 40 }}
        backgroundColor={colors.circleView}>
        <Icon {...checkIcon} />
      </Block>
    );
  };

  const renderSuccessMessage = () => {
    /**
     * Rezervasyon başarılı mesajı gösterilir.
     */
    const messageText = t('reservation_message');
    return (
      <MessageBox
        isVisible={successMessageVisible}
        hideModal={toggleSuccessMessageVisible}
        title={t('thanks')}
        subTitle={messageText}
        renderTop={renderSuccessCircle}
      />
    );
  };

  const renderBottom = () => {
    /**
     * Talep gönder butonu gösterilir.
     */
    return (
      <Block bottom>
        <AppButton
          title={t('send_reservation')}
          onPress={() => {
            toggleSuccessMessageVisible();
          }}
        />
      </Block>
    );
  };

  const renderInputs = () => {
    /**
     * Bilgilerin istendiği inputlar gösterilir.
     */
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppTextInput
          title={t('full_name')}
          value={fullName}
          marginBottom={15}
        />
        <AppTextInput title={t('phone')} value={phone} marginBottom={15} />
        <AppTextInput title={t('email')} value={email} marginBottom={15} />
        <AppTextInput
          title={t('description')}
          value={description}
          marginBottom={15}
          multiline={true}
        />
      </ScrollView>
    );
  };

  return (
    <Block padding={16} white>
      <Text bold title marginBottom={20}>
        {t('fill_form')}
      </Text>
      {renderInputs()}
      {renderBottom()}
      {renderSuccessMessage()}
    </Block>
  );
};

export default ReservationPersonInfo;
