import React from 'react';
import './Chat-field.css';
import MessageContainer from "../Message-container/Message-container";
import SendMessageForm from "../Send-message-form/Send-message-form";
import {ChatMember, ChatMessage} from "../../../entities/chat/chat.entity";

interface Props {
    members: ChatMember[];
    messages: ChatMessage[];
    me: any;
    onSendNewMessage: any;
}
const ChatField = (props: Props) =>  {
    return(
        <section className="chat__field">
            <MessageContainer
                // knownUsers={props.knownUsers}
                members={props.members}
                messages={props.messages}
                me={props.me}
            />
            <SendMessageForm onSendNewMessage={props.onSendNewMessage}/>
        </section>
    );
}

export default ChatField;
