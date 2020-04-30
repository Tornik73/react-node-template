import {CHAT_ACTIONS, ChatActionTypes} from "../models/actions";
import {ChatReducerState} from "../models/reducers";
import {ChatEntity} from "../../modules/authorized/entities";

const INIT_CHAT_STATE: ChatReducerState = {
    currentChat: new ChatEntity('Chat'),
    chats: [],
    members: [],
    messages: [],
}


export default function chatReducer(state = INIT_CHAT_STATE, action: ChatActionTypes ) {
    switch (action.type) {
        case CHAT_ACTIONS.GET_ALL_CHATS_ROOMS_SUCCESS:
            return {
                ...state,
                chats: action.data,
            }
        case CHAT_ACTIONS.GET_CHAT_ROOM_MEMBERS_SUCCESS:
            return {
                ...state,
                members: action.data,
            }
        case CHAT_ACTIONS.GET_CHAT_ROOM_MESSAGES_SUCCESS:
            return {
                ...state,
                messages: action.data,
            }
        case CHAT_ACTIONS.NEW_MESSAGE:
            const MESSAGES = [...state.messages, action.message];
            return {
                ...state,
                messages: MESSAGES
            }
        case CHAT_ACTIONS.SET_CURRENT_CHAT:
            const FOUNDED_CHAT = state.chats.find(chat => chat.chat_id === action.chat_id);

            return {
                ...state,
                currentChat: FOUNDED_CHAT,
            }
        default:
            return {
                ...state
            };
    }
}
