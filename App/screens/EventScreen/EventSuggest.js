import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Block, Text, Icon } from '../../components/AppTheme/index';
import AppButton from '../../components/AppButton';
import { IconTypes } from '../../components/AppTheme/Icon';
import AppTextInput from '../../components/AppTextInput';
import ChipGroup from '../../components/ChipGroup';
import colors from '../../config/colors';
import DateSelector from '../../components/flight/DateSelector';
import TimeSelector from '../../components/carRent/TimeSelector';
import useApi from '../../hooks/useApi';
import activities from '../../api/activities';
import LoadingIndicator from '../../components/LoadingIndicator';
import moment from 'moment';
import MessagePopup from '../../components/MessagePopup';
import { useTranslation } from 'react-i18next';

const EventSuggest = ({ route, navigation }) => {
  const { t } = useTranslation();
  const getActivityCategoriesApi = useApi(activities.getActivityCategories);
  const addActivitySuggestApi = useApi(activities.addActivitySuggest);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [note, setNote] = useState(null);
  const [categoryValue, setCategoryValue] = useState(-1);
  const [categoryData, setCategoryData] = useState([]);
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  const getCategoriesList = async (q) => {
    const result = await getActivityCategoriesApi.request(q);

    if (result.ok) {
      setCategoryData(result.data.data);
    } else {
    }
  };
  const addActivitySuggest = async () => {
    const result = await addActivitySuggestApi.request({
      startDate:
        startDate.format('YYYY-MM-DD') + ' ' + moment(startTime).format('LT'),
      finishDate:
        endDate.format('YYYY-MM-DD') + ' ' + moment(endTime).format('LT'),

      description: note,
      category: categoryData.map((item) => {
        return item.id;
      }),
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
  useEffect(() => {
    getCategoriesList();
  }, []);

  useEffect(() => {}, []);

  return (
    <Block
      padding={16}
      white
      scroll
      contentContainerStyle={styles.contentContainer}>
      <Text bold title marginBottom={25}>
        {t('suggest_event')}
      </Text>
      <DateSelector
        marginTop={16}
        title={t('start_date')}
        subTitle={t('choose_start_date')}
        onChangeDate={(item) => {
          setStartDate(item);
        }}
      />
      <TimeSelector
        marginTop={16}
        title={t('start_date')}
        subTitle={t('choose_start_date')}
        onChangeDate={(item) => {
          console.log(item);
          setStartTime(item);
        }}
      />
      <DateSelector
        marginTop={16}
        title={t('start_date')}
        subTitle={t('choose_finish_date')}
        onChangeDate={(item) => {
          setEndDate(item);
        }}
      />
      <TimeSelector
        marginTop={16}
        title={t('finish_time')}
        subTitle={t('choose_finish_time')}
        onChangeDate={(item) => {
          setEndTime(item);
        }}
      />
      <Block marginTop={16}>
        <ChipGroup
          title={t('categories:')}
          data={categoryData}
          onChange={({ data, selectedValues }) => {
            setCategoryData(data);
          }}
          selectedValue={categoryValue}
          style={styles.categoryContainer}
          titleColor={colors.hotelCardLightGrey}
        />
      </Block>
      <AppTextInput
        value={note}
        title={t('note')}
        inputStyle={styles.noteInput}
        onChangeText={(newNote) => {
          setNote(newNote);
        }}
        marginBottom={45}
        placeholder={t('add_note')}
        titleBold={true}
        titleColor={colors.hotelCardLightGrey}
      />

      <Block noflex center paddingBottom={16}>
        <AppButton
          title={t('send_suggestion')}
          onPress={() => {
            addActivitySuggest();
          }}
          style={styles.continueButton}
          marginBottom
          disabled={startTime && startDate && endDate && endTime ? false : true}
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
      <Icon
        type={IconTypes.fontAwesome5}
        name={'theater-masks'}
        style={styles.backgroundIcon}
        size={150}
        color={colors.btnBg}
      />
      <LoadingIndicator
        visible={
          getActivityCategoriesApi.loading || addActivitySuggestApi.loading
        }
      />
      <MessagePopup
        isVisible={messagePopupVisible.isVisible}
        title={messagePopupVisible.title}
        subTitle={messagePopupVisible.subTitle}
        hideModal={() => {
          setMessagePopupVisible({ isVisible: false });
          navigation.pop(2);
        }}
      />
    </Block>
  );
};

export default EventSuggest;

const styles = StyleSheet.create({
  block: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    backgroundColor: ' rgba(52, 52, 52, 0.5)',
  },
  beginTime: {},
  endTime: {
    marginBottom: 15,
  },
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
  circleContainer: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  timeItem: {
    marginBottom: 15,
  },
  categoryContainer: {
    marginBottom: 35,
  },
  noteInput: {
    borderWidth: 0,
    borderColor: colors.black,
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    borderRadius: 0,
  },
  backgroundIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    opacity: 0.1,
  },
});
