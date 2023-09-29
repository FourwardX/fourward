// signalrClient.ts
import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7162/attendanceHub")
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

export default connection;
