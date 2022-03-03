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
import CommentCard from '../../components/CommentCard';
import IconLabel from '../../components/IconLabel';
import DetailItem from '../../components/DetailItem';
import ShareTool from '../../utils/ShareTool';
import AddNotePopup from '../../components/myNotebook/AddNotePopup';
import hotels from '../../api/hotels';
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
import RoomListItem from '../../components/hotelSearch/RoomListItem';
import { useAuthReducer } from '../../reducers/authReducer';
import call from '../../api/call';
import MapHelper from '../../utils/MapHelper';
import { useTranslation } from 'react-i18next';

const HotelDetailsScreen = ({ navigation, route }) => {
  const { t } = useTranslation();

  // redux
  const { userIsBusiness, userIsVisitor, userData } = useAuthReducer();
  // useState
  const [reservationMessageVisible, setReservationMessageVisible] =
    useState(false);
  const [myNoteVisible, setMyNoteVisible] = useState(false);
  const [hotelDetails, setHotelDetails] = useState(null);
  const [redirectMessageVisible, setRedirectMessageVisible] = useState(false);
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  const [messageChecked, setMessageChecked] = useState(false);
  // useApi
  const getHotelDetailsApi = useApi(hotels.getHotelDetails);
  const addHotelToFavoriteApi = useApi(favorites.addToFavorite);
  const deleteHotelFromFavoriteApi = useApi(favorites.deleteFromFavorite);
  const recordCallApi = useApi(call.recordCall);
  // variables
  const headerIcons = userIsBusiness
    ? [
        {
          icon: {
            name: 'share',
            type: 'simpleLineIcon',
          },
          onPress: () => Linking.openURL(hotelDetails?.url),
        },
      ]
    : [
        {
          icon: {
            name: hotelDetails?.isFavorite ? 'heart' : 'hearto',
            type: 'antdesign',
            color: hotelDetails?.isFavorite ? 'red' : 'black',
          },
          onPress: () => {
            if (userIsVisitor) {
              navigation.navigate(routes.LOGIN_STACK, {
                screen: routes.SING_IN,
              });
            } else {
              hotelDetails?.isFavorite
                ? deleteHotelFromFavorite()
                : addHotelToFavorite();
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
          onPress: () => Linking.openURL(hotelDetails?.url),
        },
      ];

  useEffect(() => {
    getHotelDetails();
  }, []);

  const getHotelDetails = async () => {
    const result = await getHotelDetailsApi.request(route?.params?.id);

    if (result.ok) {
      setHotelDetails(result.data.data);
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          navigation.goBack();
        },
      });
    }
  };
  const addHotelToFavorite = async () => {
    const result = await addHotelToFavoriteApi.request(
      hotelDetails.moduleId,
      hotelDetails.id,
    );
    if (result.ok) {
      setHotelDetails({
        ...hotelDetails,
        isFavorite: !hotelDetails.isFavorite,
      });
      setMessagePopupVisible({
        isVisible: true,
        title: t('successful'),
        subTitle: result.data.message,
      });
    } else {
    }
  };
  const deleteHotelFromFavorite = async () => {
    const result = await deleteHotelFromFavoriteApi.request(
      hotelDetails.moduleId,
      hotelDetails.id,
    );
    if (result.ok) {
      setHotelDetails({
        ...hotelDetails,
        isFavorite: !hotelDetails.isFavorite,
      });
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

  const callNumber = async ({ moduleID, dataID, number }) => {
    ShareTool.callNumber(number);
    await recordCallApi.request({
      moduleId: moduleID,
      dataId: dataID,
    });
  };

  return (
    <Block white>
      {hotelDetails && (
        <Block>
          <Block
            scroll
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            <Block shadow flex={0}>
              <ImageList
                data={hotelDetails?.images}
                imageStyle={{ height: Dimensions.get('screen').height * 0.4 }}
                onPress={() => {
                  navigation.navigate(routes.FULL_SCREEN_IMAGE_SLIDER, {
                    images: hotelDetails?.images,
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
                      {hotelDetails?.title}
                    </Text>
                  </Block>
                  <Text size={20} bold marginBottom>
                    {hotelDetails?.title}
                  </Text>
                  <Block row center marginBottom>
                    <Text medium>{hotelDetails?.address}</Text>
                    <Block>
                      <AppButton
                        onPress={() => {
                          navigation.navigate(routes.FULL_SCREEN_MAP, {
                            latitude: hotelDetails?.location?.latitude,
                            longitude: hotelDetails?.location?.longitude,
                            latitudeDelta:
                              hotelDetails?.location?.latitudeDelta,
                            longitudeDelta:
                              hotelDetails?.location?.longitudeDelta,
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
                  <TotalRatingItem rating={hotelDetails?.ratings?.totalRate} />

                  <Separator
                    backgroundColor={colors.lightGray}
                    marginBottom={16}
                  />
                  <Text
                    numberOfLines={4}
                    marginBottom
                    medium
                    color={colors.hotelCardGrey}>
                    {hotelDetails?.description}
                  </Text>
                  <AppButton
                    title={t('show_more')}
                    onPress={() => {
                      navigation.navigate(routes.ABOUT, {
                        title: hotelDetails.title,
                        subTitle: hotelDetails.description,
                      });
                    }}
                    size={12}
                    textOnly
                    underlined
                    textColor={colors.underlinedText}
                    marginBottom={20}
                  />
                  {hotelDetails?.getCall && (
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
                          phone: hotelDetails.phone,
                          dataID: hotelDetails.id,
                          moduleID: hotelDetails.moduleId,
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
                    {hotelDetails?.properties
                      ?.slice(0, 5)
                      .map((item, index) => {
                        return (
                          <PossibilityIcon url={item.icon} title={item.title} />
                        );
                      })}
                  </Block>
                  {hotelDetails.services && (
                    <Block marginTop>
                      {hotelDetails?.services
                        ?.slice(0, 2)
                        ?.map((item, index) => {
                          return (
                            <Block>
                              <Block row marginBottom>
                                <Text marginBottom gray bold>
                                  {index + 1 + '. '}
                                </Text>
                                <Text style={styles.serviceItemText}>
                                  {item}
                                </Text>
                              </Block>
                            </Block>
                          );
                        })}
                    </Block>
                  )}
                  <AppButton
                    marginTop
                    title={t('show_more')}
                    size={12}
                    onPress={() => {
                      navigation.navigate(routes.SERVICES_AND_POSSIBILITES, {
                        services: hotelDetails?.services,
                        possibilities: hotelDetails?.properties,
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
                      {t('rooms')}
                    </Text>
                  </Block>
                  {hotelDetails?.rooms?.slice(0, 2).map((item, index) => {
                    return <RoomListItem item={item} marginBottom />;
                  })}

                  <AppButton
                    title={t('show_more')}
                    size={12}
                    textColor={colors.secondary}
                    onPress={() => {
                      navigation.navigate(routes.HOTEL_ROOMS_LIST, {
                        list: hotelDetails?.rooms,
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
                  <Text marginBottom>{hotelDetails?.address}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      MapHelper.openMap({
                        latitude: hotelDetails.location.latitude,
                        longitude: hotelDetails.location.longitude,
                        address: hotelDetails.address,
                      });
                    }}>
                    <MapView
                      provider={PROVIDER_GOOGLE}
                      pitchEnabled={false}
                      zoomEnabled={false}
                      zoomTapEnabled={false}
                      scrollEnabled={false}
                      initialRegion={{
                        latitude: hotelDetails?.location?.latitude,
                        longitude: hotelDetails?.location?.longitude,
                        latitudeDelta: hotelDetails?.location?.latitudeDelta,
                        longitudeDelta: hotelDetails?.location?.longitudeDelta,
                      }}
                      onPress={() => {
                        MapHelper.openMap({
                          latitude: hotelDetails.location.latitude,
                          longitude: hotelDetails.location.longitude,
                          address: hotelDetails.address,
                        });
                      }}
                      style={styles.map}>
                      <Marker
                        coordinate={{
                          latitude: hotelDetails?.location?.latitude,
                          longitude: hotelDetails?.location?.longitude,
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
              {hotelDetails?.allComments?.length > 0 ? (
                <Block>
                  <Block marginLeft={16}>
                    <IconLabel
                      icon={{
                        type: IconTypes.fontAwesome,
                        name: 'star',
                        color: colors.star,
                        size: 16,
                      }}
                      text={`${hotelDetails.ratings.totalRate} (${
                        hotelDetails.allComments.length
                      } ${t('evaluation')})`}
                    />
                  </Block>

                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginLeft: 16, marginRight: 16 }}
                    data={hotelDetails.allComments}
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
                    title={`${hotelDetails.allComments.length} ${t('see_all')}`}
                    size={12}
                    onPress={() => {
                      navigation.navigate(routes.REVIEWS, {
                        commentsList: hotelDetails.allComments,
                        reviewData: hotelDetails.ratings.ratings,
                        moduleId: hotelDetails.moduleId,
                        id: hotelDetails.id,
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
                          moduleId: hotelDetails.moduleId,
                          id: hotelDetails.id,
                        });
                      }
                    }}
                  />
                </Block>
              )}
              <Block margin={16}>
                <Separator backgroundColor={colors.lightGray} marginBottom />
                {hotelDetails?.campaign && hotelDetails?.campaign.length && (
                  <DetailItem
                    text={t('campaigns')}
                    subtext={hotelDetails?.campaign[0]}
                    onPress={() => {
                      navigation.navigate(routes.CAMPAIGN, {
                        list: hotelDetails.campaign,
                      });
                    }}
                    marginBottom={20}
                  />
                )}

                {hotelDetails.faqs && (
                  <DetailItem
                    text={t('faq')}
                    subtext={hotelDetails.faqs[0].question}
                    onPress={() => {
                      navigation.navigate(routes.FREQUENTLY_ASKED_QUESTIONS, {
                        list: hotelDetails.faqs,
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
              {hotelDetails.reservationCheck && !userIsBusiness && (
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
                    moduleId: hotelDetails.moduleId,
                    id: hotelDetails.id,
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
              navigation.navigate(routes.HOTEL_REZ_SCREEN, {
                hotel: hotelDetails,
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
              Linking.openURL(hotelDetails?.reservationUrl);
            }}
            onNo={() => {}}
          />
        </Block>
      )}
      <LoadingIndicator
        visible={
          getHotelDetailsApi.loading ||
          addHotelToFavoriteApi.loading ||
          deleteHotelFromFavoriteApi.loading
        }
      />
    </Block>
  );
};

export default HotelDetailsScreen;

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
