import PushNotification from 'react-native-push-notification';

const localPushNotification = (notification) => {
  // android 9 ve üstünde uygulama açıkken bildirim gönderilememe sorunu bu fonksiyon ile çözüldü.
  PushNotification.localNotification({
    channelId: notification.channelId,
    id: notification.id,
    title: notification.title,
    data: notification.data,
    message: notification.message ? notification.message : '',
  });
};

export default {
  localPushNotification,
};
