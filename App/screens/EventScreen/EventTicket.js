import React, { useState } from 'react';
import { StyleSheet, Image, Platform } from 'react-native';
import { Block, Text, Icon } from '../../components/AppTheme/index';
import AppButton from '../../components/AppButton';
import MessageBox from '../../components/MessageBox';
import Checkbox from '../../components/Checkbox';
import IconLabel from '../../components/IconLabel';
import Ticket from '../../components/Ticket';
import colors from '../../config/colors';
import { IconTypes } from '../../components/AppTheme/Icon';
import FloatingTextInput from '../../components/FloatingTextInput';
import { useTranslation } from 'react-i18next';

const EventTicket = ({ route, navigation }) => {
  const { t } = useTranslation();
  // useState
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [eventRulesChecked, setEventRulesChecked] = useState(false);
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCVV] = useState('');
  const [cardDate, setCardDate] = useState('');
  // variables
  const { totalAmount, adultsCount, studentCount, event, selectedBlock } =
    route.params;
  const calendarIcon = {
    type: 'materialCommunity',
    name: 'calendar-blank-outline',
    size: 20,
    color: colors.black,
  };
  const locationIcon = {
    type: IconTypes.ionicon,
    name: 'location-outline',
    size: 22,
    color: colors.black,
  };
  const ticketIcon = {
    type: IconTypes.foundation,
    name: 'ticket',
    size: 22,
    color: colors.black,
  };
  const editIcon = {
    type: IconTypes.antdesign,
    name: 'edit',
    size: 18,
    color: colors.underlinedText,
  };
  const modalFirstRowData = [
    {
      title: 'Gün',
      text: event.startingDate,
    },
    {
      title: 'Saat',
      text: event.startTime,
    },
    {
      title: 'Konser Alanı',
      text: event.address,
    },
  ];
  const modalSecondRowData = [
    {
      title: 'Öğrenciler',
      text: studentCount ? studentCount : 0,
    },
    {
      title: 'Yetişkinler',
      text: adultsCount ? adultsCount : 0,
    },
    {
      title: 'İşlem ID',
      text: '123 ABC', // TODO: Sunucudan gelecek.
    },
  ];

  const renderBottom = () => {
    /**
     * Fiyat, gün bilgisi ve devam et butonu gösterilir.
     */
    return (
      <Block bottom marginHorizontal={16}>
        <Checkbox
          text={t('event_rules_confirmation')}
          value={eventRulesChecked}
          onChange={() => {
            setEventRulesChecked(!eventRulesChecked);
          }}
          style={styles.eventRuleBox}
        />
        <Checkbox
          text={t('sales_confirm')}
          value={agreementChecked}
          onChange={() => {
            setAgreementChecked(!agreementChecked);
          }}
          style={styles.agreementBox}
        />
        <Block row center>
          <Block>
            <Text color={colors.black} bold marginBottom={5}>
              {totalAmount + ' TL'}
            </Text>
            <Text color={colors.black}>{t('total_fee')}</Text>
          </Block>
          <AppButton
            title={t('buy')}
            onPress={() => {
              setShowTicketModal(true);
            }}
            style={styles.continueButton}
          />
        </Block>
      </Block>
    );
  };

  return (
    <Block white scroll contentContainerStyle={styles.contentContainer}>
      <Block padding={16}>
        <Text notera marginLeft color={colors.lightGray} size={45} marginBottom>
          {event.title}
        </Text>
        <Block row marginBottom>
          <Text medium style={styles.ticketText}>
            {'BİLETİNİZ'}
          </Text>
          <Text medium style={styles.eventTypeText}>
            {event.categoryName}
          </Text>
        </Block>
        <Text bold title marginBottom>
          {event.title}
        </Text>
        <IconLabel icon={locationIcon} text={event.address} textSize={15} />
        <IconLabel
          icon={calendarIcon}
          text={
            event.startingDate +
            ' - ' +
            event.finishDate +
            '    ' +
            event.startTime
          }
          textSize={15}
        />
        <Block row noflex center marginBottom={20}>
          <Icon {...ticketIcon} />
          <Text marginHorizontal style={styles.personCountText}>
            {adultsCount ? (
              <Text color={colors.underlinedText}>
                {adultsCount + ' Yetişkin '}
              </Text>
            ) : null}
            {studentCount ? (
              <Text color={colors.underlinedText}>
                {studentCount + ' Öğrenci'}
              </Text>
            ) : null}
          </Text>
          <Icon {...editIcon} marginLeft />
        </Block>
      </Block>
      <Image
        style={styles.figure}
        source={require('../../assets/images/figure.png')}
      />
      <Block paddingHorizontal={16}>
        <FloatingTextInput
          title={t('card_owner')}
          value={cardName}
          onChangeText={(value) => {
            setCardName(value);
          }}
          containerStyle={styles.input}
          onBlur={() => {}}
        />
        <FloatingTextInput
          title={t('card_number')}
          value={cardNumber}
          onChangeText={(value) => {
            setCardNumber(value);
          }}
          containerStyle={styles.input}
        />
        <Block row marginBottom={60}>
          <FloatingTextInput
            title={t('card_date')}
            value={cardDate}
            onChangeText={(value) => {
              setCardDate(value);
            }}
            containerStyle={styles.cardDate}
          />
          <FloatingTextInput
            title={'CVV'}
            value={cvv}
            onChangeText={(value) => {
              setCVV(value);
            }}
            containerStyle={styles.cvv}
          />
        </Block>
      </Block>
      <MessageBox
        isVisible={showTicketModal}
        hideModal={() => {
          setShowTicketModal(false);
        }}
        renderChildren={() => {
          return (
            <Ticket
              hideModal={() => {
                setShowTicketModal(false);
              }}
              firstRowData={modalFirstRowData}
              secondRowData={modalSecondRowData}
              blockNo={selectedBlock.blockName}
              operationID={'123 ABC'}
              totalAmount={totalAmount + ' TL'}
              categoryName={event.categoryName}
              title={event.title}
            />
          );
        }}
      />
      {renderBottom()}
    </Block>
  );
};

export default EventTicket;

const styles = StyleSheet.create({
  block: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    backgroundColor: ' rgba(52, 52, 52, 0.5)',
  },
  beginTime: {
    marginRight: 10,
  },
  endTime: {
    marginLeft: 10,
  },
  continueButton: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: Platform.OS === 'android' ? 16 : 0,
  },
  agreementBox: {
    marginBottom: 30,
  },
  eventRuleBox: {
    marginBottom: 10,
  },
  figure: {
    width: '100%',
    height: 55,
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  cardDate: {
    flex: 1,
    marginRight: 15,
  },
  cvv: {
    flex: 1,
    marginLeft: 15,
  },
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
});
