import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Block, Text } from './AppTheme';
import Separator from './Separator';
import colors from '../config/colors';

const ImageLabelCard = ({
  image,
  text,
  title,
  footerFirstText,
  footerSecondText,
  marginBottom,
}) => {
  return (
    <Block
      paddingRight
      row
      radius={10}
      style={styles.container}
      marginBottom={marginBottom}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <Block marginLeft paddingTop>
        <Text marginBottom={5} medium size={16}>
          {title}
        </Text>
        <Separator backgroundColor={colors.lightGray} marginBottom />
        <Text
          marginBottom
          size={14}
          style={styles.centerText}
          color={colors.activityColor}>
          {text}
        </Text>
        <Separator backgroundColor={colors.lightGray} marginBottom />
        <Block row paddingBottom center>
          <Text style={styles.footerFirstText} color={colors.activityColor}>
            {footerFirstText}
          </Text>
          <Block
            style={styles.line}
            backgroundColor={colors.lightGray}
            noflex
          />
          <Text weight="600" marginLeft>
            {footerSecondText}
          </Text>
        </Block>
      </Block>
    </Block>
  );
};

export default ImageLabelCard;

const styles = StyleSheet.create({
  footerFirstText: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: {
    height: '100%',
    width: '30%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  line: {
    height: 15,
    width: 1.4,
  },
  centerText: {
    flex: 1,
  },
});
