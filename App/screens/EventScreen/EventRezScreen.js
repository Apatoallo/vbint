import React, { useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Block, Text } from '../../components/AppTheme/index';
import AppButton from '../../components/AppButton';
import PersonCountSelector from '../../components/PersonCountSelector';
import colors from '../../config/colors';
import routes from '../../navigation/routes';
import BlockSelector from '../../components/event/BlockSelector';
import { useTranslation } from 'react-i18next';

const EventRezScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  // variables
  const { event } = route.params;
  // useState
  const [adultsCount, setAdultsCount] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState({
    ...event.blockPrice[0],
    title: 'Bölüm ' + event.blockPrice[0].blockName,
  });
  const [studentCount, setStudentCount] = useState(null);

  return (
    <Block
      paddingHorizontal={16}
      white
      scroll
      contentContainerStyle={styles.contentContainer}>
      <Text notera marginLeft color={colors.lightGray} size={45}>
        {event.title}
      </Text>
      <Text bold title marginBottom={25}>
        {event.title}
      </Text>
      <Block>
        <Block flex={0} marginTop>
          <BlockSelector
            title={t('block')}
            onSelect={(item) => {
              setSelectedBlock(item);
              console.log(item);
            }}
            list={event.blockPrice}
            marginBottom={16}
          />
          <PersonCountSelector
            titleSize={16}
            marginHorizontal={0}
            title={t('adults')}
            subTitle={`${t('adult_price')} ${
              selectedBlock ? selectedBlock.adult : event.blockPrice[0].adult
            } TL`}
            name={t('adult')}
            updateCount={(count) => {
              setAdultsCount(count);
            }}
          />
          <Block marginTop={16}>
            <PersonCountSelector
              titleSize={16}
              marginHorizontal={0}
              title={t('students')}
              subTitle={`${t('adult_price')} ${
                selectedBlock
                  ? selectedBlock.student
                  : event.blockPrice[0].student
              } TL`}
              name={t('student')}
              updateCount={(count) => {
                setStudentCount(count);
              }}
            />
          </Block>
        </Block>
      </Block>

      <Block flex={0}>
        <AppButton
          title={t('go_on')}
          onPress={() => {
            navigation.navigate(routes.EVENT_TICKET, {
              adultsCount: adultsCount,
              studentCount: studentCount,
              event: event,
              selectedBlock: selectedBlock,
              totalAmount:
                studentCount * event.blockPrice[0].student +
                adultsCount * event.blockPrice[0].adult,
            });
          }}
          style={styles.continueButton}
          disabled={adultsCount && selectedBlock ? false : true}
        />
      </Block>
    </Block>
  );
};

export default EventRezScreen;

const styles = StyleSheet.create({
  block: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    backgroundColor: ' rgba(52, 52, 52, 0.5)',
  },

  contentContainer: {
    flexGrow: 1,
    paddingBottom: Platform.OS === 'android' ? 16 : 0,
  },
});
