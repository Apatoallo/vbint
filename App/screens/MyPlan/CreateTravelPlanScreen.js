import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import colors from '../../config/colors';
import ChipGroup from '../../components/ChipGroup';
import AppButton from '../../components/AppButton';
import AppTextInput from '../../components/AppTextInput';
import moment from 'moment';
import useApi from '../../hooks/useApi';
import profile from '../../api/profile';
import LoadingIndicator from '../../components/LoadingIndicator';
import DateSelector from '../../components/flight/DateSelector';
import TimeSelector from '../../components/carRent/TimeSelector';
import TodayActivityListItem from '../../components/myCalender/TodayActivityListItem';
import { TouchableHighlight } from 'react-native-gesture-handler';
import MessagePopup from '../../components/MessagePopup';
import { useTranslation } from 'react-i18next';

const CreateTravelPlanScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [note, setNote] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const getTravelPlansCategoriesApi = useApi(profile.getTravelPlansCategories);
  const getTravelPlansItemApi = useApi(profile.getTravelPlansItem);
  const addTravelPlanApi = useApi(profile.addTravelPlan);
  const [categoryData, setCategoryData] = useState([]);
  const [planItems, setPlanItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  const getPlansCategories = async () => {
    const result = await getTravelPlansCategoriesApi.request();

    if (result.ok) {
      setCategoryData(
        result.data.data.map((item) => {
          return { id: item.id, name: item.title };
        }),
      );
    } else {
    }
  };

  const addTravelPlan = async (data) => {
    const result = await addTravelPlanApi.request(data);

    if (result.ok) {
      setMessagePopupVisible({
        isVisible: true,
        title: t('successful'),
        subTitle: result.data.message,
      });
    } else {
    }
  };
  const getPlansCategoriesItems = async (id) => {
    const result = await getTravelPlansItemApi.request(id);

    if (result.ok) {
      setPlanItems(result.data.data);
      setSelectedItem(null);
    } else {
    }
  };
  useEffect(() => {
    getPlansCategories();
  }, []);
  return (
    <Block white padding={16} scroll>
      <Text bold size={20}>
        {t('create_travel_plan')}
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
        title={t('start_time')}
        subTitle={t('choose_start_time')}
        onChangeDate={(item) => {
          setStartTime(item);
        }}
      />

      <TimeSelector
        marginTop={16}
        title={t('start_time')}
        subTitle={t('start_time')}
        onChangeDate={(item) => {
          setEndTime(item);
        }}
      />
      <Block marginTop={16}>
        <ChipGroup
          title={t('categories')}
          data={categoryData}
          singleSelect
          onChange={(item) => {
            setSelectedCategory(item.id);
            getPlansCategoriesItems(item.id);
          }}
          selectedValue={selectedCategory}
          style={styles.categoryContainer}
          titleColor={colors.hotelCardLightGrey}
        />
      </Block>
      {planItems.length > 0 && (
        <Block height={300} scroll nestedScrollEnabled={true}>
          <FlatList
            data={planItems}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              if (selectedItem) {
                return selectedItem.id === item.id ? (
                  <TouchableHighlight
                    underlayColor={colors.transparent}
                    onPress={() => {
                      selectedItem
                        ? setSelectedItem(null)
                        : setSelectedItem(item);
                    }}>
                    <Block>
                      <Text size={14} color={colors.secondary}>
                        {selectedItem?.id === item?.id ? t('delete') : t('add')}
                      </Text>
                      <TodayActivityListItem item={item} />
                    </Block>
                  </TouchableHighlight>
                ) : null;
              } else
                return (
                  <TouchableHighlight
                    underlayColor={colors.transparent}
                    onPress={() => {
                      setSelectedItem(item);
                    }}>
                    <Block>
                      <Text size={14} color={colors.secondary}>
                        {selectedItem?.id === item?.id ? t('delete') : t('add')}
                      </Text>
                      <TodayActivityListItem item={item} />
                    </Block>
                  </TouchableHighlight>
                );
            }}
            keyExtractor={(item) => item.index}
          />
        </Block>
      )}

      <Block marginTop={16}>
        <AppTextInput
          value={note}
          title={t('note')}
          titleColor={colors.black}
          inputStyle={styles.noteInput}
          onChangeText={(newNote) => {
            setNote(newNote);
          }}
          marginBottom={45}
          placeholder={t('add_note')}
          titleBold={true}
        />
      </Block>
      <Block paddingBottom={24}>
        <AppButton
          title={t('create')}
          onPress={() => {
            addTravelPlan({
              id: selectedItem.id,
              moduleId: selectedCategory,
              startDate: startDate.format('YYYY-MM-DD'),
              startTime: moment(startTime).format('LT'),
              finishTime: moment(endTime).format('LT'),
              note: note,
            });
          }}
          marginBottom
          disabled={
            startTime && startDate && endTime && selectedItem && note
              ? false
              : true
          }
        />

        <Block style={styles.cancelButton}>
          <AppButton
            title={t('give_up')}
            onPress={() => {
              navigation.goBack();
            }}
            textOnly
            underlined
          />
        </Block>
      </Block>
      <LoadingIndicator
        visible={
          getTravelPlansCategoriesApi.loading ||
          getTravelPlansItemApi.loading ||
          addTravelPlanApi.loading
        }
      />
      <MessagePopup
        isVisible={messagePopupVisible.isVisible}
        title={messagePopupVisible.title}
        subTitle={messagePopupVisible.subTitle}
        hideModal={() => {
          navigation.goBack();
          setMessagePopupVisible({ isVisible: false });
        }}
      />
    </Block>
  );
};

export default CreateTravelPlanScreen;

const styles = StyleSheet.create({
  noteInput: {
    borderWidth: 0,
    borderColor: colors.black,
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    borderRadius: 0,
  },
  cancelButton: {
    alignSelf: 'center',
  },
});
