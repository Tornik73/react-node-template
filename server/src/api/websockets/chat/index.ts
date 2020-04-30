import SocketIO from "socket.io";
import {ChatMessage} from "../../controllers/chat/chat.model";

export class WebSocketChat {
  private readonly io: SocketIO.Socket;
  private user_id: string;

  constructor(IO: SocketIO.Socket) {
    this.io = IO;
  }

  public set userId(newUserId: string) {
    this.user_id = newUserId;
  }


  public initConnection(): void {
    this.io.emit('chat');
  }

  public sendNewMessageInChat(message: ChatMessage): void {
    this.io.emit('new_message_chat', message);
  }
}
