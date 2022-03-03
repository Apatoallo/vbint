import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Block, Text } from '../AppTheme/index';
import ImageList from '../ImageList';
import AppHeart from '../AppHeart';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';
import Separator from '../Separator';
import { useAuthReducer } from '../../reducers/authReducer';

const PlacesListItem = ({
  title,
  description,
  onPress,
  imageList,
  isFavorite,
}) => {
  const { userIsBusiness } = useAuthReducer();
  return (
    <Block shadow>
      <Block
        radius={8}
        shadow
        white
        margin={[12, 24, 12, 24]}
        style={AppStyles.overflow}>
        <Block>
          <Block>
            <ImageList data={imageList} onPress={onPress} />
            {!userIsBusiness && <AppHeart active isFavorite={isFavorite} />}
          </Block>
          <TouchableOpacity onPress={onPress}>
            <Block white style={AppStyles.overflow}>
              <Block padding>
                <Block>
                  <Text medium size={24}>
                    {title}
                  </Text>
                </Block>
              </Block>
              <Separator backgroundColor={colors.lightGray} />
              <Block>
                <Text numberOfLines={5} padding color={colors.hotelCardGrey}>
                  {description}
                </Text>
              </Block>
            </Block>
          </TouchableOpacity>
        </Block>
      </Block>
    </Block>
  );
};

export default PlacesListItem;
