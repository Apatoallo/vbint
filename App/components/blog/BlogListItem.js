import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text } from '../AppTheme/index';
import ImageList from '../ImageList';
import AppHeart from '../AppHeart';
import StarRating from '../StarRating';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';
import Separator from '../Separator';
import { useAuthReducer } from '../../reducers/authReducer';

const BlogListItem = ({
  onPress,
  imageList,
  title,
  description,
  isFavorite,
  isMemoryBook,
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
            <ImageList
              data={imageList}
              imageStyle={styles.image}
              onPress={onPress}
            />
            {!userIsBusiness && (
              <AppHeart isFavorite={isFavorite} isMemoryBook={isMemoryBook} />
            )}
          </Block>
          <TouchableOpacity onPress={onPress}>
            <Block>
              <Block padding>
                <Block>
                  <Text medium size={22}>
                    {title}
                  </Text>
                </Block>
              </Block>
              <Separator backgroundColor={colors.lightGray} />
              <Block flex={1}>
                <Text
                  numberOfLines={4}
                  padding
                  style={styles.description}
                  color={colors.hotelCardGrey}>
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

export default BlogListItem;

const styles = StyleSheet.create({
  description: { height: 100 },
});
