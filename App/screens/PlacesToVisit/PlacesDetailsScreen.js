import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import colors from '../../config/colors';
import IconContainer from '../../components/IconContainer';
import AppButton from '../../components/AppButton';
import Separator from '../../components/Separator';
import routes from '../../navigation/routes';
import { IconTypes } from '../../components/AppTheme/Icon';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import CommentCard from '../../components/CommentCard';
import IconLabel from '../../components/IconLabel';
import ListsItems from '../../config/ListsItems';
import DetailItem from '../../components/DetailItem';
import useApi from '../../hooks/useApi';
import AppAlert from '../../utils/AppAlert';
import placestovisit from '../../api/placesToVisit';
import favorites from '../../api/favorites';
import LoadingIndicator from '../../components/LoadingIndicator';
import AddNotePopup from '../../components/myNotebook/AddNotePopup';
import MessagePopup from '../../components/MessagePopup';
import ImageList from '../../components/ImageList';
import AppStyles from '../../config/AppStyles';
import { useAuthReducer } from '../../reducers/authReducer';
import { useTranslation } from 'react-i18next';
import MapHelper from '../../utils/MapHelper';

const PlacesDetailsScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  // redux
  const { userIsBusiness, userIsVisitor } = useAuthReducer();
  // useApi
  const getPlaceDetailAPI = useApi(placestovisit.getPlaceDetail);
  const addPlaceToFavoriteAPI = useApi(favorites.addToFavorite);
  const deletePlaceFromFavoriteAPI = useApi(favorites.deleteFromFavorite);
  // useState
  const [placeData, setPlaceData] = useState([]);
  const [myNoteVisible, setMyNoteVisible] = useState(false);
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  // variables
  const headerIcons = [
    {
      icon: {
        name: placeData.favorite ? 'heart' : 'hearto',
        type: 'antdesign',
        color: placeData.favorite ? colors.heart : colors.black,
      },
      onPress: () => {
        if (userIsVisitor) {
          navigation.navigate(routes.LOGIN_STACK, { screen: routes.SING_IN });
        } else {
          placeData.favorite ? deletePlaceFromFavorite() : addPlaceToFavorite();
        }
      },
    },
    {
      icon: {
        name: 'book',
        type: IconTypes.feather,
      },
      onPress: () => {
        if (userIsVisitor) {
          navigation.navigate(routes.LOGIN_STACK, { screen: routes.SING_IN });
        } else {
          setMyNoteVisible(true);
        }
      },
    },
  ];

  useEffect(() => {
    getPlaceDetail();
  }, []);

  const addPlaceToFavorite = async () => {
    /**
     * Gezilecek yeri favoriler listesine ekler.
     */
    const result = await addPlaceToFavoriteAPI.request(
      placeData.moduleId,
      placeData.id,
    );
    if (result.ok) {
      setPlaceData({ ...placeData, favorite: !placeData.favorite });
      setMessagePopupVisible({
        isVisible: true,
        title: t('successful'),
        subTitle: result.data.message,
      });
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          navigation.goBack();
        },
      });
    }
  };

  const deletePlaceFromFavorite = async () => {
    /**
     * Gezilecek yeri favorilerden kaldırır.
     */
    const result = await deletePlaceFromFavoriteAPI.request(
      placeData.moduleId,
      placeData.id,
    );
    if (result.ok) {
      setPlaceData({ ...placeData, favorite: !placeData.favorite });
      setMessagePopupVisible({
        isVisible: true,
        title: t('successful'),
        subTitle: result.data.message,
      });
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          navigation.goBack();
        },
      });
    }
  };

  const getPlaceDetail = async () => {
    /**
     * Gezilecek yer detay bilgisini getirir.
     */
    const result = await getPlaceDetailAPI.request(route.params.placeID);
    if (result.ok) {
      setPlaceData(result.data.data);
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          getPlaceDetail();
        },
        okText: t('try_again'),
      });
    }
  };

  return (
    <Block white>
      {placeData && (
        <Block scroll showsVerticalScrollIndicator={false}>
          <Block shadow flex={0}>
            <ImageList
              data={placeData.images}
              imageStyle={{ height: Dimensions.get('screen').height * 0.4 }}
            />
            <IconContainer
              icon={{
                type: 'fontAwesome',
                name: 'angle-left',
                size: 27,
                color: colors.blackGrey,
              }}
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.backIcon}
              backgroundColor={colors.white}
            />
            {!userIsBusiness && (
              <Block style={styles.headerIconsContainer} paddingRight>
                {headerIcons.map((item, index) => {
                  return (
                    <IconContainer
                      icon={{ ...item.icon, size: 20 }}
                      onPress={item.onPress}
                      style={styles.rightIcon}
                      backgroundColor={colors.white}
                    />
                  );
                })}
              </Block>
            )}
          </Block>
          <Block>
            <Block padding={[8, 16, 16, 16]}>
              <Block marginBottom={16}>
                <Block noflex>
                  <Text notera size={40} white color={colors.lightGray}>
                    {placeData.title}
                  </Text>
                </Block>
                <Text size={20} bold marginBottom>
                  {placeData.title}
                </Text>
                <Block row center marginBottom={16}>
                  <Text medium>{placeData.address}</Text>
                  {placeData.latitude && (
                    <Block>
                      <AppButton
                        onPress={() => {
                          navigation.navigate(routes.FULL_SCREEN_MAP, {
                            latitude: placeData.latitude,
                            longitude: placeData.longitude,
                          });
                        }}
                        title={t('show_map')}
                        textOnly
                        underlined
                        size={12}
                        marginLeft
                        textColor={colors.underlinedText}
                      />
                    </Block>
                  )}
                </Block>
                <Separator
                  backgroundColor={colors.lightGray}
                  marginBottom={16}
                />
                <Text
                  numberOfLines={8}
                  marginBottom
                  color={colors.hotelCardGrey}>
                  {placeData.description}
                </Text>
                <AppButton
                  title={t('show_more')}
                  onPress={() => {
                    navigation.navigate(routes.ABOUT, {
                      title: placeData.title,
                      subTitle: placeData.description,
                    });
                  }}
                  size={12}
                  textOnly
                  underlined
                  textColor={colors.underlinedText}
                  marginBottom={20}
                />
                <Separator backgroundColor={colors.lightGray} />
              </Block>
              {placeData.latitude && (
                <Block margin marginBottom={20}>
                  <Text bold size={20} marginBottom={5}>
                    {t('location')}
                  </Text>
                  <Text marginBottom>{placeData.address}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      MapHelper.openMap({
                        latitude: placeData.latitude,
                        longitude: placeData.longitude,
                        address: placeData.address,
                      });
                    }}>
                    <MapView
                      provider={PROVIDER_GOOGLE}
                      pitchEnabled={false}
                      zoomEnabled={false}
                      zoomTapEnabled={false}
                      scrollEnabled={false}
                      initialRegion={{
                        latitude: placeData.latitude,
                        longitude: placeData.longitude,
                        latitudeDelta: 0.0122,
                        longitudeDelta: 0.0121,
                      }}
                      onPress={() => {
                        MapHelper.openMap({
                          latitude: placeData.latitude,
                          longitude: placeData.longitude,
                          address: placeData.address,
                        });
                      }}
                      style={styles.map}>
                      <Marker
                        coordinate={{
                          latitude: placeData.latitude,
                          longitude: placeData.longitude,
                        }}>
                        <Image
                          source={require('../../assets/images/dropbin.png')}
                          style={AppStyles.pin}
                        />
                      </Marker>
                    </MapView>
                  </TouchableOpacity>
                </Block>
              )}
              <Separator backgroundColor={colors.lightGray} />
            </Block>
            {placeData.comments && placeData.comments.length > 0 ? (
              <Block>
                <Block marginLeft={16}>
                  <IconLabel
                    icon={{
                      type: IconTypes.fontAwesome,
                      name: 'star',
                      color: colors.star,
                      size: 16,
                    }}
                    text={`${placeData.ratings.totalRate} (${
                      placeData.comments.length
                    } ${t('evaluation')})`}
                  />
                </Block>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ marginLeft: 16, marginRight: 16 }}
                  data={placeData.comments}
                  renderItem={({ item }) => {
                    return (
                      <CommentCard
                        username={item.userName}
                        date={item.date}
                        comment={item.comment}
                      />
                    );
                  }}
                  keyExtractor={(item) => item.index}
                />
                <AppButton
                  title={`${placeData.comments.length} ${t('see_all')}`}
                  size={12}
                  onPress={() => {
                    navigation.navigate(routes.REVIEWS, {
                      commentsList: placeData.comments,
                      reviewData: placeData.ratings.ratings,
                      moduleId: placeData.moduleId,
                      id: placeData.id,
                    });
                  }}
                  textOnly
                  underlined
                  textColor={colors.underlinedText}
                  marginBottom={16}
                  marginLeft={16}
                  marginTop={16}
                />
              </Block>
            ) : (
              <Block marginLeft={16}>
                <AppButton
                  title={t('comment')}
                  textColor={colors.secondary}
                  textOnly
                  onPress={() => {
                    if (userIsVisitor) {
                      navigation.navigate(routes.LOGIN_STACK, {
                        screen: routes.SING_IN,
                      });
                    } else {
                      navigation.navigate(routes.ADD_COMMENT_SCREEN, {
                        moduleId: placeData.moduleId,
                        id: placeData.id,
                      });
                    }
                  }}
                />
              </Block>
            )}
            {placeData.workingHours && placeData.workingHours.length > 0 && (
              <Block margin={16}>
                <Separator backgroundColor={colors.lightGray} marginBottom />
                {ListsItems.placesDetailPage.map((item, index) => {
                  return (
                    <DetailItem
                      text={item.text}
                      subtext={placeData.workingHours[0].subtitle}
                      onPress={() => {
                        if (item.navigateTo) {
                          navigation.navigate(item.navigateTo, {
                            list: placeData.workingHours,
                          });
                        }
                      }}
                      marginBottom={20}
                    />
                  );
                })}
              </Block>
            )}
          </Block>
        </Block>
      )}
      <LoadingIndicator
        visible={
          getPlaceDetailAPI.loading ||
          addPlaceToFavoriteAPI.loading ||
          deletePlaceFromFavoriteAPI.loading
        }
      />
      <AddNotePopup
        isVisible={myNoteVisible}
        hideModal={() => setMyNoteVisible(false)}
        onYes={() => {
          navigation.navigate(routes.ADD_MEMORY_SCREEN, {
            moduleId: placeData.moduleId,
            id: placeData.id,
          });
        }}
      />
      <MessagePopup
        isVisible={messagePopupVisible.isVisible}
        title={messagePopupVisible.title}
        subTitle={messagePopupVisible.subTitle}
        hideModal={() => {
          setMessagePopupVisible({ isVisible: false });
        }}
      />
    </Block>
  );
};

export default PlacesDetailsScreen;

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: Dimensions.get('screen').height * 0.35,
    resizeMode: 'cover',
  },
  contentContainer: {
    paddingBottom: 65,
  },
  possibilityIcon: {
    marginBottom: 5,
  },
  backIcon: {
    marginLeft: 10,
    marginTop: 10,
    position: 'absolute',
    top: 0,
    left: 0,
  },

  rightIcon: {
    marginBottom: 10,
  },
  headerIconsContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  map: {
    height: 150,
    width: '100%',
    borderRadius: 16,
  },
  serviceItemText: {
    flex: 1,
  },
  headerContentContainer: {
    position: 'absolute',
    top: 0,
  },
});
