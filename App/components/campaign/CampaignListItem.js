import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Block, Text } from '../AppTheme';
import { IconTypes } from '../AppTheme/Icon';
import Separator from '../Separator';
import IconContainer from '../IconContainer';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';
import CampaignAvailableItem from '../CampaignAvailableItem';
import AppHeart from '../AppHeart';
import { useAuthReducer } from '../../reducers/authReducer';

const CampaignListItem = ({
  onPress,
  image,
  title,
  address,
  campaignTitle,
  description,
  marginBottom,
  isCampaign,
  isFavorite,
  isMemoryBook,
}) => {
  const [showTimeInfo, setShowTimeInfo] = useState(false);
  const timeIcon = {
    type: IconTypes.material,
    name: 'access-time',
    size: 25,
    color: colors.black,
  };
  const heartIcon = {
    type: IconTypes.antdesign,
    name: 'hearto',
    color: colors.black,
    size: 20,
  };
  const starIcon = {
    name: 'staro',
    type: IconTypes.antdesign,
    size: 23,
    color: colors.black,
  };
  const { userIsBusiness } = useAuthReducer();

  return (
    <Block style={[styles.container, { marginBottom: marginBottom }]}>
      <Block noflex>
        <TouchableOpacity onPress={onPress}>
          <Block noflex marginBottom>
            <ImageBackground
              source={{ uri: image }}
              resizeMode="stretch"
              borderTopLeftRadius={10}
              borderTopRightRadius={10}
              style={styles.image}>
              <Block padding>
                <CampaignAvailableItem campaignAvailable={isCampaign} />
                {!userIsBusiness && (
                  <AppHeart
                    isFavorite={isFavorite}
                    isMemoryBook={isMemoryBook}
                  />
                )}
                {/*<IconContainer
                  icon={heartIcon}
                  style={styles.heartIcon}
                  onPress={() => {}}
                />
                 {time ? (
                  <Block noflex style={styles.timeIcon} row>
                    <Block
                      noflex
                      row
                      center
                      borderRadius={18}
                      white
                      style={{ alignItems: 'flex-end' }}>
                      {showTimeInfo ? (
                        <Text marginBottom marginRight marginLeft>
                          {time}
                        </Text>
                      ) : null}
                      <IconContainer
                        icon={timeIcon}
                        onPress={() => {
                          setShowTimeInfo(!showTimeInfo);
                        }}
                      />
                    </Block>
                  </Block>
                ) : null}
                <IconContainer
                  icon={starIcon}
                  style={styles.starIcon}
                  onPress={() => {}}
                /> */}
                <Block bottom>
                  <Text medium white title marginBottom={5}>
                    {title}
                  </Text>
                  <Text white>{address}</Text>
                </Block>
              </Block>
            </ImageBackground>
            <Text
              numberOfLines={2}
              marginBottom={5}
              medium
              marginHorizontal
              size={17}
              style={styles.campaignTitle}>
              {campaignTitle}
            </Text>
          </Block>

          <Separator backgroundColor={colors.lightGray} />
          <Text numberOfLines={4} margin color={colors.hotelCardGrey}>
            {description}
          </Text>
        </TouchableOpacity>
      </Block>
    </Block>
  );
};

export default CampaignListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    ...AppStyles.shadow,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  heartIcon: {
    alignSelf: 'flex-end',
  },
  timeIcon: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  starIcon: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  campaignTitle: {
    textDecorationLine: 'underline',
  },
});
