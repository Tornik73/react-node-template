import React, {useEffect, useRef} from 'react';
import Message from "../Message/Message";
import './Message-container.css';
import {ChatMember, ChatMessage} from "../../../entities/chat/chat.entity";

interface Props {
    members: ChatMember[];
    messages: ChatMessage[];
    me: any;
}
function MessageContainer(props: Props) {

    const messageList = props.messages.map((message) =>
        <Message
            key={message.message_id}
            sender={props.members.find((member) => member.user_id === message.user_sender.user_id)}
            message={message}/>
    );

    return (
        <section className="message__container">
            {messageList}
        </section>
    );
}
export default MessageContainer;
