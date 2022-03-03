import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import colors from '../../config/colors';
import IconContainer from '../../components/IconContainer';
import AppButton from '../../components/AppButton';
import Separator from '../../components/Separator';
import routes from '../../navigation/routes';
import IconLabelButton from '../../components/IconLabelButton';
import { IconTypes } from '../../components/AppTheme/Icon';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import AppStyles from '../../config/AppStyles';
import MenuListItem from '../../components/restaurant/MenuListItem';
import CommentCard from '../../components/CommentCard';
import IconLabel from '../../components/IconLabel';
import DetailItem from '../../components/DetailItem';
import ShareTool from '../../utils/ShareTool';
import AddNotePopup from '../../components/myNotebook/AddNotePopup';
import cafes from '../../api/cafes';
import useApi from '../../hooks/useApi';
import LoadingIndicator from '../../components/LoadingIndicator';
import ImageList from '../../components/ImageList';
import TotalRatingItem from '../../components/TotalRatingItem';
import MessagePopup from '../../components/MessagePopup';
import favorites from '../../api/favorites';
import ReservationPopup from '../../components/ReservationPopup';
import RedirectPopUp from '../../components/RedirectPopUp';
import AppAlert from '../../utils/AppAlert';
import PossibilityIcon from '../../components/PossibilityIcon';
import { useAuthReducer } from '../../reducers/authReducer';
import call from '../../api/call';
import { useTranslation } from 'react-i18next';
import MapHelper from '../../utils/MapHelper';

const RestaurantDetailsScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  // redux
  const { userIsBusiness, userIsVisitor } = useAuthReducer();
  // useState
  const [reservationMessageVisible, setReservationMessageVisible] =
    useState(false);
  const [myNoteVisible, setMyNoteVisible] = useState(false);
  const [cafeDetails, setCafeDetails] = useState(null);
  const [redirectMessageVisible, setRedirectMessageVisible] = useState(false);
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  const [messageChecked, setMessageChecked] = useState(false);
  const getCafeDetailsApi = useApi(cafes.getCafeDetails);
  const addCafeToFavoriteApi = useApi(favorites.addToFavorite);
  const deleteCafeFromFavoriteApi = useApi(favorites.deleteFromFavorite);
  const recordCallApi = useApi(call.recordCall);

  const getCafeDetails = async () => {
    const result = await getCafeDetailsApi.request(route?.params?.id);

    if (result.ok) {
      setCafeDetails(result.data.data);
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          navigation.goBack();
        },
      });
    }
  };
  const addCafeToFavorite = async () => {
    const result = await addCafeToFavoriteApi.request(
      cafeDetails.moduleId,
      cafeDetails.id,
    );
    if (result.ok) {
      setCafeDetails({ ...cafeDetails, isFavorite: !cafeDetails.isFavorite });
      setMessagePopupVisible({
        isVisible: true,
        title: t('successful'),
        subTitle: result.data.message,
      });
    } else {
    }
  };
  const deleteCafeFromFavorite = async () => {
    const result = await deleteCafeFromFavoriteApi.request(
      cafeDetails.moduleId,
      cafeDetails.id,
    );
    if (result.ok) {
      setCafeDetails({ ...cafeDetails, isFavorite: !cafeDetails.isFavorite });
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

  useEffect(() => {
    getCafeDetails();
  }, []);

  const headerIcons = userIsBusiness
    ? [
        {
          icon: {
            name: 'share',
            type: 'simpleLineIcon',
          },
          onPress: () => Linking.openURL(cafeDetails?.url),
        },
      ]
    : [
        {
          icon: {
            name: cafeDetails?.isFavorite ? 'heart' : 'hearto',
            type: 'antdesign',
            color: cafeDetails?.isFavorite ? 'red' : 'black',
          },
          onPress: () => {
            if (userIsVisitor) {
              navigation.navigate(routes.LOGIN_STACK, {
                screen: routes.SING_IN,
              });
            } else {
              cafeDetails?.isFavorite
                ? deleteCafeFromFavorite()
                : addCafeToFavorite();
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
              navigation.navigate(routes.LOGIN_STACK, {
                screen: routes.SING_IN,
              });
            } else {
              setMyNoteVisible(true);
            }
          },
        },
        {
          icon: {
            name: 'share',
            type: 'simpleLineIcon',
          },
          onPress: () => Linking.openURL(cafeDetails?.url),
        },
      ];

  const callNumber = async ({ moduleID, dataID, number }) => {
    ShareTool.callNumber(number);
    await recordCallApi.request({
      moduleId: moduleID,
      dataId: dataID,
    });
  };

  return (
    <Block white>
      {cafeDetails && (
        <Block>
          <Block
            scroll
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            <Block shadow flex={0}>
              <ImageList
                data={cafeDetails?.images}
                imageStyle={{ height: Dimensions.get('screen').height * 0.4 }}
                onPress={() => {
                  navigation.navigate(routes.FULL_SCREEN_IMAGE_SLIDER, {
                    images: cafeDetails?.images,
                  });
                }}
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
            </Block>
            <Block>
              <Block padding={[8, 16, 16, 16]}>
                <Block marginBottom={16}>
                  <Block noflex>
                    <Text notera size={40} white color={colors.lightGray}>
                      {cafeDetails?.title}
                    </Text>
                  </Block>
                  <Text size={20} bold marginBottom>
                    {cafeDetails?.title}
                  </Text>
                  <Block row center marginBottom>
                    <Text medium>{cafeDetails?.address}</Text>
                    <Block>
                      <AppButton
                        onPress={() => {
                          navigation.navigate(routes.FULL_SCREEN_MAP, {
                            latitude: cafeDetails?.location?.latitude,
                            longitude: cafeDetails?.location?.longitude,
                            latitudeDelta: cafeDetails?.location?.latitudeDelta,
                            longitudeDelta:
                              cafeDetails?.location?.longitudeDelta,
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
                  </Block>
                  <TotalRatingItem rating={cafeDetails?.ratings.totalRate} />

                  <Separator
                    backgroundColor={colors.lightGray}
                    marginBottom={16}
                  />
                  <Text
                    numberOfLines={4}
                    marginBottom
                    medium
                    color={colors.hotelCardGrey}>
                    {cafeDetails?.description}
                  </Text>
                  <AppButton
                    title={t('show_more')}
                    onPress={() => {
                      navigation.navigate(routes.ABOUT, {
                        title: cafeDetails.title,
                        subTitle: cafeDetails.description,
                      });
                    }}
                    size={12}
                    textOnly
                    underlined
                    textColor={colors.underlinedText}
                    marginBottom={20}
                  />
                  {cafeDetails.getCall && (
                    <IconLabelButton
                      title={t('business_contact')}
                      icon={{
                        type: IconTypes.fontAwesome,
                        name: 'phone',
                        size: 22,
                      }}
                      middle
                      onPress={() => {
                        callNumber({
                          phone: cafeDetails.phone,
                          dataID: cafeDetails.id,
                          moduleID: cafeDetails.moduleId,
                        });
                      }}
                      marginBottom={16}
                    />
                  )}
                  <Separator backgroundColor={colors.lightGray} />
                </Block>
                <Block marginBottom={16}>
                  <Text bold size={20} marginBottom>
                    {t('possibilities')}
                  </Text>
                  <Block marginTop row marginBottom={16}>
                    {cafeDetails?.properties?.slice(0, 5).map((item, index) => {
                      return (
                        <PossibilityIcon url={item.icon} title={item.title} />
                      );
                    })}
                  </Block>
                  {cafeDetails?.services?.slice(0, 2).map((item, index) => {
                    return (
                      <Block>
                        <Block row marginBottom>
                          <Text marginBottom gray bold>
                            {index + 1 + '. '}
                          </Text>
                          <Text style={styles.serviceItemText}>{item}</Text>
                        </Block>
                      </Block>
                    );
                  })}
                  <AppButton
                    marginTop
                    title={t('show_more')}
                    size={12}
                    onPress={() => {
                      navigation.navigate(routes.SERVICES_AND_POSSIBILITES, {
                        services: cafeDetails?.services,
                        possibilities: cafeDetails?.properties,
                      });
                    }}
                    textOnly
                    underlined
                    textColor={colors.underlinedText}
                    marginBottom={16}
                  />
                  <Separator backgroundColor={colors.lightGray} />
                </Block>
                <Block>
                  <Block marginBottom>
                    <Text bold size={20}>
                      {t('menu')}
                    </Text>
                  </Block>
                  {cafeDetails?.menuList?.slice(0, 2).map((item, index) => {
                    return (
                      <MenuListItem
                        image={item.images}
                        description={item.description}
                        title={item.title}
                        price={item.price}
                        marginBottom
                      />
                    );
                  })}

                  <AppButton
                    title={t('show_more')}
                    size={12}
                    textColor={colors.secondary}
                    onPress={() => {
                      navigation.navigate(routes.RESTAURANT_MENU_SCREEN, {
                        list: cafeDetails?.menuList,
                        url: cafeDetails?.menuPdf,
                      });
                    }}
                    textOnly
                    underlined
                    textyarnolor={colors.underlinedText}
                    marginBottom={16}
                    marginLeft
                  />
                  <Separator backgroundColor={colors.lightGray} />
                </Block>
                <Block margin marginBottom={20}>
                  <Text bold size={20} marginBottom={5}>
                    {t('location')}
                  </Text>
                  <Text marginBottom>{cafeDetails?.address}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      MapHelper.openMap({
                        latitude: cafeDetails.location.latitude,
                        longitude: cafeDetails.location.longitude,
                        address: cafeDetails.location.address,
                      });
                    }}>
                    <MapView
                      provider={PROVIDER_GOOGLE}
                      pitchEnabled={false}
                      zoomEnabled={false}
                      zoomTapEnabled={false}
                      scrollEnabled={false}
                      initialRegion={{
                        latitude: cafeDetails?.location?.latitude,
                        longitude: cafeDetails?.location?.longitude,
                        latitudeDelta: cafeDetails?.location?.latitudeDelta,
                        longitudeDelta: cafeDetails?.location?.longitudeDelta,
                      }}
                      onPress={() => {
                        MapHelper.openMap({
                          latitude: cafeDetails.location.latitude,
                          longitude: cafeDetails.location.longitude,
                          address: cafeDetails.location.address,
                        });
                      }}
                      style={styles.map}>
                      <Marker
                        coordinate={{
                          latitude: cafeDetails?.location?.latitude,
                          longitude: cafeDetails?.location?.longitude,
                        }}>
                        <Image
                          source={require('../../assets/images/dropbin.png')}
                          style={AppStyles.pin}
                        />
                      </Marker>
                    </MapView>
                  </TouchableOpacity>
                </Block>
                <Separator backgroundColor={colors.lightGray} />
              </Block>
              {cafeDetails?.allCommnets?.length > 0 ? (
                <Block>
                  <Block marginLeft={16}>
                    <IconLabel
                      icon={{
                        type: IconTypes.fontAwesome,
                        name: 'star',
                        color: colors.star,
                        size: 16,
                      }}
                      text={`${cafeDetails.ratings.totalRate} (${
                        cafeDetails.allCommnets.length
                      } ${t('evaluation')})`}
                    />
                  </Block>

                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginLeft: 16, marginRight: 16 }}
                    data={cafeDetails.allCommnets}
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
                    title={`${cafeDetails.allCommnets.length} ${t('see_all')}`}
                    size={12}
                    onPress={() => {
                      navigation.navigate(routes.REVIEWS, {
                        commentsList: cafeDetails.allCommnets,
                        reviewData: cafeDetails.ratings.ratings,
                        moduleId: cafeDetails.moduleId,
                        id: cafeDetails.id,
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
                          moduleId: cafeDetails.moduleId,
                          id: cafeDetails.id,
                        });
                      }
                    }}
                  />
                </Block>
              )}
              <Block margin={16}>
                <Separator backgroundColor={colors.lightGray} marginBottom />
                {cafeDetails.campaign && cafeDetails?.campaign.length && (
                  <DetailItem
                    text={t('campaigns')}
                    subtext={cafeDetails.campaign[0]}
                    onPress={() => {
                      navigation.navigate(routes.CAMPAIGN, {
                        list: cafeDetails.campaign,
                      });
                    }}
                    marginBottom={20}
                  />
                )}
                <DetailItem
                  text={t('working_time')}
                  subtext={
                    cafeDetails.workingHours[0].title +
                    ' - ' +
                    cafeDetails.workingHours[0].subtitle
                  }
                  onPress={() => {
                    navigation.navigate(routes.WORKING_TIME_SCREEN, {
                      list: cafeDetails.workingHours,
                    });
                  }}
                  marginBottom={20}
                />
                {cafeDetails.faqs && (
                  <DetailItem
                    text={t('faq')}
                    subtext={cafeDetails.faqs[0].question}
                    onPress={() => {
                      navigation.navigate(routes.FREQUENTLY_ASKED_QUESTIONS, {
                        list: cafeDetails.faqs,
                      });
                    }}
                    marginBottom={20}
                  />
                )}
              </Block>
            </Block>
          </Block>
          <Block
            margin
            style={[
              { position: 'absolute', bottom: 0, right: 0, left: 0 },
              AppStyles.shadow,
            ]}
            color={'transparent'}
            row
            padding
            center>
            <Block>
              {!userIsBusiness && cafeDetails.reservationCheck && (
                <AppButton
                  title={t('create_reservation')}
                  marginTop={10}
                  onPress={() => {
                    if (userIsVisitor) {
                      navigation.navigate(routes.LOGIN_STACK, {
                        screen: routes.SING_IN,
                      });
                    } else {
                      setReservationMessageVisible(!reservationMessageVisible);
                    }
                  }}
                  padding={16}
                  backgroundColor={colors.secondary}
                />
              )}
              <AddNotePopup
                isVisible={myNoteVisible}
                hideModal={() => setMyNoteVisible(false)}
                onYes={() => {
                  navigation.navigate(routes.ADD_MEMORY_SCREEN, {
                    moduleId: cafeDetails.moduleId,
                    id: cafeDetails.id,
                  });
                }}
              />
            </Block>
          </Block>
          <MessagePopup
            isVisible={messagePopupVisible.isVisible}
            title={messagePopupVisible.title}
            subTitle={messagePopupVisible.subTitle}
            hideModal={() => {
              setMessagePopupVisible({ isVisible: false });
            }}
          />
          <ReservationPopup
            isVisible={reservationMessageVisible}
            hideModal={() =>
              setReservationMessageVisible(!reservationMessageVisible)
            }
            onYes={() => {
              navigation.navigate(routes.RESTAURANT_REZ_SCREEN, {
                cafe: cafeDetails,
              });
            }}
            onNo={() => {
              setRedirectMessageVisible(!redirectMessageVisible);
            }}
          />
          <RedirectPopUp
            isVisible={redirectMessageVisible}
            hideModal={() => setRedirectMessageVisible(!redirectMessageVisible)}
            onYes={() => {
              Linking.openURL(cafeDetails?.reservationUrl);
            }}
            onNo={() => {}}
          />
        </Block>
      )}
      <LoadingIndicator
        visible={
          getCafeDetailsApi.loading ||
          addCafeToFavoriteApi.loading ||
          deleteCafeFromFavoriteApi.loading
        }
      />
    </Block>
  );
};

export default RestaurantDetailsScreen;

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
