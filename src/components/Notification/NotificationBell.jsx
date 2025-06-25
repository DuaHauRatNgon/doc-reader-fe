import React, { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { useNotification } from "../../contexts/NotificationContext";
import "./NotificationBell.css"; // Sẽ tạo file css riêng

const NotificationBell = () => {
  const { notifications } = useNotification();
  const [open, setOpen] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const bellRef = useRef();

  // Đánh dấu có thông báo mới khi notifications thay đổi
  useEffect(() => {
    if (notifications.length > 0) setHasNew(true);
  }, [notifications]);

  // Khi mở popup thì reset trạng thái "có thông báo mới"
  const handleToggle = () => {
    setOpen((prev) => !prev);
    if (!open) setHasNew(false);
  };

  // Đóng popup khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="notification-bell-wrapper" ref={bellRef}>
      <div
        className={`notification-bell-icon${hasNew ? " has-new" : ""}`}
        onClick={handleToggle}
        title="Thông báo"
      >
        <FaBell size={24} />
        {hasNew && <span className="notification-dot" />}
      </div>
      {open && (
        <div className="notification-dropdown">
          <h4>Thông báo</h4>
          {notifications.length === 0 ? (
            <div className="notification-empty">Không có thông báo nào</div>
          ) : (
             <ul>
    {notifications.map((item, idx) => (
      <li key={idx}>
        <strong>{item.title}</strong><br />
        <span>{item.content}</span>
      </li>
    ))}
  </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;