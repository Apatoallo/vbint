import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import CampaignListItem from '../../components/campaign/CampaignListItem';
import BackIcon from '../../components/BackIcon';
import VerticalSeparator from '../../components/VerticalSeparator';
import IconWithClick from '../../components/IconWithClick';
import { Block, Text } from '../../components/AppTheme';
import Icon, { IconTypes } from '../../components/AppTheme/Icon';
import routes from '../../navigation/routes';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';
import campaigns from '../../api/campaigns';
import useApi from '../../hooks/useApi';
import AppAlert from '../../utils/AppAlert';
import { useTranslation } from 'react-i18next';

const CampaignList = ({ navigation }) => {
  const { t } = useTranslation();
  const [filtered, setFiltered] = useState(false);
  const [campaignListData, setCampaignListData] = useState({});
  const [campaignList, setCampaignList] = useState([]);
  const getCampaignsListApi = useApi(campaigns.getCampaigns);
  const [query, setQuery] = useState({
    page: 1,
  });

  useLayoutEffect(() => {
    const starIcon = {
      name: 'star',
      type: IconTypes.antdesign,
      size: 18,
      color: colors.star,
    };
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'left',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,

      headerTitle: (props) => (
        <Block middle center row>
          <Text
            numberOfLines={1}
            bold
            size={16}
            marginRight={5}
            onPress={() => {
              navigation.navigate(routes.SEARCH_SCREEN);
            }}>
            {t('campaigns')}
          </Text>
          <Icon {...starIcon} />
        </Block>
      ),
      headerRight: () => (
        <Block center row marginRight marginTop>
          <VerticalSeparator backgroundColor={colors.lightGray} />
          {filtered && <Block noflex style={styles.filterBadge} />}
          <IconWithClick
            name={'filter'}
            type={IconTypes.antdesign}
            size={20}
            color={colors.black}
            marginRight
            marginLeft
            onPress={() => {
              navigation.navigate(routes.FILTERS_SCREEN, {
                filters: campaignListData.filters,
                onReturn: (selectedFilters) => {
                  setQuery({
                    ...query,
                    page: 1,
                    ...selectedFilters,
                  });
                  setCampaignList([]);
                  getCampaignsList({
                    ...query,
                    page: 1,
                    ...selectedFilters,
                  });
                },
              });
            }}
          />
        </Block>
      ),
    });
  }, [campaignListData.filters, navigation, query]);

  const getCampaignsList = async (q) => {
    const result = await getCampaignsListApi.request({
      ...q,
    });

    if (result.ok) {
      setCampaignListData(result.data.data);
      setCampaignList((list) => {
        return [...list, ...result.data.data.list];
      });
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          setQuery({ page: 1 });
          setCampaignList({ page: 1 });
        },
        okText: t('try_again'),
      });
    }
  };
  useEffect(() => {
    getCampaignsList(query);
  }, []);

  const renderItem = ({ item }) => {
    /**
     * Kampanya item ini içerir.
     */
    return (
      <CampaignListItem
        title={item.title}
        address={' '}
        campaignTitle={item.campaignTitle}
        description={item.description}
        image={item.images[0]}
        time={'9 gün kaldı'}
        isFavorite={item.isFavorite}
        isCampaign={item.campaign}
        isMemoryBook={false}
        onPress={() => {
          switch (item.destination) {
            case 'hotels':
              navigation.navigate(routes.HOTEL_STACK, {
                screen: routes.HOTEL_DETAILS_SCREEN,
                params: { id: item.id },
              });
              break;
            case 'cafes':
              navigation.navigate(routes.RESTAURANT_STACK, {
                screen: routes.RESTAURANT_DETAILS_SCREEN,
                params: { id: item.id },
              });
              break;
            case 'activities':
              navigation.navigate(routes.EVENT_STACK, {
                screen: routes.EVENT_DETAIL,
                params: { id: item.id },
              });
              break;
            case 'boats':
              navigation.navigate(routes.YACHT_BOAT_STACK, {
                screen: routes.YACHT_BOAT_DETAIL_SCREEN,
                params: { id: item.id },
              });
              break;
            case 'tours':
              navigation.navigate(routes.TOUR_STACK, {
                screen: routes.TOUR_DETAIL_SCREEN,
                params: { id: item.id },
              });
              break;
            case 'places':
              navigation.navigate(routes.PLACES_STACK, {
                screen: routes.PLACES_DETAIL_SCREEN,
                params: { id: item.id },
              });
              break;
            case 'blogs':
              navigation.navigate(routes.BLOG_STACK, {
                screen: routes.BLOG_DETAIL_SCREEN,
                params: { id: item.id },
              });
              break;
          }
        }}
        marginBottom={20}
      />
    );
  };

  return (
    <Block white>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={campaignList}
        renderItem={renderItem}
        keyExtractor={(item) => item.index}
        contentContainerStyle={styles.listContentContainer}
        ListFooterComponent={() => {
          return (
            <Block>
              {getCampaignsListApi.loading ? (
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
  );
};

export default CampaignList;

const styles = StyleSheet.create({
  listContentContainer: {
    padding: 16,
  },
  filterBadge: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: colors.black,
    position: 'absolute',
    top: -10,
    right: 8,
  },
});
