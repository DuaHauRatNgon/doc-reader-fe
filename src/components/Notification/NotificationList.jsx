import React from "react";
import { useNotification } from "../../contexts/NotificationContext";

const NotificationList = () => {
  const { notifications } = useNotification();

  return (
    <div className="notification-list">
      <h4>Thông báo</h4>
      {/* <ul>
        {notifications.map((item, idx) => (
          <li key={idx}>
            <strong>{item.title}</strong><br />
            <span>{item.content}</span>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default NotificationList;