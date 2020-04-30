import {ResponseService} from "../../services";
import { Request, Response } from "express";
import {
  Chat,
  CHAT_REPOSITORY,
  ChatUsers,
  Message,

  CHAT_USERS_REPOSITORY,
  UserMessage,
  MessagesStatuses,
  MESSAGE_REPOSITORY,
  MESSAGE_STATUS_REPOSITORY,
  ChatMessage,
  ChatMember, SendMessage,
} from "../../controllers/chat/chat.model";
import { v4 as uuidv4 } from 'uuid';
import {CodesEnum} from "../../enums/";
import {ChatEnum} from "./enum/chat.enum";
import {USERS_REPOSITORY} from "../../controllers/users/user.model";
import {WebSocketChat} from "../../websockets/chat";
import App from "../../../App";
import {WebSocketConnection} from "../../websockets";

export class ChatRepository {
  private readonly responseService: ResponseService = new ResponseService();

  private readonly web_socket_connection: WebSocketConnection = App.web_socket_connection;

  public async createChatRoom(req: Request, res: Response) {
    try {
      const BODY: Partial<Chat> = req.body;

      if(!BODY.name) {
        const errorResponse = this.responseService.errorResponse(res, CodesEnum.BAD_REQUEST, ChatEnum.NO_CHAT_NAME);
        return errorResponse;
      }
      if(!BODY.creation_user_id) {
        const errorResponse = this.responseService.errorResponse(res, CodesEnum.BAD_REQUEST, ChatEnum.NO_USER_ID);
        return errorResponse;
      }
      const CHAT: Chat = new Chat();
      CHAT.chat_id = uuidv4();
      CHAT.name = BODY.name;
      CHAT.creation_user_id = BODY.creation_user_id;
      await CHAT_REPOSITORY.create(CHAT);

      const successResponse = this.responseService.successResponse(res, CHAT, CodesEnum.SUCCESS, ChatEnum.CHAT_SUCCESSFULLY_CREATED);
      return successResponse;

    } catch (err) {
      const errorResponse = this.responseService.errorResponse(res, CodesEnum.INTERNAL_SERVER_ERROR, err.toString());
      return errorResponse;
    }

  }

  public async addUserToChat(req: Request, res: Response) {
    try {
      const BODY: ChatUsers = req.body;
      if(!BODY.chat_id) {
        const errorResponse = this.responseService.errorResponse(res, CodesEnum.BAD_REQUEST, ChatEnum.NO_CHAT_ID);
        return errorResponse;
      }
      if(!BODY.user_id) {
        const errorResponse = this.responseService.errorResponse(res, CodesEnum.BAD_REQUEST, ChatEnum.NO_USER_ID);
        return errorResponse;
      }

      const FOUNDED_CHAT = (await CHAT_REPOSITORY.findOne({
        where: { chat_id: BODY.chat_id }
      })) as Chat;

      const FOUNDED_USER = (await USERS_REPOSITORY.findOne({
        where: { user_id: BODY.user_id }
      })) as Chat;


      if(!FOUNDED_CHAT) {
        const errorResponse = this.responseService.notFound(res, ChatEnum.NO_CHAT_FOUND);
        return errorResponse;
      }

      if(!FOUNDED_USER) {
        const errorResponse = this.responseService.notFound(res, ChatEnum.NO_USER_FOUNDED);
        return errorResponse;
      }

      const IS_USER_IN_CHAT = await this.isUserInChat(BODY.user_id, FOUNDED_CHAT.chat_id);

      if(IS_USER_IN_CHAT) {
        const errorResponse = this.responseService.errorResponse(res, CodesEnum.ALREADY_EXIST, ChatEnum.USER_ALREADY_IN_CHAT);
        return errorResponse;
      }

      const CHAT_USER: ChatUsers = new ChatUsers();
      CHAT_USER.chat_id = BODY.chat_id;
      CHAT_USER.user_id = BODY.user_id;
      await CHAT_USERS_REPOSITORY.create(CHAT_USER);

      const successResponse = this.responseService.successResponse(res, null, CodesEnum.SUCCESS, ChatEnum.USER_SUCCESSFULLY_ADDED_TO_CHAT);
      return successResponse;

    } catch (err) {
      const errorResponse = this.responseService.errorResponse(res, CodesEnum.INTERNAL_SERVER_ERROR, err.toString());
      return errorResponse;
    }

  }

