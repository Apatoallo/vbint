import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Block, Text, Button, Icon } from '../components/AppTheme';
import { IconTypes } from '../components/AppTheme/Icon';
import colors from '../config/colors';

const LoginScreen = () => {
  return (
    <Block padding black>
      <ImageBackground
        style={styles.bg}
        source={require('../assets/bg_image.png')}>
        <Block>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
          <Block black margin padding borderRadius={16}>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                margin: 8,
                borderWidth: 1,
                borderColor: 'black',
              }}>
              <Block margin noflex center middle>
                <Block row center>
                  <Icon
                    type={IconTypes.antdesign}
                    name="hearto"
                    color="black"
                    size={24}
                  />
                  <Text black paddingLeft>
                    Facebook
                  </Text>
                </Block>
              </Block>
            </TouchableOpacity>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  bg: { width: '100%', height: '100%', resizeMode: 'cover' },
  logo: { width: '100%', height: 50, margin: 20 },
});
