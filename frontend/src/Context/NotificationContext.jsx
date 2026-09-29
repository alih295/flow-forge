import { createContext, useState } from "react";
import { getNotification } from "../services/NotificationService";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notificationloading, setNotificationLoading] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const fetchNotification = async () => {
    try {
      setNotificationLoading(true);
      const response = await getNotification();
      const data = response.notification
      if (response.success) {
        setNotificationData(data);
      }
    }catch(err){
      console.log(err.message)
    } finally {
      setNotificationLoading(false);
    }
  };
  return (
    <NotificationContext.Provider
      value={{ notificationData, fetchNotification, notificationloading }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
