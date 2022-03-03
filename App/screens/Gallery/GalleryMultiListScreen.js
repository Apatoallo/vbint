import React, { useLayoutEffect, useEffect, useState } from 'react';
import { Block, Text } from '../../components/AppTheme';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import routes from '../../navigation/routes';
import GalleryVerticalList from '../../components/gallery/GalleryVerticalList';
import gallery from '../../api/gallery';
import useApi from '../../hooks/useApi';
import AppAlert from '../../utils/AppAlert';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useTranslation } from 'react-i18next';

const GalleryMultiListScreen = ({ navigation }) => {
  const { t } = useTranslation();
  // useApi
  const galleryListAPI = useApi(gallery.getGalleryList);
  const [galleryList, setGalleryList] = useState(null);

  useEffect(() => {
    getGalleryList();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'center',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
      headerTitle: (props) => (
        <Text bold numberOfLines={1}>
          {t('gallery')}
        </Text>
      ),
    });
  }, [navigation]);

  const getGalleryList = async () => {
    const result = await galleryListAPI.request();
    if (result.ok) {
      setGalleryList(result.data.data.list);
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          getGalleryList();
        },
        okText: t('try_again'),
      });
    }
  };

  return (
    <Block white>
      <Block scroll>
        {galleryList &&
          galleryList.map((galleryItem, galleryIndex) => {
            return (
              <GalleryVerticalList
                title={galleryItem.title}
                data={galleryItem.images}
                onSeeAllPress={() => {
                  navigation.navigate(routes.GALLERY_DETAILS_SCREEN, {
                    detailData: galleryItem.images,
                  });
                }}
                onPress={({ item, index }) => {
                  navigation.navigate(routes.GALLERY_DETAILS_SCREEN, {
                    detailData: galleryItem.images,
                    initialIndex: index,
                  });
                }}
              />
            );
          })}
      </Block>
      <LoadingIndicator visible={galleryListAPI.loading} />
    </Block>
  );
};

export default GalleryMultiListScreen;
