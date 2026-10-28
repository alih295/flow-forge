import { createContext, useState } from "react";
import { getNotification } from "../services/NotificationService";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notificationloading, setNotificationLoading] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [unReadNotification, setUnReadNotification] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const fetchNotification = async (page,limit) => {
    try {
      setNotificationLoading(true);
      const response = await getNotification(page , limit);
      const data = response.notifications;
      if (response.success) {
        setNotificationData(data);
        setTotalPage(response.totalPage);
        setUnReadNotification(response.unReadNotification);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setNotificationLoading(false);
    }
  };
  return (
    <NotificationContext.Provider
      value={{
        notificationData,
        fetchNotification,
        notificationloading,
        unReadNotification,
        setUnReadNotification,totalPage, setTotalPage
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
