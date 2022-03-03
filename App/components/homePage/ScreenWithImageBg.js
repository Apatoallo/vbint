import React, { useRef, useState, useEffect } from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import Block from '../AppTheme/Block';
import Icon, { IconTypes } from '../AppTheme/Icon';
import colors from '../../config/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppLinearGradient from '../AppLinearGradient';
import { useAuthReducer } from '../../reducers/authReducer';
import AppImage from '../AppImage';

const ScreenWithImageBg = ({
  fullPage = false,
  showHeader = false,
  openNavigation,
  onPressPersonImage,
  ...props
}) => {
  const { userData, userIsBusiness, userIsVisitor } = useAuthReducer();

  const [headerShown, setHeaderShown] = useState(false);
  const [yOffset, setYOffset] = useState(new Animated.Value(0));
  const headerOpacity = yOffset.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    yOffset.addListener((value) => {
      if (value.value >= 100) {
        setHeaderShown(true);
      } else {
        setHeaderShown(false);
      }
    });

    return () => {
      yOffset.removeAllListeners();
    };
  }, []);

  return (
    <Block white>
      <Animated.View
        style={{
          backgroundColor: "'white'",
          ...StyleSheet.absoluteFillObject,
          opacity: headerOpacity,
        }}>
        <ImageBackground
          style={fullPage ? styles.bgFull : styles.bg}
          source={require('../../assets/header_bg.png')}>
          <AppLinearGradient color={'#001B4E'} isFromTop />
        </ImageBackground>
      </Animated.View>
      {showHeader && (
        <Block row center space={'around'} padding={16}>
          <TouchableOpacity onPress={openNavigation}>
            {!userIsBusiness && (
              <Icon
                type={IconTypes.fontAwesome}
                name="bars"
                size={24}
                color={headerShown ? colors.black : colors.white}
              />
            )}
          </TouchableOpacity>
          <Block paddingLeft paddingRight>
            <Image
              style={styles.logo}
              source={
                headerShown
                  ? require('../../assets/images/logo_colors.png')
                  : require('../../assets/images/logo.png')
              }
            />
          </Block>
          <TouchableOpacity onPress={onPressPersonImage}>
            {userData?.image ? (
              <AppImage url={userData?.image} style={styles.userImage} />
            ) : (
              <Icon
                name={'user-circle-o'}
                type={IconTypes.fontAwesome}
                size={24}
                color={headerShown ? colors.black : colors.white}
              />
            )}
          </TouchableOpacity>
        </Block>
      )}
      <Animated.ScrollView
        contentContainerStyle={{
          paddingTop: 0,
          paddingBottom: Dimensions.get('window').height * 0.1 + 24,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: yOffset,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
        {...props}
        scrollEventThrottle={16}>
        <Block>{props.children}</Block>
      </Animated.ScrollView>
    </Block>
  );
};

export default ScreenWithImageBg;

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    position: 'absolute',
  },
  bgFull: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
    position: 'absolute',
  },
  logo: {
    resizeMode: 'contain',
    width: '100%',
  },
  userImage: { height: 25, width: 25, borderRadius: 15 },
});
