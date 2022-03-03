import React, { useState, useLayoutEffect, useEffect } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import VerticalSeparator from '../../components/VerticalSeparator';
import colors from '../../config/colors';
import IconWithClick from '../../components/IconWithClick';
import { IconTypes } from '../../components/AppTheme/Icon';
import routes from '../../navigation/routes';
import MyNotebookListItem from '../../components/myNotebook/MyNotebookListItem';
import AddNoteTextAreaPopUp from '../../components/myNotebook/AddNoteTextAreaPopUp';
import useApi from '../../hooks/useApi';
import memoryBook from '../../api/memoryBook';
import LoadingIndicator from '../../components/LoadingIndicator';
import AppAlert from '../../utils/AppAlert';
import { useTranslation } from 'react-i18next';

const MyNotebookListingScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  // useState
  const [noteTextAreaVisible, setNoteTextAreaVisible] = useState(false);
  const [notebookList, setNotebookList] = useState([]);
  const [notebookListInfo, setNotebookListInfo] = useState(null);
  const [query, setQuery] = useState({
    page: 1,
  });
  const [selectedItem, setSelectedItem] = useState({});
  // useApi
  const getNotebookListAPI = useApi(memoryBook.getMemoryListByCategory);
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
      headerRight: () => (
        <Block center row marginRight>
          <VerticalSeparator backgroundColor={colors.lightGray} />
          <IconWithClick
            name={'filter'}
            type={IconTypes.antdesign}
            size={20}
            color={colors.black}
            marginRight
            marginLeft
            onPress={() => {
              navigation.navigate(routes.FILTERS_SCREEN, {
                filters: notebookListInfo.filters,
                onReturn: (selectedFilters) => {
                  setQuery({
                    ...query,
                    page: 1,
                    ...selectedFilters,
                  });
                  setNotebookList([]);
                  getNoteBookList({
                    ...query,
                    page: 1,
                    ...selectedFilters,
                  });
                },
                onDeleteAll: () => {
                  setQuery({
                    page: 1,
                  });
                  setNotebookList([]);
                  getNoteBookList({
                    page: 1,
                  });
                },
              });
            }}
          />
        </Block>
      ),
    });
  }, [navigation, notebookListInfo]);

  useEffect(() => {
    getNoteBookList(query);
  }, []);

  const getNoteBookList = async (newQuery) => {
    const result = await getNotebookListAPI.request({
      moduleID: route.params.moduleID,
      query: newQuery,
    });
    if (result.ok) {
      setNotebookListInfo(result.data.data);
      setNotebookList(result.data.data.list);
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          getNoteBookList();
        },
        okText: t('try_again'),
      });
    }
  };

  const updateNotebookList = async ({ itemID, text }) => {
    const result = await updateNotebookListAPI.request({
      id: itemID,
      moduleId: route.params.moduleID,
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

  return (
    <Block white>
      <Text bold size={22} marginBottom={5} marginLeft={16}>
        {route.params.title}
      </Text>
      {notebookList && notebookList.length > 0 && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 70 }}
          data={notebookList}
          renderItem={({ item, index }) => {
            return (
              <MyNotebookListItem
                onPress={() => {
                  navigation.navigate(route.params.navigationName, {
                    id: item.id,
                  });
                }}
                onEdit={() => {
                  setSelectedItem(item);
                  setNoteTextAreaVisible(true);
                }}
                title={item.title}
                address={item.address}
                note={item.memory}
                date={item.createdAt}
                images={item.images}
                isFavorite={item.isFavorite}
              />
            );
          }}
          keyExtractor={(item) => item.index}
          onEndReachedThreshold={0}
          onEndReached={() => {
            if (
              notebookListInfo.pagination.currentPage >=
              notebookListInfo.pagination.lastPage
            ) {
            } else {
              if (!getNotebookListAPI.loading) {
                setQuery({ ...query, page: query.page + 1 });
                getNotebookList({ ...query, page: query.page + 1 });
              }
            }
          }}
          ListFooterComponent={() => {
            return (
              <Block>
                {getNotebookListAPI.loading ? (
                  <ActivityIndicator
                    size="large"
                    color={colors.primary}
                    style={styles.footerIndicator}
                  />
                ) : null}
              </Block>
            );
          }}
        />
      )}
      {noteTextAreaVisible && (
        <AddNoteTextAreaPopUp
          isVisible={true}
          hideModal={() => setNoteTextAreaVisible(false)}
          onSave={(text) => {
            updateNotebookList({ itemID: selectedItem.id, text });
            setNoteTextAreaVisible(false);
          }}
          initialValue={selectedItem.memory}
        />
      )}

      <LoadingIndicator visible={getNotebookListAPI.loading} />
    </Block>
  );
};

export default MyNotebookListingScreen;

const styles = StyleSheet.create({
  footerIndicator: {
    marginLeft: 6,
  },
});
