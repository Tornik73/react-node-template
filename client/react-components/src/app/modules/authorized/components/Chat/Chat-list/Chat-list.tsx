import React from "react";
import './Chat-list.css';
import ChatItem from "../Chat-item/Chat-item";
import {ChatEntity, ChatMember} from "../../../entities/chat/chat.entity";

interface Props {
    chats: ChatEntity[];
}
const ChatList = (props: Props) => {

    const chats = props.chats.map((chat) =>
        <ChatItem   key={chat.chat_id} chat={chat}  />
    );

    return (
        <section className="chat__list">
            <h3 className='chat__title'>
                Chats
            </h3>
            <div>
                {chats}
            </div>
        </section>
    );
}
export default ChatList;

