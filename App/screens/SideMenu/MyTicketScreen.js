import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import { Block, Text } from '../../components/AppTheme';
import ListsItems from '../../config/ListsItems';
import Separator from '../../components/Separator';
import colors from '../../config/colors';
import IconWithClick from '../../components/IconWithClick';
import { IconTypes } from '../../components/AppTheme/Icon';
import routes from '../../navigation/routes';
import TicketListItem from '../../components/ticket/TicketListItem';
import { useTranslation } from 'react-i18next';

const MyTicketScreen = ({ navigation }) => {
  const { t } = useTranslation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'center',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
      headerTitle: (props) => (
        <Text bold numberOfLines={1} size={18}>
          {t('my_ticket')}
        </Text>
      ),
      headerRight: () => (
        <Block center row marginRight>
          <IconWithClick
            name={'filter'}
            type={IconTypes.antdesign}
            size={20}
            color={colors.black}
            marginRight
            marginLeft
            onPress={() =>
              navigation.navigate(routes.HOTEL_STACK, {
                screen: routes.HOTEL_FILTERS_SCREEN,
              })
            }
          />
        </Block>
      ),
    });
  }, [navigation]);
  return (
    <Block white>
      <Text margin marginLeft={16} color={colors.hotelCardLightGrey}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius.
      </Text>
      <Text bold margin marginLeft={16}>
        {t('all')}
      </Text>
      <Block>
        <FlatList
          data={ListsItems.mainPage}
          contentContainerStyle={{ padding: 8 }}
          renderItem={(item) => (
            <TicketListItem active={item.index % 2 ? true : false} />
          )}
          keyExtractor={(item) => item.index}
          ItemSeparatorComponent={() => (
            <Separator backgroundColor={colors.lightGray} marginBottom />
          )}
        />
      </Block>
    </Block>
  );
};

export default MyTicketScreen;

const styles = StyleSheet.create({});
