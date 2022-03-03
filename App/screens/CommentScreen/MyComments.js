import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme/index';
import CommentItem from '../../components/comment/CommentItem';
import routes from '../../navigation/routes';
import useApi from '../../hooks/useApi';
import profile from '../../api/profile';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useTranslation } from 'react-i18next';

const MyComments = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [commentData, setCommentData] = useState([]);
  const getCommentsApi = useApi(profile.getComments);

  const getComments = async () => {
    const result = await getCommentsApi.request();

    if (result.ok) {
      setCommentData(result.data.data);
    } else {
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getComments();
    });

    return unsubscribe;
  }, []);
  const renderCommentItem = ({ item, index }) => {
    return (
      <CommentItem
        title={item.title}
        date={item.date}
        person={item?.userName}
        newCommentCount={item.subCommnets.length}
        comment={item.comment}
        onPressReadComments={() => {
          navigation.navigate(routes.MY_COMMENTS_DETAIL, { data: item });
        }}
      />
    );
  };

  return (
    <Block white>
      <Text paddingHorizontal={16} paddingTop={16} bold size={20}>
        {`${t('my_comment')} ( ${commentData.length} )`}
      </Text>
      <FlatList
        data={commentData}
        renderItem={({ item, index }) => {
          return renderCommentItem({ item, index });
        }}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
      <LoadingIndicator visible={getCommentsApi.loading} />
    </Block>
  );
};

export default MyComments;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
  },
});
