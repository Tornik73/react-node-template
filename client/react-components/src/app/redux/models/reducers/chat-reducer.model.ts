import {ChatEntity, ChatMember, ChatMessage} from "../../../modules/authorized/entities/chat/chat.entity";

export interface ChatReducerState {
    currentChat: ChatEntity;
    chats: ChatEntity[];
    members: ChatMember[];
    messages: ChatMessage[];
}
