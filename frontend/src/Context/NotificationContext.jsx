import { createContext, useState } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const fetchNotification = async () => {
    try {
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };
  return(

  <NotificationContext.Provider
    value={{ notificationData, fetchNotification, loading }}
  >
    {children}
    
  </NotificationContext.Provider>);
};
