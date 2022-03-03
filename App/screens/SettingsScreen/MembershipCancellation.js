import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme/index';
import AppButton from '../../components/AppButton';
import AppTextInput from '../../components/AppTextInput';
import SettingsCheckboxList from '../../components/settings/SettingsCheckboxList';
import colors from '../../config/colors';
import useApi from '../../hooks/useApi';
import membershipCancellation from '../../api/membershipCancellation';
import AppAlert from '../../utils/AppAlert';
import LoadingIndicator from '../../components/LoadingIndicator';
import MessagePopup from '../../components/MessagePopup';
import routes from '../../navigation/routes';
import { useTranslation } from 'react-i18next';
import { useAuthReducer } from '../../reducers/authReducer';

const MembershipCancellation = ({ route, navigation }) => {
  const { t } = useTranslation();
  /**
   * Üyelik iptal işlemi gerçekleştirilir.
   */
  // redux
  const { userIsBusiness } = useAuthReducer();
  // useState
  const [note, setNote] = useState(null);
  const [cancelReasonList, setCancelReasonList] = useState(null);
  const [selectedReason, setSelectedReason] = useState(null);
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  // useApi
  const getCancelReasonListAPI = useApi(
    userIsBusiness
      ? membershipCancellation.getCorporationCancellationReasonList
      : membershipCancellation.getCancellationReasonList,
  );
  const cancelMembershipAPI = useApi(
    userIsBusiness
      ? membershipCancellation.cancelCorporationMembership
      : membershipCancellation.cancelMembership,
  );

  useEffect(() => {
    getCancelReasonList();
  }, []);

  const getCancelReasonList = async () => {
    /**
     * İptal sebepleri listesini getirir.
     */
    const result = await getCancelReasonListAPI.request();
    if (result.ok) {
      setCancelReasonList(result.data.data);
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          getCancelReasonList();
        },
        okText: t('try_again'),
      });
    }
  };

  const cancelMembership = async () => {
    /**
     * Üyelik iptal işlemini gerçekleştirir.
     */
    const sendParams = note ? { other: note } : { id: selectedReason };
    const result = await cancelMembershipAPI.request(sendParams);
    if (result.ok) {
      setMessagePopupVisible({
        isVisible: true,
        title: t('successful'),
        subTitle: result.data.message,
      });
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          cancelMembership();
        },
        okText: t('try_again'),
      });
    }
  };

  return (
    <Block
      padding={16}
      white
      scroll
      contentContainerStyle={styles.contentContainer}>
      <Text marginBottom={25} size={14} color={colors.hotelCardLightGrey}>
        {t('reason_cancellation')}
      </Text>
      {cancelReasonList && cancelReasonList.length && (
        <SettingsCheckboxList
          itemList={cancelReasonList}
          onChange={({ selectedItem, newItemList }) => {
            setSelectedReason(selectedItem.id);
            setCancelReasonList(newItemList);
          }}
          marginBottom={16}
        />
      )}
      <AppTextInput
        value={note}
        title={t('other')}
        inputStyle={styles.noteInput}
        onChangeText={(newNote) => {
          setNote(newNote);
        }}
        placeholder={t('add_note')}
        titleBold={true}
        titleColor={colors.hotelCardLightGrey}
        marginBottom={40}
        multiline={true}
      />
      <Block flex bottom paddingBottom={16}>
        <AppButton
          title={t('cancel')}
          onPress={() => {
            cancelMembership();
          }}
          style={styles.continueButton}
          marginBottom
        />
        <Block noflex>
          <AppButton
            title={t('give_up')}
            onPress={() => {
              navigation.goBack();
            }}
            textOnly
            underlined
            style={styles.cancelButton}
          />
        </Block>
      </Block>
      <LoadingIndicator
        visible={getCancelReasonListAPI.loading || cancelMembershipAPI.loading}
      />
      <MessagePopup
        isVisible={messagePopupVisible.isVisible}
        title={messagePopupVisible.title}
        subTitle={messagePopupVisible.subTitle}
        hideModal={() => {
          setMessagePopupVisible({ isVisible: false });
          navigation.navigate(routes.LOGIN_STACK);
        }}
      />
    </Block>
  );
};

export default MembershipCancellation;

const styles = StyleSheet.create({
  continueButton: {
    width: '100%',
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: Platform.OS === 'android' ? 16 : 0,
  },
  cancelButton: {
    flex: 0,
    alignSelf: 'center',
  },
  noteInput: {
    borderWidth: 0,
    borderColor: colors.black,
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    borderRadius: 0,
  },
});
