import React, { createContext, useContext, useEffect, useState } from "react";
import { startNotificationHub, stopNotificationHub } from "../api/notificationHub";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    startNotificationHub((message) => {
      console.log("Notification received:", message);
      setNotifications(prev => [message, ...prev]);
    });
    return () => stopNotificationHub();
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};