import React, { useState, useLayoutEffect, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import { Block, Text } from '../../components/AppTheme';
import routes from '../../navigation/routes';
import MyNotebookVerticalList from '../../components/myNotebook/MyNotebookVerticalList';
import AddNoteTextAreaPopUp from '../../components/myNotebook/AddNoteTextAreaPopUp';
import memoryBook from '../../api/memoryBook';
import AppAlert from '../../utils/AppAlert';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useTranslation } from 'react-i18next';

const MyNotebookHomePage = ({ navigation }) => {
  const { t } = useTranslation();
  // useState
  const [noteTextAreaVisible, setNoteTextAreaVisible] = useState(false);
  const [notebookList, setNotebookList] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});
  // useApi
  const getNotebookListAPI = useApi(memoryBook.getMemoryList);
  const updateNotebookListAPI = useApi(memoryBook.updateMemory);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'center',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
      headerTitle: (props) => (
        <Text bold numberOfLines={1}>
          {t('memory_book')}
        </Text>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getNoteBookList();
  }, []);

  const getNoteBookList = async () => {
    const result = await getNotebookListAPI.request();
    if (result.ok) {
      setNotebookList(result.data.data);
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          getNoteBookList();
        },
        okText: t('try_again'),
      });
    }
  };

  const updateNotebookList = async ({ itemID, moduleID, text }) => {
    const result = await updateNotebookListAPI.request({
      id: itemID,
      moduleId: moduleID,
      description: text,
    });
    if (result.ok) {
      getNoteBookList();
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          updateNotebookList({ itemID, moduleID, text });
        },
        okText: t('try_again'),
      });
    }
  };

  const getNavigationName = (moduleID) => {
    switch (moduleID) {
      case 1:
        return routes.EVENT_DETAIL;
      case 2:
        return routes.HOTEL_DETAILS_SCREEN;
      case 3:
        return routes.RESTAURANT_DETAILS_SCREEN;
      case 4:
        return routes.TOUR_DETAIL_SCREEN;
      case 5:
        return routes.YACHT_BOAT_DETAIL_SCREEN;
      case 6:
        return routes.PLACES_DETAILS_SCREEN;
      case 7:
        return routes.BLOG_DETAILS_SCREEN;
      default:
        return null;
    }
  };

  const getModuleTitle = (moduleID) => {
    switch (moduleID) {
      case 1:
        return 'Etkinlikler';
      case 2:
        return 'Oteller';
      case 3:
        return 'Yeme/İçme';
      case 4:
        return 'Gezi ve Turlar';
      case 5:
        return 'Tekne ve Yatlar';
      case 6:
        return 'Gezilecek Yerler';
      case 7:
        return 'Blog';
      default:
        return null;
    }
  };

  const onPressItem = ({ moduleID, selectedItem }) => {
    const navigationName = getNavigationName(moduleID);
    if (navigationName) {
      navigation.navigate(navigationName, { id: selectedItem.id });
    }
  };

  return (
    <Block white>
      <Block scroll contentContainerStyle={styles.contentContainer}>
        {notebookList && notebookList.length > 0 && (
          <>
            {notebookList.map((item, index) => {
              const moduleTitle = getModuleTitle(item.moduleId);
              return item.list && item.list.length ? (
                <MyNotebookVerticalList
                  onSeeAllPress={() => {
                    const navigationName = getNavigationName(item.moduleId);
                    navigation.navigate(routes.MY_NOTEBOOK_LISTING, {
                      moduleID: item.moduleId,
                      title: moduleTitle,
                      navigationName: navigationName,
                    });
                  }}
                  onPress={(selectedItem) => {
                    onPressItem({ moduleID: item.moduleId, selectedItem });
                  }}
                  onEdit={(selectedItem) => {
                    setSelectedItem({
                      moduleID: item.moduleId,
                      ...selectedItem,
                    });
                    setNoteTextAreaVisible(true);
                  }}
                  list={item.list}
                  title={moduleTitle}
                />
              ) : null;
            })}
          </>
        )}
      </Block>
      <LoadingIndicator visible={getNotebookListAPI.loading} />
      {noteTextAreaVisible && (
        <AddNoteTextAreaPopUp
          isVisible={true}
          hideModal={() => setNoteTextAreaVisible(false)}
          onSave={(text) => {
            updateNotebookList({
              itemID: selectedItem.id,
              moduleID: selectedItem.moduleID,
              text,
            });
            setNoteTextAreaVisible(false);
          }}
          initialValue={selectedItem.memory}
        />
      )}
    </Block>
  );
};

export default MyNotebookHomePage;

const styles = StyleSheet.create({});
