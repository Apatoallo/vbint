import React from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Linking,
} from 'react-native';
import { Block, Text } from '../AppTheme';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';
import IconContainer from '../../components/IconContainer';
import AppImage from '../AppImage';
import AppLinearGradient from '../AppLinearGradient';

const GalleryVerticalListItem = ({
  onPress,
  title,
  image,
  description,
  url,
}) => {
  const headerIcons = [
    {
      icon: {
        name: 'share',
        type: 'simpleLineIcon',
      },
      onPress: () => {
        Linking.openURL(url);
      },
    },
  ];

  return (
    <TouchableHighlight underlayColor="none" onPress={onPress}>
      <Block shadow>
        <Block
          flex={0}
          width={Dimensions.get('screen').width * 0.6}
          shadow
          style={AppStyles.overflow}
          radius={10}
          marginRight={16}>
          <Block flex={0}>
            <AppImage style={styles.image} url={image} />
            <AppLinearGradient color={colors.black} />
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
            <Text padding size={18} medium white style={styles.title}>
              {title}
            </Text>
          </Block>
          <Block flex={0} white>
            <Text numberOfLines={4} padding color={colors.semiBlack}>
              {description}
            </Text>
          </Block>
        </Block>
      </Block>
    </TouchableHighlight>
  );
};

export default GalleryVerticalListItem;

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('screen').width * 0.6,
    height: 150,
    resizeMode: 'cover',
  },
  title: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  ratting: {
    alignSelf: 'flex-end',
  },
  headerIconsContainer: {
    position: 'absolute',
    top: 4,
    right: 0,
  },
  rightIcon: {
    marginBottom: 10,
  },
});
