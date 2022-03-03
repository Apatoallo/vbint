import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Dimensions, FlatList, Linking } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import colors from '../../config/colors';
import IconContainer from '../../components/IconContainer';
import AppButton from '../../components/AppButton';
import Separator from '../../components/Separator';
import routes from '../../navigation/routes';
import { IconTypes } from '../../components/AppTheme/Icon';
import CommentCard from '../../components/CommentCard';
import IconLabel from '../../components/IconLabel';
import blogs from '../../api/blogs';
import useApi from '../../hooks/useApi';
import LoadingIndicator from '../../components/LoadingIndicator';
import favorites from '../../api/favorites';
import AddNotePopup from '../../components/myNotebook/AddNotePopup';
import MessagePopup from '../../components/MessagePopup';
import ImageList from '../../components/ImageList';
import { useTranslation } from 'react-i18next';
import { useAuthReducer } from '../../reducers/authReducer';

const BlogDetailScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  // redux
  const { userIsBusiness, userIsVisitor } = useAuthReducer();
  // useApi
  const getBlogDetailsApi = useApi(blogs.getBlogDetails);
  const [blogDetails, setBlogDetails] = useState(null);
  const [myNoteVisible, setMyNoteVisible] = useState(false);
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  const addBlogToFavoriteApi = useApi(favorites.addToFavorite);
  const deleteBlogFromFavoriteApi = useApi(favorites.deleteFromFavorite);

  const getBlogDetails = async () => {
    const result = await getBlogDetailsApi.request(route?.params?.id);

    if (result.ok) {
      setBlogDetails(result.data.data);
    } else {
    }
  };
  const addBlogToFavorite = async () => {
    const result = await addBlogToFavoriteApi.request(
      blogDetails.moduleId,
      blogDetails.id,
    );
    if (result.ok) {
      setBlogDetails({ ...blogDetails, isFavorite: !blogDetails.isFavorite });
      setMessagePopupVisible({
        isVisible: true,
        title: t('successful'),
        subTitle: result.data.message,
      });
    } else {
    }
  };
  const deleteBlogFromFavorite = async () => {
    const result = await deleteBlogFromFavoriteApi.request(
      blogDetails.moduleId,
      blogDetails.id,
    );
    if (result.ok) {
      setBlogDetails({ ...blogDetails, isFavorite: !blogDetails.isFavorite });
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
    getBlogDetails();
  }, []);

  const headerIcons = userIsBusiness
    ? [
        {
          icon: {
            name: 'share',
            type: 'simpleLineIcon',
          },
          onPress: () => Linking.openURL(blogDetails?.url),
        },
      ]
    : [
        {
          icon: {
            name: blogDetails?.isFavorite ? 'heart' : 'hearto',
            type: 'antdesign',
            color: blogDetails?.isFavorite ? 'red' : 'black',
          },
          onPress: () => {
            if (userIsVisitor) {
              navigation.navigate(routes.LOGIN_STACK, {
                screen: routes.SING_IN,
              });
            } else {
              blogDetails?.isFavorite
                ? deleteBlogFromFavorite()
                : addBlogToFavorite();
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
          onPress: () => Linking.openURL(blogDetails?.url),
        },
      ];

  return (
    <Block white>
      {blogDetails && (
        <Block
          scroll
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          <Block shadow flex={0}>
            <ImageList
              data={blogDetails?.images}
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
                    {blogDetails?.title}
                  </Text>
                </Block>
                <Text size={20} bold marginBottom>
                  {blogDetails?.title}
                </Text>
                <Block row center marginBottom>
                  <Text medium>{blogDetails?.address}</Text>
                </Block>

                <Separator
                  backgroundColor={colors.lightGray}
                  marginBottom={16}
                />
                <Text
                  numberOfLines={4}
                  marginBottom
                  medium
                  color={colors.hotelCardGrey}>
                  {blogDetails?.description}
                </Text>
                <AppButton
                  title={t('show_more')}
                  onPress={() => {
                    navigation.navigate(routes.ABOUT, {
                      title: blogDetails.title,
                      subTitle: blogDetails.description,
                    });
                  }}
                  size={12}
                  textOnly
                  underlined
                  textColor={colors.underlinedText}
                  marginBottom={20}
                />
              </Block>

              <Separator backgroundColor={colors.lightGray} />
            </Block>
            {blogDetails.allComments.length > 0 ? (
              <Block>
                <Block marginLeft={16}>
                  <IconLabel
                    icon={{
                      type: IconTypes.fontAwesome,
                      name: 'star',
                      color: colors.star,
                      size: 16,
                    }}
                    text={`(${blogDetails.allComments.length} ${t(
                      'evaluation',
                    )})`}
                  />
                </Block>

                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
                  data={blogDetails.allComments}
                  renderItem={(item) => {
                    return (
                      <CommentCard
                        username={item.username}
                        date={item.date}
                        comment={item.comment}
                      />
                    );
                  }}
                  keyExtractor={(item) => item.index}
                />
                <AppButton
                  title={`${blogDetails.allComments.length} ${t('see_all')}`}
                  size={12}
                  onPress={() => {
                    navigation.navigate(routes.REVIEWS, {
                      commentsList: blogDetails.allComments,
                      reviewData: blogDetails.ratings.ratings,
                      moduleId: blogDetails.moduleId,
                      id: blogDetails.id,
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
                        moduleId: blogDetails.moduleId,
                        id: blogDetails.id,
                        showRating: false,
                      });
                    }
                  }}
                />
              </Block>
            )}
          </Block>
          <AddNotePopup
            isVisible={myNoteVisible}
            hideModal={() => setMyNoteVisible(false)}
            onYes={() => {
              navigation.navigate(routes.ADD_MEMORY_SCREEN, {
                moduleId: blogDetails.moduleId,
                id: blogDetails.id,
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
      )}
      <LoadingIndicator
        visible={
          getBlogDetailsApi.loading ||
          addBlogToFavoriteApi.loading ||
          deleteBlogFromFavoriteApi.loading
        }
      />
    </Block>
  );
};

export default BlogDetailScreen;

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
