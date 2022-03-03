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
import transfers from '../../api/transfers';
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

const TransferListingScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  // redux
  const { userIsBusiness, userIsVisitor } = useAuthReducer();
  // useState
  const [reservationMessageVisible, setReservationMessageVisible] =
    useState(false);
  const [myNoteVisible, setMyNoteVisible] = useState(false);
  const [transferDetails, setTransferDetails] = useState(null);
  const [redirectMessageVisible, setRedirectMessageVisible] = useState(false);
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  const [messageChecked, setMessageChecked] = useState(false);
  const getTransferDetailsApi = useApi(transfers.getTransfersDetails);
  const addTransferToFavoriteApi = useApi(favorites.addToFavorite);
  const deleteTransferFromFavoriteApi = useApi(favorites.deleteFromFavorite);
  const recordCallApi = useApi(call.recordCall);

  const getTransferDetails = async () => {
    const result = await getTransferDetailsApi.request(route?.params?.id);

    if (result.ok) {
      setTransferDetails(result.data.data);
    } else {
    }
  };
  const addTransferToFavorite = async () => {
    const result = await addTransferToFavoriteApi.request(
      transferDetails.moduleId,
      transferDetails.id,
    );
    if (result.ok) {
      setTransferDetails({
        ...transferDetails,
        isFavorite: !transferDetails.isFavorite,
      });
      setMessagePopupVisible({
        isVisible: true,
        title: t('successful'),
        subTitle: result.data.message,
      });
    } else {
    }
  };
  const deleteTransferFromFavorite = async () => {
    const result = await deleteTransferFromFavoriteApi.request(
      transferDetails.moduleId,
      transferDetails.id,
    );
    if (result.ok) {
      setTransferDetails({
        ...transferDetails,
        isFavorite: !transferDetails.isFavorite,
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

  useEffect(() => {
    getTransferDetails();
  }, []);

  const headerIcons = userIsBusiness
    ? [
        {
          icon: {
            name: 'share',
            type: 'simpleLineIcon',
          },
          onPress: () => Linking.openURL(transferDetails?.url),
        },
      ]
    : [
        {
          icon: {
            name: transferDetails?.isFavorite ? 'heart' : 'hearto',
            type: 'antdesign',
            color: transferDetails?.isFavorite ? 'red' : 'black',
          },
          onPress: () => {
            if (userIsVisitor) {
              navigation.navigate(routes.LOGIN_STACK, {
                screen: routes.SING_IN,
              });
            } else {
              transferDetails?.isFavorite
                ? deleteTransferFromFavorite()
                : addTransferToFavorite();
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
          onPress: () => Linking.openURL(transferDetails?.url),
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
      {transferDetails && (
        <Block>
          <Block
            scroll
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            <Block shadow flex={0}>
              <ImageList
                data={transferDetails?.images}
                imageStyle={{ height: Dimensions.get('screen').height * 0.4 }}
                onPress={() => {
                  navigation.navigate(routes.FULL_SCREEN_IMAGE_SLIDER, {
                    images: transferDetails?.images,
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
              <Block padding={[8, 16, 0, 16]}>
                <Block marginBottom={16}>
                  <Text size={20} bold marginBottom marginTop>
                    {transferDetails?.title}
                  </Text>
                  <Block row center marginBottom>
                    <Text medium>{transferDetails?.address}</Text>
                  </Block>
                  <TotalRatingItem
                    rating={transferDetails?.rating?.totalRate}
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
                    {transferDetails?.description}
                  </Text>
                  <AppButton
                    title={t('show_more')}
                    onPress={() => {
                      navigation.navigate(routes.ABOUT, {
                        title: transferDetails.title,
                        subTitle: transferDetails.description,
                      });
                    }}
                    size={12}
                    textOnly
                    underlined
                    textColor={colors.underlinedText}
                    marginBottom={20}
                  />
                  {transferDetails.getCall && (
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
                          phone: transferDetails.phone,
                          dataID: transferDetails.id,
                          moduleID: transferDetails.moduleId,
                        });
                      }}
                      marginBottom={16}
                    />
                  )}
                  <Separator backgroundColor={colors.lightGray} />
                  <Block marginTop={16}>
                    <Text bold size={20} marginBottom>
                      {t('capacity')}
                    </Text>
                    <Block>
                      <Block>
                        <Text>
                          <Text bold>{t('passenger_count')} </Text>{' '}
                          {transferDetails?.maxPerson}
                        </Text>
                        <Text marginTop={4}>
                          <Text bold>{t('luggage_capacity')}</Text>{' '}
                          {transferDetails?.baggageLimit}
                        </Text>
                      </Block>
                    </Block>
                  </Block>
                </Block>
                <Separator backgroundColor={colors.lightGray} />

                <Block marginBottom={16} marginTop>
                  {transferDetails?.properties && (
                    <Block noflex>
                      <Text bold size={20} marginBottom>
                        {t('possibilities')}
                      </Text>
                      <Block marginTop row marginBottom={16}>
                        {transferDetails?.properties
                          ?.slice(0, 5)
                          .map((item, index) => {
                            return (
                              <PossibilityIcon
                                url={item.icon}
                                title={item.title}
                              />
                            );
                          })}
                      </Block>
                    </Block>
                  )}
                  <Text bold size={20} marginBottom marginTop>
                    {t('services')}
                  </Text>
                  {transferDetails?.includedServices
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
                        services: transferDetails?.includedServices,
                        possibilities: transferDetails?.properties,
                      });
                    }}
                    textOnly
                    underlined
                    textColor={colors.underlinedText}
                    marginBottom={16}
                  />
                  <Separator backgroundColor={colors.lightGray} />
                </Block>
              </Block>
              {transferDetails?.allCommnets?.length > 0 ? (
                <Block>
                  <Block marginLeft={16}>
                    <IconLabel
                      icon={{
                        type: IconTypes.fontAwesome,
                        name: 'star',
                        color: colors.star,
                        size: 16,
                      }}
                      text={`${transferDetails?.rating?.totalRate} (${
                        transferDetails.allCommnets.length
                      } ${t('evaluation')})`}
                    />
                  </Block>

                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginLeft: 16, marginRight: 16 }}
                    data={transferDetails.allCommnets}
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
                    title={`${transferDetails.allCommnets.length} ${t(
                      'see_all',
                    )}`}
                    size={12}
                    onPress={() => {
                      navigation.navigate(routes.REVIEWS, {
                        commentsList: transferDetails.allCommnets,
                        reviewData: transferDetails.rating.ratings,
                        moduleId: transferDetails.moduleId,
                        id: transferDetails.id,
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
                          moduleId: transferDetails.moduleId,
                          id: transferDetails.id,
                        });
                      }
                    }}
                  />
                </Block>
              )}
              <Block margin={16}>
                <Separator backgroundColor={colors.lightGray} marginBottom />
                {transferDetails.campaign && transferDetails?.campaign.length && (
                  <DetailItem
                    text={t('campaigns')}
                    subtext={transferDetails.campaign[0]}
                    onPress={() => {
                      navigation.navigate(routes.CAMPAIGN, {
                        list: transferDetails.campaign,
                      });
                    }}
                    marginBottom={20}
                  />
                )}
                {transferDetails.excludedServices && (
                  <DetailItem
                    text={t('paid_services')}
                    subtext={transferDetails?.excludedServices[0]}
                    onPress={() => {
                      navigation.navigate(routes.SERVICES_AND_POSSIBILITES, {
                        services: transferDetails?.excludedServices,
                      });
                    }}
                    marginBottom={20}
                  />
                )}
                {transferDetails.faqs && (
                  <DetailItem
                    text={t('faq')}
                    subtext={transferDetails?.faqs[0].question}
                    onPress={() => {
                      navigation.navigate(routes.FREQUENTLY_ASKED_QUESTIONS, {
                        list: transferDetails.faqs,
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
                {transferDetails.reservationCheck && !userIsBusiness && (
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
                )}
              </Block>
              <AddNotePopup
                isVisible={myNoteVisible}
                hideModal={() => setMyNoteVisible(false)}
                onYes={() => {
                  navigation.navigate(routes.ADD_MEMORY_SCREEN, {
                    moduleId: transferDetails.moduleId,
                    id: transferDetails.id,
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
              navigation.navigate(routes.TRANSFER_REZ_SCREEN, {
                transfer: transferDetails,
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
              Linking.openURL(transferDetails?.reservationUrl);
            }}
            onNo={() => {}}
          />
        </Block>
      )}
      <LoadingIndicator
        visible={
          getTransferDetailsApi.loading ||
          addTransferToFavoriteApi.loading ||
          deleteTransferFromFavoriteApi.loading
        }
      />
    </Block>
  );
};

export default TransferListingScreen;

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
