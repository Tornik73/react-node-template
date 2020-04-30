import {ChatMember, SendMessage} from "../../entities";

export class CurrentUserSendMessage extends SendMessage{
    user_sender: ChatMember = new ChatMember();
}
