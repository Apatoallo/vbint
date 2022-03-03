import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  Linking,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Block, Text, Icon } from '../../components/AppTheme';
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
import activities from '../../api/activities';
import useApi from '../../hooks/useApi';
import LoadingIndicator from '../../components/LoadingIndicator';
import ImageList from '../../components/ImageList';
import TotalRatingItem from '../../components/TotalRatingItem';
import MessagePopup from '../../components/MessagePopup';
import favorites from '../../api/favorites';
import AppAlert from '../../utils/AppAlert';
import { useAuthReducer } from '../../reducers/authReducer';
import call from '../../api/call';
import { useTranslation } from 'react-i18next';
import MapHelper from '../../utils/MapHelper';

const EventDetail = ({ navigation, route }) => {
  const { t } = useTranslation();
  // redux
  const { userIsBusiness, userIsVisitor } = useAuthReducer();
  // useState
  const [myNoteVisible, setMyNoteVisible] = useState(false);
  const [activityDetails, setActivityDetails] = useState(null);
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  const getActivityDetailsApi = useApi(activities.getActivityDetails);
  const addActivityToFavoriteApi = useApi(favorites.addToFavorite);
  const deleteActivityFromFavoriteApi = useApi(favorites.deleteFromFavorite);
  const recordCallApi = useApi(call.recordCall);
  // variables
  const headerIcons = userIsBusiness
    ? [
        {
          icon: {
            name: 'share',
            type: 'simpleLineIcon',
          },
          onPress: () => Linking.openURL(activityDetails?.url),
        },
      ]
    : [
        {
          icon: {
            name: activityDetails?.isFavorite ? 'heart' : 'hearto',
            type: 'antdesign',
            color: activityDetails?.isFavorite ? 'red' : 'black',
          },
          onPress: () => {
            if (userIsVisitor) {
              navigation.navigate(routes.LOGIN_STACK, {
                screen: routes.SING_IN,
              });
            } else {
              activityDetails?.isFavorite
                ? deleteActivityFromFavorite()
                : addActivityToFavorite();
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
          onPress: () => Linking.openURL(activityDetails?.url),
        },
      ];

  useEffect(() => {
    getActivityDetails();
  }, []);

  const getActivityDetails = async () => {
    const result = await getActivityDetailsApi.request(route?.params?.id);

    if (result.ok) {
      setActivityDetails(result.data.data);
    } else {
    }
  };
  const addActivityToFavorite = async () => {
    const result = await addActivityToFavoriteApi.request(
      activityDetails.moduleId,
      activityDetails.id,
    );
    if (result.ok) {
      setActivityDetails({
        ...activityDetails,
        isFavorite: !activityDetails.isFavorite,
      });
      setMessagePopupVisible({
        isVisible: true,
        title: t('successful'),
        subTitle: result.data.message,
      });
    } else {
    }
  };
  const deleteActivityFromFavorite = async () => {
    const result = await deleteActivityFromFavoriteApi.request(
      activityDetails.moduleId,
      activityDetails.id,
    );
    if (result.ok) {
      setActivityDetails({
        ...activityDetails,
        isFavorite: !activityDetails.isFavorite,
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
      {activityDetails && (
        <Block>
          <Block
            scroll
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            <Block shadow flex={0}>
              <ImageList
                data={activityDetails?.images}
                imageStyle={{ height: Dimensions.get('screen').height * 0.4 }}
                onPress={() => {
                  navigation.navigate(routes.FULL_SCREEN_IMAGE_SLIDER, {
                    images: activityDetails?.images,
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
                      {activityDetails?.title}
                    </Text>
                  </Block>
                  <Text size={20} bold marginBottom>
                    {activityDetails?.title}
                  </Text>
                  <Block row center marginBottom>
                    <Text medium>{activityDetails?.address}</Text>
                  </Block>
                  <TotalRatingItem
                    rating={activityDetails?.rating?.totalRate}
                  />

                  <Separator
                    backgroundColor={colors.lightGray}
                    marginBottom={16}
                  />
                  <Text
                    numberOfLines={4}
                    marginBottom
                    medium
                    color={colors.hotelCardGrey}>
                    {activityDetails?.description}
                  </Text>
                  <AppButton
                    title={t('show_more')}
                    onPress={() => {
                      navigation.navigate(routes.ABOUT, {
                        title: activityDetails.title,
                        subTitle: activityDetails.description,
                      });
                    }}
                    size={12}
                    textOnly
                    underlined
                    textColor={colors.underlinedText}
                    marginBottom={20}
                  />
                  {activityDetails.getCall ? (
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
                          phone: activityDetails.phone,
                          dataID: activityDetails.id,
                          moduleID: activityDetails.moduleId,
                        });
                      }}
                      marginBottom={16}
                    />
                  ) : null}
                  <Separator backgroundColor={colors.lightGray} />
                  <Block marginTop={16}>
                    <Text bold size={20} marginBottom>
                      {t('event_date_time')}
                    </Text>
                    <Block>
                      <Block row center>
                        <Icon
                          name={'calendar-blank-outline'}
                          type={IconTypes.materialCommunity}
                          size={24}
                          color={colors.secondary}
                        />
                        <Text marginLeft>
                          {t('start_date')} {activityDetails.startingDate}
                        </Text>
                      </Block>
                      <Block row center marginTop={4}>
                        <Icon
                          type={IconTypes.ionicon}
                          name={'time-outline'}
                          color={colors.secondary}
                          size={24}
                        />
                        <Text marginLeft>
                          {t('start_time')} {activityDetails.startTime}
                        </Text>
                      </Block>
                    </Block>
                  </Block>
                </Block>
                <Separator backgroundColor={colors.lightGray} />

                <Block marginBottom={16} marginTop>
                  <Text bold size={20} marginBottom marginTop>
                    {t('services')}
                  </Text>
                  {activityDetails?.includedServices
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
                        services: activityDetails?.includedServices,
                        possibilities: activityDetails?.properties,
                      });
                    }}
                    textOnly
                    underlined
                    textColor={colors.underlinedText}
                    marginBottom={16}
                  />
                </Block>

                {activityDetails.latitude && (
                  <Block margin marginBottom={20}>
                    <Text bold size={20} marginBottom={5}>
                      {t('location')}
                    </Text>
                    <Text marginBottom>{activityDetails?.address}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        MapHelper.openMap({
                          latitude: activityDetails.latitude,
                          longitude: activityDetails.longitude,
                          address: activityDetails.address,
                        });
                      }}>
                      <MapView
                        provider={PROVIDER_GOOGLE}
                        pitchEnabled={false}
                        zoomEnabled={false}
                        zoomTapEnabled={false}
                        scrollEnabled={false}
                        onPress={() => {
                          MapHelper.openMap({
                            latitude: activityDetails.latitude,
                            longitude: activityDetails.longitude,
                            address: activityDetails.address,
                          });
                        }}
                        initialRegion={{
                          latitude: activityDetails?.latitude,
                          longitude: activityDetails?.longitude,
                          latitudeDelta: 0.0122,
                          longitudeDelta: 0.0121,
                        }}
                        style={styles.map}>
                        <Marker
                          coordinate={{
                            latitude: activityDetails?.latitude,
                            longitude: activityDetails?.longitude,
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
              {activityDetails?.allCommnets?.length > 0 ? (
                <Block>
                  <Block marginLeft={16}>
                    <IconLabel
                      icon={{
                        type: IconTypes.fontAwesome,
                        name: 'star',
                        color: colors.star,
                        size: 16,
                      }}
                      text={`${activityDetails?.rating?.totalRate} (${
                        activityDetails.allCommnets.length
                      } ${t('evaluation')})`}
                    />
                  </Block>

                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginLeft: 16, marginRight: 16 }}
                    data={activityDetails.allCommnets}
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
                    title={`${activityDetails.allCommnets.length} ${t(
                      'see_all',
                    )}`}
                    size={12}
                    onPress={() => {
                      navigation.navigate(routes.REVIEWS, {
                        commentsList: activityDetails.allCommnets,
                        reviewData: activityDetails.rating.ratings,
                        moduleId: activityDetails.moduleId,
                        id: activityDetails.id,
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
                          moduleId: activityDetails.moduleId,
                          id: activityDetails.id,
                          showRating: false,
                        });
                      }
                    }}
                  />
                </Block>
              )}
              <Block margin={16}>
                <Separator backgroundColor={colors.lightGray} marginBottom />
                {activityDetails.campaign && activityDetails?.campaign.length && (
                  <DetailItem
                    text={t('campaigns')}
                    subtext={activityDetails.campaign[0]}
                    onPress={() => {
                      navigation.navigate(routes.CAMPAIGN, {
                        list: activityDetails.campaign,
                      });
                    }}
                    marginBottom={20}
                  />
                )}
                {activityDetails.excludedServices && (
                  <DetailItem
                    text={t('paid_services')}
                    subtext={activityDetails?.excludedServices[0]}
                    onPress={() => {
                      navigation.navigate(routes.SERVICES_AND_POSSIBILITES, {
                        services: activityDetails?.excludedServices,
                      });
                    }}
                    marginBottom={20}
                  />
                )}
                {activityDetails.faq && activityDetails.faq.length && (
                  <DetailItem
                    text={t('faq')}
                    subtext={activityDetails?.faq[0].question}
                    onPress={() => {
                      navigation.navigate(routes.FREQUENTLY_ASKED_QUESTIONS, {
                        list: activityDetails.faq,
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
              <Block>
                {!userIsBusiness && (
                  <AppButton
                    title={t('buy_ticket')}
                    marginTop={10}
                    onPress={() => {
                      if (userIsVisitor) {
                        navigation.navigate(routes.LOGIN_STACK, {
                          screen: routes.SING_IN,
                        });
                      } else {
                        navigation.navigate(routes.EVENT_REZ_SCREEN, {
                          event: activityDetails,
                        });
                      }
                    }}
                    padding={16}
                    backgroundColor={colors.secondary}
                  />
                )}
              </Block>
              <AddNotePopup
                isVisible={myNoteVisible}
                hideModal={() => setMyNoteVisible(false)}
                onYes={() => {
                  navigation.navigate(routes.ADD_MEMORY_SCREEN, {
                    moduleId: activityDetails.moduleId,
                    id: activityDetails.id,
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
        </Block>
      )}
      <LoadingIndicator
        visible={
          getActivityDetailsApi.loading ||
          addActivityToFavoriteApi.loading ||
          deleteActivityFromFavoriteApi.loading
        }
      />
    </Block>
  );
};

export default EventDetail;

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
