import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, FlatList, Linking } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import colors from '../../config/colors';
import IconContainer from '../../components/IconContainer';
import AppButton from '../../components/AppButton';
import Separator from '../../components/Separator';
import routes from '../../navigation/routes';
import IconLabelButton from '../../components/IconLabelButton';
import { IconTypes } from '../../components/AppTheme/Icon';
import AppStyles from '../../config/AppStyles';
import CommentCard from '../../components/CommentCard';
import IconLabel from '../../components/IconLabel';
import DetailItem from '../../components/DetailItem';
import ShareTool from '../../utils/ShareTool';
import AddNotePopup from '../../components/myNotebook/AddNotePopup';
import tours from '../../api/tours';
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
import { useAuthReducer } from '../../reducers/authReducer';
import call from '../../api/call';
import { useTranslation } from 'react-i18next';

const TourDetailScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  // redux
  const { userIsBusiness, userIsVisitor } = useAuthReducer();
  // useState
  const [reservationMessageVisible, setReservationMessageVisible] =
    useState(false);
  const [myNoteVisible, setMyNoteVisible] = useState(false);
  const [tourDetails, setTourDetails] = useState(null);
  const [redirectMessageVisible, setRedirectMessageVisible] = useState(false);
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  const [messageChecked, setMessageChecked] = useState(false);
  const getTourDetailsApi = useApi(tours.getTourDetails);
  const addTourToFavoriteApi = useApi(favorites.addToFavorite);
  const deleteTourFromFavoriteApi = useApi(favorites.deleteFromFavorite);
  const recordCallApi = useApi(call.recordCall);

  const getTourDetails = async () => {
    const result = await getTourDetailsApi.request(route?.params?.id);

    if (result.ok) {
      setTourDetails(result.data.data);
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          navigation.goBack();
        },
      });
    }
  };
  const addTourToFavorite = async () => {
    const result = await addTourToFavoriteApi.request(
      tourDetails.moduleId,
      tourDetails.id,
    );
    if (result.ok) {
      setTourDetails({ ...tourDetails, isFavorite: !tourDetails.isFavorite });
      setMessagePopupVisible({
        isVisible: true,
        title: t('successful'),
        subTitle: result.data.message,
      });
    } else {
    }
  };
  const deleteTourFromFavorite = async () => {
    const result = await deleteTourFromFavoriteApi.request(
      tourDetails.moduleId,
      tourDetails.id,
    );
    if (result.ok) {
      setTourDetails({ ...tourDetails, isFavorite: !tourDetails.isFavorite });
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
    getTourDetails();
  }, []);

  const headerIcons = userIsBusiness
    ? [
        {
          icon: {
            name: 'share',
            type: 'simpleLineIcon',
          },
          onPress: () => Linking.openURL(tourDetails?.url),
        },
      ]
    : [
        {
          icon: {
            name: tourDetails?.isFavorite ? 'heart' : 'hearto',
            type: 'antdesign',
            color: tourDetails?.isFavorite ? 'red' : 'black',
          },
          onPress: () => {
            if (userIsVisitor) {
              navigation.navigate(routes.LOGIN_STACK, {
                screen: routes.SING_IN,
              });
            } else {
              tourDetails?.isFavorite
                ? deleteTourFromFavorite()
                : addTourToFavorite();
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
          onPress: () => Linking.openURL(tourDetails?.url),
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
      {tourDetails && (
        <Block>
          <Block
            scroll
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            <Block shadow flex={0}>
              <ImageList
                data={tourDetails?.images}
                imageStyle={{ height: Dimensions.get('screen').height * 0.4 }}
                onPress={() => {
                  navigation.navigate(routes.FULL_SCREEN_IMAGE_SLIDER, {
                    images: tourDetails?.images,
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
                      {tourDetails?.title}
                    </Text>
                  </Block>
                  <Text size={20} bold marginBottom>
                    {tourDetails?.title}
                  </Text>
                  <Block row center marginBottom>
                    <Text medium>{tourDetails?.address}</Text>
                    <Block>
                      <AppButton
                        onPress={() => {
                          navigation.navigate(routes.MAP, {
                            list: tourDetails.tourRoute,
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
                  <TotalRatingItem rating={tourDetails?.rating?.totalRate} />

                  <Separator
                    backgroundColor={colors.lightGray}
                    marginBottom={16}
                  />
                  <Text
                    numberOfLines={4}
                    marginBottom
                    medium
                    color={colors.hotelCardGrey}>
                    {tourDetails?.description}
                  </Text>
                  <AppButton
                    title={t('show_more')}
                    onPress={() => {
                      navigation.navigate(routes.ABOUT, {
                        title: tourDetails.title,
                        subTitle: tourDetails.description,
                      });
                    }}
                    size={12}
                    textOnly
                    underlined
                    textColor={colors.underlinedText}
                    marginBottom={20}
                  />
                  {tourDetails.getCall && (
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
                          phone: tourDetails.phone,
                          dataID: tourDetails.id,
                          moduleID: tourDetails.moduleId,
                        });
                      }}
                      marginBottom={16}
                    />
                  )}
                  <Separator backgroundColor={colors.lightGray} />
                </Block>
                <Block marginBottom={16}>
                  <Text bold size={20} marginBottom>
                    {t('services')}
                  </Text>

                  {tourDetails?.includedServices
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
                        services: tourDetails?.includedServices,
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
                      {tourDetails.tourRoute && (
                        <AppButton
                          title={t('show_map')}
                          onPress={() => {
                            navigation.navigate(routes.MAP, {
                              list: tourDetails.tourRoute,
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
                  {tourDetails?.tourRoute?.slice(0, 2).map((item, index) => {
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
                        list: tourDetails?.tourRoute,
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
                {/* {tourDetails.location && (
                  <Block margin marginBottom={20}>
                    <Text bold size={20} marginBottom={5}>
                      Konum
                    </Text>
                    <Text marginBottom>{tourDetails?.address}</Text>

                    <MapView
                      pitchEnabled={false}
                      zoomEnabled={false}
                      zoomTapEnabled={false}
                      scrollEnabled={false}
                      initialRegion={{
                        latitude: tourDetails?.location?.latitude,
                        longitude: tourDetails?.location?.longitude,
                        latitudeDelta: tourDetails?.location?.latitudeDelta,
                        longitudeDelta: tourDetails?.location?.longitudeDelta,
                      }}
                      style={styles.map}>
                      <Marker
                        coordinate={{
                          latitude: tourDetails?.location?.latitude,
                          longitude: tourDetails?.location?.longitude,
                        }}
                        image={require('../../assets/images/dropbin.png')}
                      />
                    </MapView>
                  </Block>
                )} */}
                <Separator backgroundColor={colors.lightGray} />
              </Block>
              {tourDetails?.allCommnets?.length > 0 ? (
                <Block>
                  <Block marginLeft={16}>
                    <IconLabel
                      icon={{
                        type: IconTypes.fontAwesome,
                        name: 'star',
                        color: colors.star,
                        size: 16,
                      }}
                      text={`${tourDetails.ratings.totalRate} (${
                        tourDetails.allCommnets.length
                      } ${t('evaluation')})`}
                    />
                  </Block>

                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginLeft: 16, marginRight: 16 }}
                    data={tourDetails.allCommnets}
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
                    title={`${tourDetails.allCommnets.length} ${t('see_all')}`}
                    size={12}
                    onPress={() => {
                      navigation.navigate(routes.REVIEWS, {
                        commentsList: tourDetails.allCommnets,
                        reviewData: tourDetails.ratings.ratings,
                        moduleId: tourDetails.moduleId,
                        id: tourDetails.id,
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
                          moduleId: tourDetails.moduleId,
                          id: tourDetails.id,
                        });
                      }
                    }}
                  />
                </Block>
              )}
              <Block margin={16}>
                <Separator backgroundColor={colors.lightGray} marginBottom />
                {tourDetails.campaign && tourDetails?.campaign.length && (
                  <DetailItem
                    text={t('campaigns')}
                    subtext={tourDetails.campaign[0]}
                    onPress={() => {
                      navigation.navigate(routes.CAMPAIGN, {
                        list: tourDetails.campaign,
                      });
                    }}
                    marginBottom={20}
                  />
                )}
                {tourDetails.excludedServices && (
                  <DetailItem
                    text={t('paid_services')}
                    subtext={tourDetails?.excludedServices[0]}
                    onPress={() => {
                      navigation.navigate(routes.SERVICES_AND_POSSIBILITES, {
                        services: tourDetails?.excludedServices,
                      });
                    }}
                    marginBottom={20}
                  />
                )}
                {tourDetails.faqs && (
                  <DetailItem
                    text={t('faq')}
                    subtext={tourDetails?.faqs[0].question}
                    onPress={() => {
                      navigation.navigate(routes.FREQUENTLY_ASKED_QUESTIONS, {
                        list: tourDetails.faqs,
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
              {!userIsBusiness && tourDetails.reservationCheck && (
                <Block center row>
                  <Block
                    color={colors.secondGray}
                    marginRight
                    shadow
                    radius={8}
                    center>
                    {tourDetails.discountedPrice ? (
                      <Block middle center>
                        <Text bold color={colors.black}>
                          {tourDetails.discountedPrice} {constants.currency}
                        </Text>
                        <Text
                          style={styles.discountedPrice}
                          bold
                          color={colors.blackGrey}
                          size={12}>
                          {tourDetails.price} {constants.currency}
                        </Text>
                      </Block>
                    ) : (
                      <Text bold color={colors.black}>
                        {tourDetails.price} {constants.currency}
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
                    moduleId: tourDetails.moduleId,
                    id: tourDetails.id,
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
                tour: tourDetails,
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
              Linking.openURL(tourDetails?.reservationUrl);
            }}
            onNo={() => {}}
          />
        </Block>
      )}
      <LoadingIndicator
        visible={
          getTourDetailsApi.loading ||
          addTourToFavoriteApi.loading ||
          deleteTourFromFavoriteApi.loading
        }
      />
    </Block>
  );
};

export default TourDetailScreen;

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
