import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Block, Text, Icon } from '../components/AppTheme';
import { IconTypes } from '../components/AppTheme/Icon';
import colors from '../config/colors';
import { useTranslation } from 'react-i18next';

const WorkingTimeScreen = ({ route }) => {
  const { t } = useTranslation();
  return (
    <Block white>
      <Text bold size={20} margin>
        {t('working_time')}
      </Text>
      <Block>
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={styles.navigationList}
          data={route.params.list}
          renderItem={({ item }) => (
            <Block row space={'between'} margin={[8, 16, 8, 16]}>
              <Block center row>
                <Icon
                  type={IconTypes.ionicon}
                  name={'time-outline'}
                  color={colors.semiBlack}
                  size={24}
                />
                <Text marginLeft color={colors.semiBlack}>
                  {item.title}
                </Text>
              </Block>
              <Block flex={0}>
                <Text> {item.subtitle}</Text>
              </Block>
            </Block>
          )}
          keyExtractor={(item) => item.index}
        />
      </Block>
    </Block>
  );
};

export default WorkingTimeScreen;

const styles = StyleSheet.create({});
