// signalrClient.ts
import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://spirify.azurewebsites.net/attendanceHub")
  .build();

connection.on("UpdateAttendance", (userId: string, isPresent: boolean) => {
  // Update the Editor.js tool UI here
});
connection.on("ReceiveMessage", (message: string) => {
  console.log(`Message received: ${message}`);
});

export function markAttendance(userId: string, isPresent: boolean) {
  connection.invoke("MarkAttendance", userId, isPresent).catch(err => console.error(err));
}


export function startConnectionIfNeeded() {
  if (connection.state === signalR.HubConnectionState.Disconnected) {
    connection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.error('Error while starting connection: ' + err));
  }
}
export default connection;
