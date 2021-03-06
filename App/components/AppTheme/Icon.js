import React from 'react';
import PropTypes from 'prop-types';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
export const IconTypes = {
  zocial: 'zocial',
  octicon: 'octicon',
  material: 'material',
  materialCommunity: 'materialCommunity',
  ionicon: 'ionicon',
  foundation: 'foundation',
  evilicon: 'evilicon',
  entypo: 'entypo',
  fontAwesome: 'fontAwesome',
  fontAwesome5: 'fontAwesome5',
  simpleLineIcon: 'simpleLineIcon',
  feather: 'feather',
  antdesign: 'antdesign',
  fontisto: 'fontisto',
};
const getIconType = (type) => {
  switch (type) {
    case 'zocial':
      return ZocialIcon;
    case 'octicon':
      return OcticonIcon;
    case 'material':
      return MaterialIcon;
    case 'materialCommunity':
      return MaterialCommunityIcon;
    case 'ionicon':
      return Ionicon;
    case 'foundation':
      return FoundationIcon;
    case 'evilicon':
      return EvilIcon;
    case 'entypo':
      return EntypoIcon;
    case 'fontAwesome':
      return FAIcon;
    case 'fontAwesome5':
      return FA5Icon;
    case 'simpleLineIcon':
      return SimpleLineIcon;
    case 'feather':
      return FeatherIcon;
    case 'antdesign':
      return AntIcon;
    case 'fontisto':
      return FontistoIcon;
    default:
      return FontistoIcon;
  }
};
export const Icon = ({ type = 'fontAwesome', ...rest }) => {
  const IconComponent = getIconType(type);
  return <IconComponent {...rest} />;
};

Icon.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Icon.defaultProps = {
  style: {},
};
export default Icon;
