import React from 'react';
import { Input } from 'native-base';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon, { IconTypes } from './AppTheme/Icon';
import { Text } from './AppTheme';
import { useTranslation } from 'react-i18next';

const Header = ({ navigation, input, back = true, rightButton }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      {back ? (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            type={IconTypes.fontAwesome}
            name={'angle-left'}
            color={'gray'}
            size={35}
          />
        </TouchableOpacity>
      ) : null}
      <View style={styles.centerContainer}></View>
      {input ? <Input placeholder={t('what_are_you_looking_for')} /> : null}
      {rightButton ? (
        <TouchableOpacity
          onPress={rightButton.onPress}
          style={rightButton.style}>
          {rightButton.text ? (
            <Text
              style={[
                {
                  color: rightButton.color ? rightButton.color : 'gray',
                },
                rightButton.underline && {
                  textDecorationLine: 'underline',
                  textDecorationColor: rightButton.color
                    ? rightButton.color
                    : 'gray',
                },
              ]}>
              {rightButton.text}
            </Text>
          ) : (
            <Icon {...rightButton.icon} />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  centerContainer: {
    flex: 1,
  },
});
