import {Request, Response} from "express";
import {ChatRepository} from "../repositories/chat";
import {CodesEnum} from "../enums";
import {ChatEnum} from "../repositories/chat/enum/chat.enum";
import {ResponseService} from "./response.service";
import {ChatMessage, Message, MessagesStatuses} from "../controllers/chat/chat.model";
import {ResponseModel} from "../models";
export class ChatService {
  private readonly responseService: ResponseService = new ResponseService();
  public async createChatRoom(req: Request, res: Response) {
    const RESPONSE = await new ChatRepository().createChatRoom(req, res);
    return RESPONSE;
  }

  public async addUserToChat(req: Request, res: Response) {
    const RESPONSE = await new ChatRepository().addUserToChat(req, res);
    return RESPONSE;
  }

  public async sendMessage(req: Request, res: Response) {
    const RESPONSE = await new ChatRepository().sendMessage(req, res);
    return RESPONSE;
  }

  public async chatRooms(req: Request, res: Response): Promise<any> {
    const RESPONSE = await new ChatRepository().chatRooms(req, res);
    return RESPONSE;
  }

  public async chatRoomById(req: Request, res: Response): Promise<any> {
    const id: string = req.params.id;
    const FOUNDED_USERS_IN_CHAT = await new ChatRepository().usersInChatRoom(id, res);

    const successResponse = this.responseService.successResponse(res, FOUNDED_USERS_IN_CHAT, CodesEnum.SUCCESS);
    return successResponse;

  }

  public async readMessage(req: Request, res: Response): Promise<any> {
      const BODY: MessagesStatuses = req.body;
      const FOUND_MESSAGE: Message = await new ChatRepository().findMessage(BODY.message_id);
      if(FOUND_MESSAGE) {
        BODY.is_read = true;
        await new ChatRepository().addReadMessage(BODY);
        const successResponse = this.responseService.successResponse(res, null, CodesEnum.SUCCESS, ChatEnum.MESSAGE_SUCCESSFULLY_READ);
        return successResponse;
      }
      return;
  }

  public async messagesInChatById(req: Request, res: Response): Promise<any> {
    const CHAT_ID = req.query.chat_id as string;
    const FOUND_MESSAGES: ChatMessage[] = await new ChatRepository().messageInChatById(CHAT_ID, res);
    const MESSAGES = JSON.parse(JSON.stringify(FOUND_MESSAGES));
    MESSAGES.map(message =>{
      const statuses: string[] = message.read_statuses.map(status => status.user_id);
      message.read_statuses = statuses;
    } );
    const successResponse = this.responseService.successResponse(res, MESSAGES, CodesEnum.SUCCESS, '');
    return successResponse;
  }

  public async chatRoomsForUserById(req: Request, res: Response): Promise<any> {
    const USER_ID = req.query.user_id as string;
    const RESPONSE = await new ChatRepository().chatRoomsForUserById(USER_ID, res);
    const successResponse = this.responseService.successResponse(res, RESPONSE, CodesEnum.SUCCESS, '');
    return successResponse;
  }
}
