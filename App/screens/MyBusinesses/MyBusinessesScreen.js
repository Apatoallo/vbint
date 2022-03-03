import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme/index';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import colors from '../../config/colors';
import TabBtn from '../../components/myBusinesses/TabBtn';
import routes from '../../navigation/routes';
import BusinessesListItem from '../../components/myBusinesses/BusinessesListItem';
import UpdateDeletePopUp from '../../components/myBusinesses/UpdateDeletePopUp';
import useApi from '../../hooks/useApi';
import myBusinesses from '../../api/myBusinesses';
import AppAlert from '../../utils/AppAlert';
import LoadingIndicator from '../../components/LoadingIndicator';
import MessagePopup from '../../components/MessagePopup';
import { useTranslation } from 'react-i18next';

const MyBusinessesScreen = ({ navigation }) => {
  const { t } = useTranslation();
  // useState
  const [selectedTab, setSelectedTab] = useState(1);
  const [popupVisible, setPopupVisible] = useState(false);
  const [activeBusinessList, setActiveBusinessList] = useState([]);
  const [passiveBusinessList, setPassiveBusinessList] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  // useApi
  const getMyBusinessListAPI = useApi(myBusinesses.getMyBusinessList);
  const updateBusinessAPI = useApi(myBusinesses.updateBusiness);
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'center',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
      headerTitle: (props) => (
        <Text bold numberOfLines={1} size={18}>
          {t('my_business')}
        </Text>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getBusinessList();
    });

    return unsubscribe;
  }, []);

  const getBusinessList = async () => {
    const result = await getMyBusinessListAPI.request();
    if (result.ok) {
      setActiveBusinessList(result.data.data.active);
      setPassiveBusinessList(result.data.data.passive);
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          getBusinessList();
        },
        okText: 'Tekrar Dene',
      });
    }
  };

  const updateBusiness = async (corporationID) => {
    const result = await updateBusinessAPI.request({
      corporationId: corporationID,
      status: selectedTab == 1 ? 0 : 1,
    });
    if (result.ok) {
      setMessagePopupVisible({
        isVisible: true,
        title: 'Başarılı',
        subTitle: result.data.message,
      });
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          updateBusiness(corporationID);
        },
        okText: 'Tekrar Dene',
      });
    }
  };

  const getNavigationInfo = (moduleID) => {
    switch (moduleID) {
      case 1:
        return {
          stack: routes.EVENT_STACK,
          navigationName: routes.EVENT_DETAIL,
        };
      case 2:
        return {
          stack: routes.HOTEL_STACK,
          navigationName: routes.HOTEL_DETAILS_SCREEN,
        };
      case 3:
        return {
          stack: routes.RESTAURANT_STACK,
          navigationName: routes.RESTAURANT_DETAILS_SCREEN,
        };
      case 4:
        return {
          stack: routes.TOUR_STACK,
          navigationName: routes.TOUR_DETAIL_SCREEN,
        };
      case 5:
        return {
          stack: routes.YACHT_BOAT_STACK,
          navigationName: routes.YACHT_BOAT_DETAIL_SCREEN,
        };
      case 6:
        return {
          stack: routes.PLACES_STACK,
          navigationName: routes.PLACES_DETAILS_SCREEN,
        };
      case 7:
        return {
          stack: routes.BLOG_STACK,
          navigationName: routes.BLOG_DETAILS_SCREEN,
        };
      default:
        return null;
    }
  };

  const goToDetail = ({ moduleID, selectedItem }) => {
    const navigationInfo = getNavigationInfo(moduleID);
    if (navigationInfo) {
      navigation.navigate(navigationInfo.stack, {
        screen: navigationInfo.navigationName,
        params: { id: selectedItem.id },
      });
    }
  };

  return (
    <Block white>
      <Block flex={0} marginLeft={16} marginBottom marginRight={16} row>
        <TabBtn
          onPress={() => {
            setSelectedTab(1);
          }}
          selectedTab={selectedTab}
          id={1}
          title={t('on_air')}
        />
        <TabBtn
          onPress={() => {
            setSelectedTab(2);
          }}
          selectedTab={selectedTab}
          id={2}
          title={t('not_on_air')}
        />
      </Block>
      <Block>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          data={selectedTab == 1 ? activeBusinessList : passiveBusinessList}
          renderItem={({ item, index }) => (
            <BusinessesListItem
              selectedTab={selectedTab}
              updatedAt={item.updatedAt}
              images={item.images}
              title={item.title}
              address={item.address}
              description={item.description}
              rate={item.rating.totalRate}
              onPress={() => {
                goToDetail({ selectedItem: item, moduleID: item.moduleId });
              }}
              onUpdate={() => {
                setPopupVisible(true);
                setSelectedItem(item);
              }}
            />
          )}
          ListHeaderComponent={() => (
            <Block marginLeft={20} marginRight={20}>
              <Text color={colors.hotelCardLightGrey} size={14}>
                {t('business_operations')}
              </Text>
            </Block>
          )}
          keyExtractor={(item) => item.index}
        />
      </Block>
      <UpdateDeletePopUp
        isVisible={popupVisible}
        hideModal={() => {
          setPopupVisible(false);
        }}
        onYes={() => {
          updateBusiness(selectedItem.id);
        }}
        selectedTab={selectedTab}
      />

      <MessagePopup
        isVisible={messagePopupVisible.isVisible}
        title={messagePopupVisible.title}
        subTitle={messagePopupVisible.subTitle}
        hideModal={() => {
          setMessagePopupVisible({ isVisible: false });
        }}
      />
      <LoadingIndicator
        visible={getMyBusinessListAPI.loading || updateBusinessAPI.loading}
      />
    </Block>
  );
};

export default MyBusinessesScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 116,
  },
});
