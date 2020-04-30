import { takeEvery, all, fork, call, put } from "@redux-saga/core/effects";
import {CHAT_ACTIONS, ChatActionTypes} from "../models/actions";
import {ChatRequestsService} from "../../modules/authorized/services/chat";
import {hideLoader, showLoader} from "../actions";
import {
    GET_ALL_CHATS_ROOMS_SUCCESS,
    GET_CHAT_ROOM_MEMBERS_SUCCESS, GET_CHAT_ROOM_MESSAGES_SUCCESS, NEW_MESSAGE, SET_CURRENT_CHAT
} from "../actions/chat.actions";
import { ChatMessage} from "../../modules/authorized/entities";

function* handleChatRequest(action: ChatActionTypes) {

    try {
        yield put(showLoader());
        if(action.type === CHAT_ACTIONS.GET_ALL_CHATS_ROOMS_REQUEST) {
           const RESPONSE = yield call(ChatRequestsService.getChatRooms, action.user_id);
           yield put(GET_ALL_CHATS_ROOMS_SUCCESS(RESPONSE.data.chats));

        }
        if(action.type === CHAT_ACTIONS.GET_CHAT_ROOM_MEMBERS_REQUEST) {
            const RESPONSE = yield call(ChatRequestsService.getChatRoomMembers, action.chat_id);
            yield put(GET_CHAT_ROOM_MEMBERS_SUCCESS(RESPONSE.data.users));
        }
        if(action.type === CHAT_ACTIONS.GET_CHAT_ROOM_MESSAGES_REQUEST) {
            const RESPONSE = yield call(ChatRequestsService.getChatRoomMessages, action.chat_id);
            yield put(SET_CURRENT_CHAT(action.chat_id));
            yield put(GET_CHAT_ROOM_MESSAGES_SUCCESS(RESPONSE.data));
        }
        if(action.type === CHAT_ACTIONS.USER_SEND_MESSAGE) {
            const RESPONSE = yield call(ChatRequestsService.postChatRoomMessage, action.data);
            const chatMessage: ChatMessage = {
                content: action.data.content,
                date_create: action.data.date_create,
                message_id: RESPONSE.message_id,
                user_sender: action.data.user_sender,
                read_statuses: []
            }
            yield put(NEW_MESSAGE(chatMessage));
        }
        yield put(hideLoader());
    } catch(err) {

    }
}

function* watchChatRequest() {
    yield takeEvery(CHAT_ACTIONS.GET_ALL_CHATS_ROOMS_REQUEST, handleChatRequest);
    yield takeEvery(CHAT_ACTIONS.GET_CHAT_ROOM_MEMBERS_REQUEST, handleChatRequest);
    yield takeEvery(CHAT_ACTIONS.GET_CHAT_ROOM_MESSAGES_REQUEST, handleChatRequest);
    yield takeEvery(CHAT_ACTIONS.POST_SEND_MESSAGE_REQUEST, handleChatRequest);
    yield takeEvery(CHAT_ACTIONS.USER_SEND_MESSAGE, handleChatRequest);
}



function* ChatSaga() {
    yield all([fork(watchChatRequest)])
}

export default ChatSaga;