  public async sendMessage(req: Request, res: Response) {
    try {
      const BODY: SendMessage = req.body;

      if(!BODY.chat_id || !BODY.user_id || !BODY.content || !BODY.date_create) {
        const errorResponse = this.responseService.badRequest(res, ChatEnum.SOME_FIELDS_IS_NULL);
        return errorResponse;
      }

      const FOUNDED_CHAT = (await CHAT_REPOSITORY.findOne({ // TODO: refactor to one request
        where: { chat_id: BODY.chat_id }
      })) as Chat;

      const FOUNDED_USER = (await USERS_REPOSITORY.findOne({
        where: { user_id: BODY.user_id }
      })) as ChatMember;

      if(!FOUNDED_CHAT || !FOUNDED_USER) {
        const errorResponse = this.responseService.notFound(res, 'User or chat not found');
        return errorResponse;
      }

      const MESSAGE: Message = new Message(uuidv4());

      MESSAGE.chat_id = BODY.chat_id;
      MESSAGE.content = BODY.content;
      MESSAGE.user_id = BODY.user_id;
      MESSAGE.date_create = new Date(BODY.date_create).toISOString();

      const MESSAGE_STATUS = {
        message_id: MESSAGE.message_id,
        user_id: MESSAGE.user_id,
        is_read: true,
      };
      await MESSAGE_REPOSITORY.create(MESSAGE);
      await MESSAGE_STATUS_REPOSITORY.create(MESSAGE_STATUS);

      const ChatMessage: ChatMessage = {
        content: MESSAGE.content,
        date_create: MESSAGE.date_create,
        message_id: MESSAGE.message_id,
        user_sender: FOUNDED_USER,
      };

      this.web_socket_connection.webSocketChat.sendNewMessageInChat(ChatMessage);


      const successResponse = this.responseService.successResponse(res, MESSAGE, CodesEnum.SUCCESS, ChatEnum.MESSAGE_SUCCESSFULLY_SENT);
      return successResponse;

    } catch (err) {
      const errorResponse = this.responseService.errorResponse(res, CodesEnum.INTERNAL_SERVER_ERROR, err.toString());
      return errorResponse;
    }

  }

  public async readMessage(req: Request, res: Response) { //TODO:
    try {

      const successResponse = this.responseService.successResponse(res, null, CodesEnum.SUCCESS, ChatEnum.MESSAGE_SUCCESSFULLY_SENT);
      return successResponse;

    } catch (err) {
      const errorResponse = this.responseService.errorResponse(res, CodesEnum.INTERNAL_SERVER_ERROR, err.toString());
      return errorResponse;
    }
  }

  public async chatRooms(req: Request, res: Response) {
    try {
      const FOUNDED_CHATS = (await CHAT_REPOSITORY.findAll()) as Chat[];

      if(FOUNDED_CHATS) {
        const successResponse = this.responseService.successResponse(res, FOUNDED_CHATS, CodesEnum.SUCCESS);
        return successResponse;
      }
      const errorResponse = this.responseService.notFound(res, ChatEnum.NO_CHAT_FOUND);
      return errorResponse;
    } catch (err) {
      const errorResponse = this.responseService.errorResponse(res, CodesEnum.INTERNAL_SERVER_ERROR, err.toString());
      return errorResponse;
    }
  }

  public async usersInChatRoom(id: string, res: Response): Promise<any> {
    try {
      const FOUNDED_USERS_IN_CHAT = (
        await CHAT_REPOSITORY.findOne({
            include: [
              {
                attributes: ['img', 'user_id', 'email'],
                model: USERS_REPOSITORY,
                through: {
                  attributes: [],
                }
              },
            ],
            where: {
              chat_id: id,
            },
          })
      );

      return FOUNDED_USERS_IN_CHAT;
    } catch (err) {
      this.responseService.errorResponse(res, CodesEnum.INTERNAL_SERVER_ERROR, err.toString());
    }
  }

  public async chatRoomsForUserById(user_id: string, res: Response) {
    try {
      const FOUNDED_CHATS_FOR_USER = (
        await USERS_REPOSITORY.findOne({
          attributes: [],
          include: [
            {
              model: CHAT_REPOSITORY,
              through: {
                attributes: [],
              },
            },
          ],
          where: {
            user_id,
          },
        })
      );

      return FOUNDED_CHATS_FOR_USER;
    } catch (err) {
      this.responseService.errorResponse(res, CodesEnum.INTERNAL_SERVER_ERROR, err.toString());
    }
  }

  public async messageInChatById(chat_id: string, res: Response): Promise<ChatMessage[]> {
    try {
      const FOUNDED_MESSAGES_IN_CHAT: ChatMessage[] =
        await MESSAGE_REPOSITORY.findAll({
          attributes: ['content', 'date_create', 'message_id'],
          where: {
            chat_id,
          },
          include: [
            {
              attributes: ['email', 'img', 'user_id',],
              model: USERS_REPOSITORY,
              as: 'user_sender'
            },
            {
              attributes: ['user_id'],
              model: MESSAGE_STATUS_REPOSITORY,
              as: 'read_statuses',
              required: false,
              where: {
                is_read: true,
              }
            }
          ],

        });

      return FOUNDED_MESSAGES_IN_CHAT;
    } catch (err) {
      this.responseService.errorResponse(res, CodesEnum.INTERNAL_SERVER_ERROR, err.toString());
    }
  }

  public async findMessage(message_id: string): Promise<Message> {
    const FOUNDED_MESSAGE = (await MESSAGE_REPOSITORY.findOne({
      where: { message_id: message_id }
    })) as Message;
    return FOUNDED_MESSAGE;
  }

  public async addReadMessage(BODY: MessagesStatuses): Promise<MessagesStatuses> {
    const ADDED_READ_MESSAGE = await MESSAGE_STATUS_REPOSITORY.create(BODY) as MessagesStatuses;
    return ADDED_READ_MESSAGE;
  }

  private async isUserInChat(user_id: string, chat_id): Promise<boolean> {
    const FOUNDED_USER_IN_CHAT = (await CHAT_USERS_REPOSITORY.findOne({
      where: { user_id: user_id, chat_id: chat_id }
    })) as Chat;

    if(FOUNDED_USER_IN_CHAT) {
      return true;
    }
    return false;
  }



}
