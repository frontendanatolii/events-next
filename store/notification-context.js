import { createContext, useState, useEffect } from "react";

const NotificationContext = createContext({
  notification: null,
  showNotification: function(notificationData) {},
  hideNotification: function() {}
});

export function NotificationContextProvider(props) {
  const [notification, setNotification] = useState();

  const showNotification = (notificationData) => {
    setNotification(notificationData);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    if (notification && (notification.status === 'success' || notification.status === 'error')) {
      const timer = setTimeout(hideNotification, 3000);

      return () => {
        clearTimeout(timer);
      }
    }
  }, [notification])

  const context = {
    notification: notification,
    showNotification: showNotification,
    hideNotification: hideNotification,
  }

  return <NotificationContext.Provider value={context}>
    {props.children}
  </NotificationContext.Provider>
}

export default NotificationContext;