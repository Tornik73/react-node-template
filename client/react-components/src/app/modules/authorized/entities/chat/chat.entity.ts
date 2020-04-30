export class ChatMember {
    img: string = '';
    user_id: string = '';
    email: string = '';
}

export interface ChatMessage {
    content: string;
    date_create: string;
    message_id: string;
    user_sender: ChatMember;
    read_statuses: string[];
}
export class ChatEntity {
    chat_id: string = '';
    name: string;
    creation_user_id: string = '';

    constructor(chatName: string) {
        this.name = chatName;
    }

}

export class SendMessage {
    chat_id: string = '';
    user_id: string = '';
    content: string = '';
    date_create: string = '';
}
