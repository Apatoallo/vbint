import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Dimensions, FlatList, Linking } from 'react-native';
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
import boats from '../../api/boats';
import useApi from '../../hooks/useApi';
import LoadingIndicator from '../../components/LoadingIndicator';
import ImageList from '../../components/ImageList';
import TotalRatingItem from '../../components/TotalRatingItem';
import MessagePopup from '../../components/MessagePopup';
import favorites from '../../api/favorites';
import ReservationPopup from '../../components/ReservationPopup';
import RedirectPopUp from '../../components/RedirectPopUp';
import AppAlert from '../../utils/AppAlert';
import TourRotaListItem from '../../components/tour/TourRotaListItem';
import constants from '../../config/constants';
import PossibilityIcon from '../../components/PossibilityIcon';
import { useAuthReducer } from '../../reducers/authReducer';
import call from '../../api/call';
import { useTranslation } from 'react-i18next';
import MapHelper from '../../utils/MapHelper';

const YachtBoatDetailScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  // redux
  const { userIsBusiness, userIsVisitor } = useAuthReducer();
  // useState

  const [myNoteVisible, setMyNoteVisible] = useState(false);
  const [boatDetails, setBoatDetails] = useState(null);
  const [redirectMessageVisible, setRedirectMessageVisible] = useState(false);
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  const [messageChecked, setMessageChecked] = useState(false);
  const getBoatDetailsApi = useApi(boats.getBoatDetails);
  const addBoatToFavoriteApi = useApi(favorites.addToFavorite);
  const deleteBoatFromFavoriteApi = useApi(favorites.deleteFromFavorite);
  const recordCallApi = useApi(call.recordCall);
  const [reservationMessageVisible, setReservationMessageVisible] =
    useState(false);
  const getBoatDetails = async () => {
    const result = await getBoatDetailsApi.request(route?.params?.id);
    if (result.ok) {
      setBoatDetails(result.data.data);
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          navigation.goBack();
        },
      });
    }
  };
  const addBoatToFavorite = async () => {
    const result = await addBoatToFavoriteApi.request(
      boatDetails.moduleId,
      boatDetails.id,
    );
    if (result.ok) {
      setBoatDetails({ ...boatDetails, isFavorite: !boatDetails.isFavorite });
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
  const deleteBoatFromFavorite = async () => {
    const result = await deleteBoatFromFavoriteApi.request(
      boatDetails.moduleId,
      boatDetails.id,
    );
    if (result.ok) {
      setBoatDetails({ ...boatDetails, isFavorite: !boatDetails.isFavorite });
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
    getBoatDetails();
  }, []);

  const headerIcons = userIsBusiness
    ? [
        {
          icon: {
            name: 'share',
            type: 'simpleLineIcon',
          },
          onPress: () => Linking.openURL(boatDetails?.url),
        },
      ]
    : [
        {
          icon: {
            name: boatDetails?.isFavorite ? 'heart' : 'hearto',
            type: 'antdesign',
            color: boatDetails?.isFavorite ? 'red' : 'black',
          },
          onPress: () => {
            if (userIsVisitor) {
              navigation.navigate(routes.LOGIN_STACK, {
                screen: routes.SING_IN,
              });
            } else {
              boatDetails?.isFavorite
                ? deleteBoatFromFavorite()
                : addBoatToFavorite();
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
          onPress: () => Linking.openURL(boatDetails?.url),
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
      {boatDetails && (
        <Block>
          <Block
            scroll
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            <Block shadow flex={0}>
              <ImageList
                data={boatDetails?.images}
                imageStyle={{ height: Dimensions.get('screen').height * 0.4 }}
                onPress={() => {
                  navigation.navigate(routes.FULL_SCREEN_IMAGE_SLIDER, {
                    images: boatDetails?.images,
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
                      {boatDetails?.title}
                    </Text>
                  </Block>
                  <Text size={20} bold marginBottom>
                    {boatDetails?.title}
                  </Text>
                  <Block row center marginBottom>
                    <Text medium>{boatDetails?.address}</Text>
                  </Block>
                  <TotalRatingItem rating={boatDetails?.rating?.totalRate} />

                  <Separator
                    backgroundColor={colors.lightGray}
                    marginBottom={16}
                  />
                  <Text
                    numberOfLines={4}
                    marginBottom
                    medium
                    color={colors.hotelCardGrey}>
                    {boatDetails?.description}
                  </Text>
                  <AppButton
                    title={t('show_more')}
                    onPress={() => {
                      navigation.navigate(routes.ABOUT, {
                        title: boatDetails.title,
                        subTitle: boatDetails.description,
                      });
                    }}
                    size={12}
                    textOnly
                    underlined
                    textColor={colors.underlinedText}
                    marginBottom={20}
                  />
                  {boatDetails.getCall && (
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
                          phone: boatDetails.phone,
                          dataID: boatDetails.id,
                          moduleID: boatDetails.moduleId,
                        });
                      }}
                      marginBottom={16}
                    />
                  )}
                  <Separator backgroundColor={colors.lightGray} />
                  <Block marginTop={16}>
                    <Text bold size={20} marginBottom>
                      {t('features')}
                    </Text>
                    <Block row>
                      <Block>
                        <Text>
                          <Text bold>{t('boat_type:')}</Text>{' '}
                          {boatDetails.boatType}
                        </Text>
                        <Text marginTop={4}>
                          <Text bold>{t('cabin_count')}</Text>{' '}
                          {boatDetails.numberOfCabins}
                        </Text>
                      </Block>
                      <Block center>
                        <Text>
                          <Text bold>{t('length')}</Text>{' '}
                          {boatDetails.boatLenght}
                        </Text>
                        <Text marginTop={4}>
                          <Text bold>{t('capacity')}</Text>{' '}
                          {boatDetails.capacity} {t('person')}
                        </Text>
                      </Block>
                    </Block>
                  </Block>
                </Block>
                <Separator backgroundColor={colors.lightGray} />

                <Block marginBottom={16} marginTop>
                  <Text bold size={20} marginBottom>
                    {t('possibilities')}
                  </Text>
                  <Block marginTop row marginBottom={16}>
                    {boatDetails?.properties?.slice(0, 5).map((item, index) => {
                      return (
                        <PossibilityIcon url={item.icon} title={item.title} />
                      );
                    })}
                  </Block>
                  <Text bold size={20} marginBottom marginTop>
                    {t('services')}
                  </Text>
                  {boatDetails?.includedServices
                    ?.slice(0, 2)
                    .map((item, index) => {
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
                    title={t('show_more')}
                    size={12}
                    onPress={() => {
                      navigation.navigate(routes.SERVICES_AND_POSSIBILITES, {
                        services: boatDetails?.includedServices,
                        possibilities: boatDetails?.properties,
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
                    <Block marginBottom row center>
                      <Text bold size={20} marginRight>
                        {t('tour_route')}
                      </Text>
                      {boatDetails.tourRoute && (
                        <AppButton
                          title={t('show_map')}
                          onPress={() => {
                            navigation.navigate(routes.MAP, {
                              list: boatDetails.tourRoute,
                            });
                          }}
                          textOnly
                          underlined
                          size={12}
                          marginTop={5}
                          textColor={colors.underlinedText}
                        />
                      )}
                    </Block>
                  </Block>
                  {boatDetails?.tourRoute?.slice(0, 2).map((item, index) => {
                    return (
                      <TourRotaListItem
                        image={item.imageSrc}
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
                      navigation.navigate(routes.TOUR_ROUTE, {
                        list: boatDetails?.tourRoute,
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
                {boatDetails.latitude && (
                  <Block margin marginBottom={20}>
                    <Text bold size={20} marginBottom={5}>
                      {t('location')}
                    </Text>
                    <Text marginBottom>{boatDetails?.address}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        MapHelper.openMap({
                          latitude: boatDetails.latitude,
                          longitude: boatDetails.longitude,
                          address: boatDetails.address,
                        });
                      }}>
                      <MapView
                        provider={PROVIDER_GOOGLE}
                        pitchEnabled={false}
                        zoomEnabled={false}
                        zoomTapEnabled={false}
                        scrollEnabled={false}
                        initialRegion={{
                          latitude: boatDetails?.latitude,
                          longitude: boatDetails?.longitude,
                          latitudeDelta: 0.0122,
                          longitudeDelta: 0.0121,
                        }}
                        onPress={() => {
                          MapHelper.openMap({
                            latitude: boatDetails.latitude,
                            longitude: boatDetails.longitude,
                            address: boatDetails.address,
                          });
                        }}
                        style={styles.map}>
                        <Marker
                          coordinate={{
                            latitude: boatDetails?.latitude,
                            longitude: boatDetails?.longitude,
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
              {boatDetails?.allCommnets?.length > 0 ? (
                <Block>
                  <Block marginLeft={16}>
                    <IconLabel
                      icon={{
                        type: IconTypes.fontAwesome,
                        name: 'star',
                        color: colors.star,
                        size: 16,
                      }}
                      text={`${boatDetails?.rating?.totalRate} (${
                        boatDetails.allCommnets.length
                      } ${t('evaluation')})`}
                    />
                  </Block>

                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginLeft: 16, marginRight: 16 }}
                    data={boatDetails.allCommnets}
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
                    title={`${boatDetails.allCommnets.length} ${t('see_all')}`}
                    size={12}
                    onPress={() => {
                      navigation.navigate(routes.REVIEWS, {
                        commentsList: boatDetails.allCommnets,
                        reviewData: boatDetails.rating.ratings,
                        moduleId: boatDetails.moduleId,
                        id: boatDetails.id,
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
                          moduleId: boatDetails.moduleId,
                          id: boatDetails.id,
                        });
                      }
                    }}
                  />
                </Block>
              )}
              <Block margin={16}>
                <Separator backgroundColor={colors.lightGray} marginBottom />
                {boatDetails.campaign && boatDetails?.campaign.length && (
                  <DetailItem
                    text={t('campaigns')}
                    subtext={boatDetails.campaign[0]}
                    onPress={() => {
                      navigation.navigate(routes.CAMPAIGN, {
                        list: boatDetails.campaign,
                      });
                    }}
                    marginBottom={20}
                  />
                )}
                {boatDetails.excludedServices && (
                  <DetailItem
                    text={t('paid_services')}
                    subtext={boatDetails?.excludedServices[0]}
                    onPress={() => {
                      navigation.navigate(routes.SERVICES_AND_POSSIBILITES, {
                        services: boatDetails?.excludedServices,
                      });
                    }}
                    marginBottom={20}
                  />
                )}
                {boatDetails.faqs && (
                  <DetailItem
                    text={t('faq')}
                    subtext={boatDetails?.faqs[0].question}
                    onPress={() => {
                      navigation.navigate(routes.FREQUENTLY_ASKED_QUESTIONS, {
                        list: boatDetails.faqs,
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
              {!userIsBusiness && boatDetails.reservationCheck && (
                <Block center row>
                  <Block
                    color={colors.secondGray}
                    marginRight
                    shadow
                    radius={8}
                    center>
                    {boatDetails.discountedPrice ? (
                      <Block middle center>
                        <Text bold color={colors.black}>
                          {boatDetails.discountedPrice} {constants.currency}
                        </Text>
                        <Text
                          style={styles.discountedPrice}
                          bold
                          color={colors.blackGrey}
                          size={12}>
                          {boatDetails.price} {constants.currency}
                        </Text>
                      </Block>
                    ) : (
                      <Text center bold color={colors.black}>
                        {boatDetails.price}
                      </Text>
                    )}
                  </Block>
                  <AppButton
                    title={t('create_reservation')}
                    marginTop={10}
                    onPress={() => {
                      if (userIsVisitor) {
                        navigation.navigate(routes.LOGIN_STACK, {
                          screen: routes.SING_IN,
                        });
                      } else {
                        setReservationMessageVisible(
                          !reservationMessageVisible,
                        );
                      }
                    }}
                    padding={16}
                    backgroundColor={colors.secondary}
                  />
                </Block>
              )}
              <AddNotePopup
                isVisible={myNoteVisible}
                hideModal={() => setMyNoteVisible(false)}
                onYes={() => {
                  navigation.navigate(routes.ADD_MEMORY_SCREEN, {
                    moduleId: boatDetails.moduleId,
                    id: boatDetails.id,
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
              navigation.navigate(routes.RESERVATION_REQUEST, {
                boat: boatDetails,
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
              Linking.openURL(boatDetails?.reservationUrl);
            }}
            onNo={() => {}}
          />
        </Block>
      )}
      <LoadingIndicator
        visible={
          getBoatDetailsApi.loading ||
          addBoatToFavoriteApi.loading ||
          deleteBoatFromFavoriteApi.loading
        }
      />
    </Block>
  );
};

export default YachtBoatDetailScreen;

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
  discountedPrice: { textDecorationLine: 'line-through' },
});
