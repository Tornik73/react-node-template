import {ChatService} from "../../services/";
import { Request, Response } from "express";
export default class ChatController {

  constructor() {
  }

  public async chatRooms(req: Request, res: Response): Promise<any>{
    const RESPONSE = await new ChatService().chatRooms(req, res);
    return RESPONSE;
  }

  public async chatRoomById(req: Request, res: Response): Promise<any> {
    const RESPONSE = await new ChatService().chatRoomById(req, res);
    return RESPONSE;
  }

  public async createChatRoom(req: Request, res: Response): Promise<any> {
    const RESPONSE = await new ChatService().createChatRoom(req, res);
    return RESPONSE;
  }

  public async addUserToChat(req: Request, res: Response): Promise<any> {
    const RESPONSE = await new ChatService().addUserToChat(req, res);
    return RESPONSE;
  }

  public async sendMessage(req: Request, res: Response): Promise<any> {
    const RESPONSE = await new ChatService().sendMessage(req, res);
    return RESPONSE;
  }

  public async readMessage(req: Request, res: Response): Promise<any> {
    const RESPONSE = await new ChatService().readMessage(req, res);
    return RESPONSE;
  }

  public async messagesInChatById(req: Request, res: Response): Promise<any> {
    const RESPONSE = await new ChatService().messagesInChatById(req, res);

    return RESPONSE;
  }
  public async chatRoomsForUserById(req: Request, res: Response): Promise<any> {
    const RESPONSE = await new ChatService().chatRoomsForUserById(req, res);

    return RESPONSE;
  }

}
