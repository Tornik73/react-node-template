import { Router } from 'express';
import ChatController from './chat.controller';

const CHATS: Router = Router();
const CHAT_CONTROLLER = new ChatController();

// GET requests
CHATS.get(
  '/chatRooms',
  CHAT_CONTROLLER.chatRooms
);

CHATS.get(
  '/chatRoomsForUser/',
  CHAT_CONTROLLER.chatRoomsForUserById
);

CHATS.get(
  '/chatRooms/:id',
  CHAT_CONTROLLER.chatRoomById
);

CHATS.get(
  '/messages/',
  CHAT_CONTROLLER.messagesInChatById
);
// end: GET requests
CHATS.post(
  '/createChatRoom',
  CHAT_CONTROLLER.createChatRoom
);

CHATS.post(
  '/addUserToChat',
  CHAT_CONTROLLER.addUserToChat
);

CHATS.post(
  '/sendMessage',
  CHAT_CONTROLLER.sendMessage
);

CHATS.post(
  '/readMessage',
  CHAT_CONTROLLER.readMessage
);


export default CHATS;
