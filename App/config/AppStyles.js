import { StyleSheet } from 'react-native';
import colors from '../config/colors';

export default StyleSheet.create({
  hyperLink: {
    color: colors.secondary,
    textDecorationLine: 'underline',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: 'black',
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconRight: {
    paddingRight: 10,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
  },
  textShadow: {
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.20)',
    textShadowOffset: { width: -0.5, height: 0.5 },
    textShadowRadius: 10,
  },
  title: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
  },
  headerWithoutShadow: {
    backgroundColor: colors.white,
    shadowOpacity: 0,
    shadowRadius: null,
    elevation: 0,
  },
  header: {
    backgroundColor: colors.white,
  },
  overflow: { overflow: 'hidden' },
  absolute: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  pin: { height: 30, width: 30 },
});
