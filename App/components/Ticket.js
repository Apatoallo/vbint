import React from 'react';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import { Block, Text } from './AppTheme';
import colors from '../config/colors';
import IconWithClick from './IconWithClick';
import Separator from './Separator';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';

const Ticket = ({
  hideModal,
  firstRowData,
  secondRowData,
  blockNo,
  operationID,
  totalAmount,
  categoryName,
  title,
}) => {
  const { t } = useTranslation();

  const closeIcon = {
    type: 'materialCommunity',
    name: 'close',
    size: 25,
    color: colors.white,
  };

  const renderVerticalItem = ({ item, index }) => {
    return (
      <Block>
        <Text marginBottom={5} color={colors.ticketInfoTitle} size={13} medium>
          {item.title}
        </Text>
        <Text color={colors.ticketInfoText} bold>
          {item.text}
        </Text>
      </Block>
    );
  };

  return (
    <React.Fragment>
      <Block noflex width={'90%'} style={styles.closeIconContainer}>
        <IconWithClick
          {...closeIcon}
          onPress={() => {
            hideModal();
          }}
          style={styles.closeIcon}
        />
      </Block>
      <Block noflex white radius={10} style={styles.modalContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block noflex padding={15} paddingTop={25}>
            <Block row marginBottom noflex>
              <Text medium style={styles.ticketText}>
                {'BİLETİNİZ'}
              </Text>
              <Text medium style={styles.eventTypeText}>
                {categoryName}
              </Text>
            </Block>
            <Text bold title marginBottom={10} color={colors.ticketInfoText}>
              {title}
            </Text>
            <Separator marginBottom={10} />
            <Block noflex row marginBottom={15}>
              {firstRowData.map((item, index) => {
                return renderVerticalItem({ item, index });
              })}
            </Block>
            <Block noflex row marginBottom={15}>
              {secondRowData.map((item, index) => {
                return renderVerticalItem({ item, index });
              })}
            </Block>
            <Block noflex row center marginBottom={5}>
              {blockNo
                ? renderVerticalItem({
                    item: { title: t('block'), text: blockNo },
                  })
                : null}
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#5191F9', '#4E91FD', '#F4011F']}
                style={styles.gradientView}
                locations={[0, 0.4, 1]}>
                <Text white bold>
                  {t('purchased')}
                </Text>
              </LinearGradient>
            </Block>
          </Block>
          <Block noflex row marginBottom={15}>
            <View style={styles.firstCircleContainer}>
              <View style={styles.firstCircleContent} />
            </View>
            <Block flex white middle>
              <View style={styles.dashedViewContainer}>
                <View style={styles.dashedViewContent} />
              </View>
            </Block>
            <View style={styles.secondCircleContainer}>
              <View style={styles.secondCircleContent} />
            </View>
          </Block>
          <Block row center noflex marginBottom={15} paddingHorizontal={15}>
            {renderVerticalItem({
              item: { title: t('transaction_ID'), text: operationID },
            })}
            <Block noflex>
              <Text marginBottom={5} color={colors.ticketInfoText}>
                {t('total_fee')}
              </Text>
              <Text right color={colors.ticketInfoText}>
                {totalAmount}
              </Text>
            </Block>
          </Block>

          <Block center noflex paddingBottom={10}>
            <Image
              style={styles.qrCode}
              source={require('../assets/images/karekod.png')}
            />
          </Block>
        </ScrollView>
      </Block>
    </React.Fragment>
  );
};

export default Ticket;

const styles = StyleSheet.create({
  modalContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  ticketText: {
    flex: 1,
  },
  eventTypeText: {
    textDecorationLine: 'underline',
  },
  personCountText: {
    textDecorationLine: 'underline',
    textDecorationColor: colors.underlinedText,
    color: colors.underlinedText,
  },
  qrCode: {
    height: 100,
    width: 100,
  },
  circle: {
    backgroundColor: colors.black,
    opacity: 0.6,
  },
  closeIcon: {
    marginBottom: 3,
    marginRight: -12,
  },
  closeIconContainer: {
    alignItems: 'flex-end',
    alignSelf: 'center',
  },
  gradientView: {
    width: 120,
    height: 30,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstCircleContainer: {
    overflow: 'hidden',
    width: 15,
    height: 30,
    marginLeft: 0,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: colors.black,
    opacity: 0.7,
  },
  firstCircleContent: {
    width: 15,
    height: 30,
    position: 'absolute',
    right: 0,
  },
  dashedViewContainer: {
    height: 1,
    width: '100%',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    zIndex: 0,
  },
  dashedViewContent: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 1,
    backgroundColor: colors.white,
    zIndex: 1,
  },
  secondCircleContainer: {
    overflow: 'hidden',
    width: 15,
    height: 30,
    marginLeft: 0,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: colors.black,
    opacity: 0.7,
  },
  secondCircleContent: {
    width: 15,
    height: 30,
    position: 'absolute',
    right: 0,
  },
});
