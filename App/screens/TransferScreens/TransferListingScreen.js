import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import routes from '../../navigation/routes';
import colors from '../../config/colors';
import IconWithClick from '../../components/IconWithClick';
import { IconTypes } from '../../components/AppTheme/Icon';
import { TextInput } from '../../components/AppTheme/index';
import transfers from '../../api/transfers';
import useApi from '../../hooks/useApi';
import AppAlert from '../../utils/AppAlert';
import AppButton from '../../components/AppButton';
import TransferListItem from '../../components/tansfer/TransferListItem';
import { useTranslation } from 'react-i18next';

const TransferListingScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [transferListData, setTransferListData] = useState({});
  const [transferList, setTransfersList] = useState([]);

  const getTransfersListApi = useApi(transfers.getTransfersList);
  const [query, setQuery] = useState({
    page: 1,
  });
  const [filterSelected, setFilterSelected] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'left',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,

      headerTitle: (props) => (
        <Block>
          <TextInput
            style={styles.input}
            onChangeText={(txt) => {
              setQuery({ ...query, searchText: txt, page: 1 });
              if (txt.length > 1) {
                setQuery({ ...query, searchText: txt, page: 1 });
                setTransfersList([]);
                getTransfersList({ ...query, searchText: txt, page: 1 });
              } else if (txt.length === 0) {
                getTransfersList({ ...query, page: 1 });
              }
            }}
            value={query?.searchText}
            placeholder={t('what_are_you_looking_for')}
          />
        </Block>
      ),
      headerRight: () => (
        <Block center row marginRight>
          <IconWithClick
            name={'filter'}
            type={IconTypes.antdesign}
            size={20}
            color={colors.semiBlack}
            marginRight
            marginLeft
            onPress={() => {
              navigation.navigate(routes.HOTEL_FILTERS_SCREEN, {
                filters: transferListData.filters,
                onReturn: (selectedFilters) => {
                  setFilterSelected(true);
                  setQuery({
                    ...query,
                    page: 1,
                    ...selectedFilters,
                  });
                  setTransfersList([]);
                  getTransfersList({
                    ...query,
                    page: 1,
                    ...selectedFilters,
                  });
                },
                onDeleteAll: () => {
                  setFilterSelected(false);
                  setQuery({
                    page: 1,
                    categories: route?.params?.categoryId
                      ? [route?.params?.categoryId]
                      : [],
                  });
                  setTransfersList([]);
                  getTransfersList({
                    page: 1,
                    categories: route?.params?.categoryId
                      ? [route?.params?.categoryId]
                      : [],
                  });
                },
              });
            }}
          />
        </Block>
      ),
    });
  }, [transferListData.filters, navigation, query]);

  const getTransfersList = async (q) => {
    const result = await getTransfersListApi.request({
      ...q,
    });

    if (result.ok) {
      setTransferListData(result.data.data);
      setTransfersList((list) => {
        return [...list, ...result.data.data.list];
      });
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          setQuery({ page: 1 });
          getTransfersList({ page: 1 });
        },
        okText: t('try_again'),
      });
    }
  };
  useEffect(() => {
    getTransfersList(query);
  }, []);

  return (
    <Block white>
      <Block>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() =>
            !getTransfersListApi.loading ? (
              <Block center>
                <Text bold marginTop>
                  {t('no_return')}
                </Text>
                <Block>
                  <AppButton
                    marginTop
                    textColor={colors.primary}
                    textOnly
                    title={t('clear_filters')}
                    onPress={() => {
                      setQuery({ page: 1 });
                      getTransfersList({ page: 1 });
                    }}
                  />
                </Block>
              </Block>
            ) : null
          }
          data={transferList}
          renderItem={({ item }) => (
            <TransferListItem
              onPress={() => {
                navigation.navigate(routes.TRANSFER_DETAILS_SCREEN, {
                  id: item.id,
                });
              }}
              title={item.title}
              description={item.description}
              ratting={item.ratting}
              imageList={item.images}
              isFavorite={item.isFavorite}
              isMemoryBook={item.isMemoryBook}
              maxPerson={item.maxPerson}
              size={item.numberOfCabins}
              baggageLimit={item.baggageLimit}
            />
          )}
          keyExtractor={(item) => item.index}
          onEndReachedThreshold={0}
          onEndReached={() => {
            if (
              transferListData.pagination.currentPage >=
              transferListData.pagination.lastPage
            ) {
            } else {
              if (!getTransfersListApi.loading) {
                setQuery({ ...query, page: query.page + 1 });
                getTransfersList({ ...query, page: query.page + 1 });
              }
            }
          }}
          ListFooterComponent={() => {
            return (
              <Block>
                {getTransfersListApi.loading ? (
                  <ActivityIndicator
                    size="large"
                    color={colors.primary}
                    style={{ marginLeft: 6 }}
                  />
                ) : null}
              </Block>
            );
          }}
        />
      </Block>
    </Block>
  );
};

export default TransferListingScreen;

const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    width: 200,
  },
});
