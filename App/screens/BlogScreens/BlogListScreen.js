import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import routes from '../../navigation/routes';
import colors from '../../config/colors';
import VerticalSeparator from '../../components/VerticalSeparator';
import blogs from '../../api/blogs';
import AppAlert from '../../utils/AppAlert';
import useApi from '../../hooks/useApi';
import AppButton from '../../components/AppButton';
import IconWithClick from '../../components/IconWithClick';
import { IconTypes } from '../../components/AppTheme/Icon';
import BlogListItem from '../../components/blog/BlogListItem';
import { useTranslation } from 'react-i18next';

const BlogListScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [blogListData, setBlogListData] = useState({});
  const [blogList, setBlogList] = useState([]);
  const getBlogsListApi = useApi(blogs.getBlogs);
  const [query, setQuery] = useState({
    page: 1,
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'left',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,

      headerTitle: (props) => (
        <Block>
          <TextInput
            style={styles.input}
            onChangeText={(txt) => {
              setQuery({ ...query, searchText: txt, page: 1 });
              if (txt.length > 1) {
                setQuery({ ...query, searchText: txt, page: 1 });
                setBlogList([]);
                getBlogsList({ ...query, searchText: txt, page: 1 });
              } else if (txt.length === 0) {
                getBlogsList({ ...query, page: 1 });
              }
            }}
            value={query?.searchText}
            placeholder={t('what_are_you_looking_for')}
          />
        </Block>
      ),
      headerRight: () => (
        <Block center row marginRight>
          <VerticalSeparator backgroundColor={colors.lightGray} />
          <IconWithClick
            name={'filter'}
            type={IconTypes.antdesign}
            size={20}
            color={colors.semiBlack}
            marginRight
            marginLeft
            onPress={() => {
              navigation.navigate(routes.FILTERS_SCREEN, {
                filters: blogListData.filters,
                onReturn: (selectedFilters) => {
                  setQuery({
                    ...query,
                    page: 1,
                    ...selectedFilters,
                  });
                  setBlogList([]);
                  getBlogsList({
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
  }, [blogListData.filters, navigation, , query]);

  const getBlogsList = async (q) => {
    const result = await getBlogsListApi.request({
      ...q,
    });

    if (result.ok) {
      setBlogListData(result.data.data);
      setBlogList((list) => {
        return [...list, ...result.data.data.list];
      });
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          setQuery({ page: 1 });
          setBlogList({ page: 1 });
        },
        okText: t('try_again'),
      });
    }
  };
  useEffect(() => {
    getBlogsList(query);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <BlogListItem
        title={item.title}
        description={item.description}
        imageList={item.images}
        isFavorite={item.isFavorite}
        isMemoryBook={item.isMemoryBook}
        onPress={() => {
          navigation.navigate(routes.BLOG_DETAILS_SCREEN, {
            id: item.id,
          });
        }}
      />
    );
  };

  return (
    <Block white>
      <Block>
        <FlatList
          data={blogList}
          renderItem={renderItem}
          keyExtractor={(item) => item.index}
          contentContainerStyle={{ paddingBottom: 70 }}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={() => {
            return (
              <Block>
                {getBlogsListApi.loading ? (
                  <ActivityIndicator
                    size="large"
                    color={colors.primary}
                    style={{ marginLeft: 6 }}
                  />
                ) : null}
              </Block>
            );
          }}
          ListEmptyComponent={() =>
            !getBlogsListApi.loading ? (
              <Block center>
                <Text bold marginTop>
                  {t('no_result')}
                </Text>
                <Block>
                  <AppButton
                    marginTop
                    textColor={colors.primary}
                    textOnly
                    title={t('clear_filters')}
                    onPress={() => {
                      setQuery({ page: 1 });
                      getBlogsList({ page: 1 });
                    }}
                  />
                </Block>
              </Block>
            ) : null
          }
        />
      </Block>
    </Block>
  );
};

export default BlogListScreen;

const styles = StyleSheet.create({});
