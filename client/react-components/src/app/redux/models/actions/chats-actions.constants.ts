export const CHAT_ACTIONS = {
    GET_ALL_CHATS_ROOMS_REQUEST: 'GET_ALL_CHATS_ROOMS_REQUEST',
    GET_ALL_CHATS_ROOMS_SUCCESS: 'GET_ALL_CHATS_ROOMS_SUCCESS',
    GET_ALL_CHATS_ROOMS_FAILED: 'GET_ALL_CHATS_ROOMS_FAILED',

    GET_CHAT_ROOM_MEMBERS_REQUEST: 'GET_CHAT_ROOM_MEMBERS_REQUEST',
    GET_CHAT_ROOM_MEMBERS_SUCCESS: 'GET_CHAT_ROOM_MEMBERS_SUCCESS',
    GET_CHAT_ROOM_MEMBERS_FAILED: 'GET_CHAT_ROOM_MEMBERS_FAILED',

    GET_CHAT_ROOM_MESSAGES_REQUEST: 'GET_CHAT_ROOM_MESSAGES_REQUEST',
    GET_CHAT_ROOM_MESSAGES_SUCCESS: 'GET_CHAT_ROOM_MESSAGES_SUCCESS',
    GET_CHAT_ROOM_MESSAGES_FAILED: 'GET_CHAT_ROOM_MESSAGES_FAILED',

    POST_SEND_MESSAGE_REQUEST: 'POST_SEND_MESSAGE_REQUEST',
    POST_SEND_MESSAGE_SUCCESS: 'POST_SEND_MESSAGE_SUCCESS',
    POST_SEND_MESSAGE_FAILED: 'POST_SEND_MESSAGE_FAILED',


    NEW_MESSAGE: 'NEW_MESSAGE',
    NEW_MESSAGE_RECEIVED: 'NEW_MESSAGE_RECEIVED',
    MESSAGE_HAD_BEEN_CHECKED: 'MESSAGE_HAD_BEEN_CHECKED',
    SET_CURRENT_CHAT: 'SET_CURRENT_CHAT',

    USER_SEND_MESSAGE: 'USER_SEND_MESSAGE',
} as const;
