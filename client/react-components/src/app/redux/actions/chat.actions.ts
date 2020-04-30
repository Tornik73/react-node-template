
import {CHAT_ACTIONS} from "../models/actions";
import {ChatMember, ChatMessage, SendMessage} from "../../modules/authorized/entities/chat/chat.entity";
import {CurrentUserSendMessage} from "../../modules/authorized/models/Chat/chat.model";

const GET_ALL_CHATS_ROOMS_REQUEST = (user_id: string) => ({
    type: CHAT_ACTIONS.GET_ALL_CHATS_ROOMS_REQUEST,
    user_id
});

const GET_ALL_CHATS_ROOMS_SUCCESS = (data: any) => ({
    type: CHAT_ACTIONS.GET_ALL_CHATS_ROOMS_SUCCESS,
    data: data
});

const GET_CHAT_ROOM_MEMBERS_REQUEST = (chat_id: string) => ({
    type: CHAT_ACTIONS.GET_CHAT_ROOM_MEMBERS_REQUEST,
    chat_id
});

const GET_CHAT_ROOM_MEMBERS_SUCCESS = (data: ChatMember[]) => ({
    type: CHAT_ACTIONS.GET_CHAT_ROOM_MEMBERS_SUCCESS,
    data
});

const GET_CHAT_ROOM_MESSAGES_REQUEST = (chat_id: string) => ({
    type: CHAT_ACTIONS.GET_CHAT_ROOM_MESSAGES_REQUEST,
    chat_id
});

const GET_CHAT_ROOM_MESSAGES_SUCCESS = (data: any) => ({
    type: CHAT_ACTIONS.GET_CHAT_ROOM_MESSAGES_SUCCESS,
    data
});

const SET_CURRENT_CHAT = (chat_id: string) => ({
    type: CHAT_ACTIONS.SET_CURRENT_CHAT,
    chat_id
});
const NEW_MESSAGE = (message: ChatMessage) => ({
    type: CHAT_ACTIONS.NEW_MESSAGE,
    message
});
const POST_SEND_MESSAGE_REQUEST = (data: SendMessage) => ({
    type: CHAT_ACTIONS.POST_SEND_MESSAGE_REQUEST,
    data
});
const USER_SEND_MESSAGE = (data: CurrentUserSendMessage) => ({
    type: CHAT_ACTIONS.USER_SEND_MESSAGE,
    data
});
export {
    GET_ALL_CHATS_ROOMS_REQUEST,
    GET_ALL_CHATS_ROOMS_SUCCESS,
    GET_CHAT_ROOM_MEMBERS_REQUEST,
    GET_CHAT_ROOM_MEMBERS_SUCCESS,
    GET_CHAT_ROOM_MESSAGES_SUCCESS,
    GET_CHAT_ROOM_MESSAGES_REQUEST,
    SET_CURRENT_CHAT,
    NEW_MESSAGE,
    POST_SEND_MESSAGE_REQUEST,
    USER_SEND_MESSAGE
}
