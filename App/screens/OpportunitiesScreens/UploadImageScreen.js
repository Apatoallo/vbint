import React from 'react';
import { StyleSheet } from 'react-native';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import { IconTypes } from '../../components/AppTheme/Icon';
import { Block, Text } from '../../components/AppTheme';
import { FlatList } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import ImagSelectItem from '../../components/opportunities/ImagSelectItem';
import Separator from '../../components/Separator';
import { useTranslation } from 'react-i18next';

const UploadImageScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const list = [
    {
      index: 1,
      title: t('take_photo'),
      iconName: 'camera',
      iconType: IconTypes.feather,
      onPress: () => {
        ImagePicker.openCamera({
          mediaType: 'photo',
          cropping: true,
          multiple: false,
          maxFiles: 1,
        }).then((image) => {
          route.params.onReturn(image);
          navigation.goBack();
        });
      },
    },
    {
      index: 2,
      title: t('from_gallery'),
      iconName: 'md-images-outline',
      iconType: IconTypes.ionicon,
      onPress: () => {
        ImagePicker.openPicker({
          mediaType: 'photo',
          cropping: true,
          multiple: false,
          maxFiles: 1,
        }).then(async (image) => {
          route.params.onReturn(image);
          navigation.goBack();
        });
      },
    },
  ];
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'center',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
      headerTitle: (props) => (
        <Text bold numberOfLines={1}>
          {t('upload_photo')}
        </Text>
      ),
    });
  }, [navigation]);
  return (
    <Block white>
      <Block margin={[0, 16, 0, 16]}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={list}
          renderItem={({ item }) => (
            <ImagSelectItem
              title={item.title}
              iconName={item.iconName}
              iconType={item.iconType}
              onPress={item.onPress}
            />
          )}
          keyExtractor={(item) => item.index}
          ItemSeparatorComponent={Separator}
        />
      </Block>
    </Block>
  );
};

export default UploadImageScreen;

const styles = StyleSheet.create({});
