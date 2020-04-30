import {WebSocketChat} from "./chat";
import SocketIO from "socket.io";

export class WebSocketConnection {

  private readonly io: SocketIO.Socket;

  private user_id: string;

  private WEB_SOCKET_CHAT: WebSocketChat;

  constructor(IO: SocketIO.Socket) {
    this.io = IO;
  }

  public get webSocketChat(): WebSocketChat {
    return this.WEB_SOCKET_CHAT;
  }

  public initWebSocketConnection(): void {
    this.io.on("connection", (socket) => {
      socket.emit("user_connection");
      socket.on("user_connection", (user_id: string) => {
        console.log(`New client connected: ${user_id}`);
        this.user_id = user_id;
      });

      this.WEB_SOCKET_CHAT = new WebSocketChat(this.io);
      this.WEB_SOCKET_CHAT.userId = this.user_id;
      this.WEB_SOCKET_CHAT.initConnection();

      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${this.user_id}`);
      });
    });
  }
}
