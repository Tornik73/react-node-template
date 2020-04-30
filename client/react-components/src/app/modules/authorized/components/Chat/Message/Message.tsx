import React, {useEffect, useRef} from 'react';
import './Message.css';
import icon from './icon.svg';
import {ChatMember, ChatMessage} from "../../../entities/chat/chat.entity";
import {User} from "../../../../../redux/models/reducers";


interface Props {
    sender: any;
    message: ChatMessage;
}
function Message(props: Props) {
    const messagesEndRef: any = useRef(null);

    const getSenderName = () => {
        if (props.sender) {
            return props.sender.email ? props.sender.email : props.sender.user_id.substr(-10);
        }
        return "Unknown sender";
    };

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({behavior: "smooth" });
    }
    useEffect(scrollToBottom, [props.message]);

    return(
        <div ref={messagesEndRef} className="message">
            <div className="message__sender-icon">
                <img src={icon} alt="visitor icon"/>
            </div>
            <div className="message__bubble">
                <div className="message-sender-name">{getSenderName()}</div>
                <div className="message-content">
                    <span>
                        {props.message.content}
                    </span>

                </div>
            </div>
        </div>
    );
}
export default Message;
