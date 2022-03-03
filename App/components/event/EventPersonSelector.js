import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Icon, Text } from '../AppTheme/index';
import { IconTypes } from '../AppTheme/Icon';
import PersonCountSelector from '../PersonCountSelector';
import AppButton from '../AppButton';
import routes from '../../navigation/routes';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

const EventPersonSelector = ({ hideModal, title, navigation, isVisible }) => {
  const { t } = useTranslation();
  const [adultsCount, setAdultsCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);

  return (
    <Modal
      isVisible={isVisible}
      style={{ margin: 0 }}
      onBackdropPress={hideModal}
      onRequestClose={hideModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      propagateSwipe>
      <Block flex={0} style={styles.block}>
        <Text white size={24} bold marginBottom marginLeft={20}>
          {title}
        </Text>
        <Block
          white
          space={'between'}
          paddingVertical
          style={styles.contentContainer}>
          <Block row>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                hideModal();
              }}>
              <Icon
                type={IconTypes.fontAwesome}
                name={'angle-left'}
                color="gray"
                size={30}
              />
            </TouchableOpacity>
            <Block middle marginBottom={15}>
              <Text center size={18} marginBottom={5} bold>
                {'Büyük Ev Ablukada'}
              </Text>
              <Text center size={14} gray>
                {'2 yetişkin, 1 Öğrenci'}
              </Text>
            </Block>
          </Block>

          <PersonCountSelector
            title={t('adults')}
            subTitle={'Yetişkin ücreti: 80 TL'}
            name={t('adult')}
            updateCount={(count) => {
              setAdultsCount(count);
            }}
            marginBottom={10}
          />
          <PersonCountSelector
            title={t('students')}
            subTitle={'Öğrenci ücreti: 50 TL'}
            name={t('student')}
            updateCount={(count) => {
              setStudentsCount(count);
            }}
          />
          <Block row center space={'between'} margin={16}>
            <Block row center>
              <Block>
                <Text color="black" bold marginBottom={5}>
                  {'1200 TL'}
                </Text>
                <Text color="black">{t('total_fee')}</Text>
              </Block>
              <AppButton
                disabled={adultsCount > 0 || studentsCount > 0 ? false : true}
                title={t('go_on')}
                onPress={() => {
                  hideModal();
                  navigation.navigate(routes.EVENT_TICKET, {
                    adultsCount: adultsCount,
                    studentsCount: studentsCount,
                  });
                }}
                style={styles.continueButton}
              />
            </Block>
          </Block>
        </Block>
      </Block>
    </Modal>
  );
};

export default EventPersonSelector;

const styles = StyleSheet.create({
  continueButton: {
    flex: 1,
  },
  block: {
    height: '75%',
    marginTop: 'auto',
  },
  contentContainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 20,
  },
  backButton: {
    marginLeft: 16,
  },
});
