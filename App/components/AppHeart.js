import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text, Icon } from './AppTheme';
import { IconTypes } from './AppTheme/Icon';
import colors from '../config/colors';
import IconWithClick from './IconWithClick';

const AppHeart = ({
  isFavorite = false,
  isMemoryBook = false,
  time,
  style,
}) => {
  const [showTimeInfo, setShowTimeInfo] = useState(false);

  return (
    <Block marginRight={4} center style={styles.block}>
      <Block
        color={colors.white}
        width={30}
        radius={15}
        padding={4}
        shadow
        center
        marginTop
        marginBottom>
        <IconWithClick
          type={IconTypes.antdesign}
          name={isFavorite ? 'heart' : 'hearto'}
          color={isFavorite ? 'red' : 'black'}
          size={20}
        />
      </Block>

      {isMemoryBook && (
        <Block
          color={colors.secondary}
          width={30}
          radius={15}
          padding={4}
          shadow
          center
          marginBottom>
          <IconWithClick
            type={IconTypes.feather}
            name={'book'}
            color={'white'}
            size={20}
          />
        </Block>
      )}
      {time ? (
        <Block style={styles.timeIcon}>
          <Block shadow noflex center radius={15} white row>
            {showTimeInfo && (
              <Text size={14} margin>
                {time}
              </Text>
            )}
            <Block
              color={colors.white}
              width={30}
              radius={15}
              padding={4}
              shadow
              center
              noflex>
              <IconWithClick
                type={IconTypes.material}
                name={'access-time'}
                color={colors.black}
                size={20}
                onPress={() => {
                  setShowTimeInfo(!showTimeInfo);
                }}
              />
            </Block>
          </Block>
        </Block>
      ) : null}
    </Block>
  );
};

export default AppHeart;

const styles = StyleSheet.create({
  block: { position: 'absolute', right: 0, alignItems: 'flex-end' },
});
