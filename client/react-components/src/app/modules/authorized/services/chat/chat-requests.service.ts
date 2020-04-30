import Axios, {AxiosResponse} from "axios";
import {environment} from "../../../../../environments/environments.dev";
import {Book} from "../../entities/book";
import {ResponseModel} from "../../../../shared/models";
import {SendMessage} from "../../entities";


export const ChatRequestsService = {
    getChatRooms: async (user_id: string): Promise<AxiosResponse<ResponseModel<any>>> => {
        const response = await Axios.get(`${environment.apiUrl}/chat/chatRoomsForUser/`,{
            params: {
                user_id: user_id
            }
        });

        return response;
    },
    getChatRoomMembers: async (chat_id: string): Promise<AxiosResponse<ResponseModel<any>>> => {
        const response = await Axios.get(`${environment.apiUrl}/chat/chatRooms/${chat_id}`);

        return response;
    },
    getChatRoomMessages: async (chat_id: string): Promise<AxiosResponse<ResponseModel<any>>> => {
        const response = await Axios.get(`${environment.apiUrl}/chat/messages/`,{
                params: {
                    chat_id: chat_id
                }
            });

        return response;
    },
    postChatRoomMessage: async (chatMessage: SendMessage): Promise<AxiosResponse<ResponseModel<any>>> => {
        const response = await Axios.post(`${environment.apiUrl}/chat/sendMessage/`, chatMessage);

        return response;
    },
};
