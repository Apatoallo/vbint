import { IconTypes } from '../components/AppTheme/Icon';
import routes from '../navigation/routes';
export default Object.freeze({
  mainPage: [
    {
      index: 1,
      type: IconTypes.ionicon,
      icon: 'bed-sharp',
      name: 'hotel',
      navigate: routes.HOTEL_STACK,
      url: 'https://visitbodrum.4alabs.com/assets_web/ikonlar/zz/group-8233.svg',
    },
    {
      index: 2,
      type: IconTypes.fontAwesome5,
      icon: 'concierge-bell',
      name: 'restaurant',
      navigate: routes.RESTAURANT_STACK,
      url: 'https://visitbodrum.4alabs.com/assets_web/ikonlar/zz/group-298.svg',
    },
    {
      index: 3,
      type: IconTypes.material,
      icon: 'place',
      name: 'trip_tour',
      navigate: routes.TOUR_STACK,
      url: 'https://visitbodrum.4alabs.com/assets_web/ikonlar/zz/group-423.svg',
    },
    {
      index: 4,
      type: IconTypes.fontAwesome5,
      icon: 'theater-masks',
      name: 'activity',
      navigate: routes.EVENT_STACK,
      url: 'https://visitbodrum.4alabs.com/assets_web/ikonlar/zz/group-8522.svg',
    },
    {
      index: 5,
      type: IconTypes.fontisto,
      icon: 'yacht',
      name: 'boat_yacht',
      navigate: routes.YACHT_BOAT_STACK,
      url: 'https://visitbodrum.4alabs.com/assets_web/ikonlar/zz/group-8232.svg',
    },
    {
      index: 6,
      type: IconTypes.fontAwesome,
      icon: 'plane',
      name: 'flight_ticket',
      navigate: routes.FLIGHT_STACK,
      url: 'https://visitbodrum.4alabs.com/assets_web/ikonlar/path-1263.svg',
    },
    {
      index: 7,
      type: IconTypes.fontAwesome,
      icon: 'bus',
      name: 'bus_ticket',
      navigate: routes.BUS_STACK,
      url: 'https://visitbodrum.4alabs.com/assets_web/ikonlar/zz/group-8231.svg',
    },
    {
      type: IconTypes.fontAwesome,
      icon: 'car',
      name: 'rent_a_car',
      navigate: routes.CAR_STACK,
      url: 'https://visitbodrum.4alabs.com/assets_web/ikonlar/zz/group-8230.svg',
    },
    {
      index: 8,
      type: IconTypes.materialCommunity,
      icon: 'van-utility',
      name: 'vip_transfer',
      navigate: routes.TRANSFER_STACK,
      url: 'https://visitbodrum.4alabs.com/assets_web/ikonlar/zz/group-8229.svg',
    },
    {
      index: 9,
      type: IconTypes.foundation,
      icon: 'trees',
      name: 'places_to_visit',
      navigate: routes.PLACES_STACK,
      url: 'https://visitbodrum.4alabs.com/assets_web/ikonlar/zz/group-8318.svg',
    },
    {
      index: 10,
      type: IconTypes.fontAwesome,
      icon: 'pencil',
      name: 'blog',
      navigate: routes.BLOG_STACK,
      url: 'https://visitbodrum.4alabs.com/assets_web/ikonlar/path-1263.svg',
    },
    {
      index: 11,
      type: IconTypes.entypo,
      icon: 'eye',
      name: 'gallery_min',
      navigate: routes.GALLERY_STACK,
      url: 'https://visitbodrum.4alabs.com/assets_web/ikonlar/zz/group-8198.svg',
    },
    {
      index: 12,
      type: IconTypes.materialCommunity,
      icon: 'hospital-box-outline',
      name: 'hospitals',
      navigate: routes.HOSPITAL_STACK,
      url: 'https://visitbodrum.4alabs.com/assets_web/ikonlar/zz/group-8319.svg',
    },
    {
      index: 13,
      icon: 'star',
      type: IconTypes.antdesign,
      name: 'campaign',
      navigate: routes.CAMPAIGN_STACK,
      url: 'https://visitbodrum.4alabs.com/assets_web/ikonlar/zz/path-57002.svg',
    },
    {
      index: 14,
      icon: 'gift',
      type: IconTypes.antdesign,
      name: 'award_opportunities',
      navigate: routes.OPPORTUNITIES_STACk,
      url: 'https://visitbodrum.4alabs.com/assets_web/ikonlar/zz/group-8458.svg',
    },
  ],

  detailPage: [
    {
      index: 1,
      text: 'Galeri',
      subtext: 'Fotoğraflara göz atın',
      navigateTo: routes.HOTEL_IMAGES_LIST,
    },
    {
      index: 2,
      text: 'Kampanyalar',
      subtext: 'Aile boyu %50 indirim',
      navigateTo: routes.CAMPAIGN,
    },
    {
      index: 3,
      text: 'Tur Kuralları',
      subtext: "Tur saat 09:00'da başlamaktadır.",
      navigateTo: routes.RULES,
    },
    {
      index: 4,
      text: 'Sıkça sorulan Sorular',
      subtext: 'Rezervasyon talebi nedir?',
      navigateTo: routes.FREQUENTLY_ASKED_QUESTIONS,
    },
  ],
  eventDetailList: [
    {
      index: 1,
      text: 'Galeri',
      subtext: 'Fotoğraflara göz atın',
      navigateTo: routes.HOTEL_IMAGES_LIST,
    },
    {
      index: 2,
      text: 'Kampanyalar',
      subtext: 'Aile boyu %50 indirim',
      navigateTo: routes.CAMPAIGN,
    },
    {
      index: 3,
      text: 'Sıkça sorulan Sorular',
      subtext: 'Rezervasyon talebi nedir?',
      navigateTo: routes.FREQUENTLY_ASKED_QUESTIONS,
    },
  ],

  transferDetailPage: [
    {
      index: 1,
      text: 'Kampanyalar',
      subtext: 'Aile boyu %50 indirim',
      navigateTo: routes.CAMPAIGN,
    },
  ],
  placesDetailPage: [
    {
      index: 1,
      text: 'Ziyaret Saatleri',
      subtext: 'Pazartesi 10:00 - 23:00',
      navigateTo: routes.WORKING_TIME_SCREEN,
    },
  ],
  individualProfileSettingsData: [
    {
      text: 'user_opr',
      navigateTo: routes.USER_OPERATIONS,
      icon: {
        type: IconTypes.ionicon,
        name: 'person-outline',
      },
    },
    {
      text: 'pass_opr',
      navigateTo: routes.USER_PASSWORD,
      icon: {
        type: IconTypes.feather,
        name: 'lock',
      },
    },
    {
      text: 'permissions_privacy',
      navigateTo: routes.PERMISSIONS_AND_PRIVACY,
      icon: {
        type: IconTypes.materialCommunity,
        name: 'server-security',
      },
    },
    {
      text: 'member_cancel',
      type: 'cancelMembership',
      icon: {
        type: IconTypes.ionicon,
        name: 'person-remove-outline',
      },
    },
  ],
  corporateProfileSettingsData: [
    {
      text: 'user_opr',
      navigateTo: routes.USER_OPERATIONS,
      icon: {
        type: IconTypes.ionicon,
        name: 'person-outline',
      },
    },
    {
      text: 'business_opr',
      navigateTo: routes.BUSINESS_OPERATIONS,
      icon: {
        type: IconTypes.material,
        name: 'bookmark-outline',
      },
    },
    {
      text: 'pass_opr',
      navigateTo: routes.USER_PASSWORD,
      icon: {
        type: IconTypes.feather,
        name: 'lock',
      },
    },
    {
      text: 'permissions_privacy',
      navigateTo: routes.PERMISSIONS_AND_PRIVACY,
      icon: {
        type: IconTypes.materialCommunity,
        name: 'server-security',
      },
    },
    {
      text: 'member_cancel',
      type: 'cancelMembership',
      icon: {
        type: IconTypes.ionicon,
        name: 'person-remove-outline',
      },
    },
    {
      text: 'exit',
      type: 'logout',
      icon: {
        type: IconTypes.antdesign,
        name: 'logout',
      },
    },
  ],
});
