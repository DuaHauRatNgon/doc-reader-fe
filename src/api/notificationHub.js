import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const hubUrl = "http://localhost:5225/hubs/notification"; 

let connection = null;

export function startNotificationHub(onReceiveNotification) {
  connection = new HubConnectionBuilder()
    .withUrl(hubUrl)
    .configureLogging(LogLevel.Information)
    .build();

  connection.on("ReceiveNotification", (data) => {
    if (onReceiveNotification) {
      onReceiveNotification(data);
    }
  });

  connection.start()
    .catch(err => console.error("SignalR Connection Error: ", err));
}

export function stopNotificationHub() {
  if (connection) {
    connection.stop();
  }
}