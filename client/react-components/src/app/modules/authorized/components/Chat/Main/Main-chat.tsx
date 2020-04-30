import React from "react";
import MemberList from "../Member-list/Member-list";
import './Main-chat.css';
import ChatField from "../Chat-field/Chat-field";
import ChatList from "../Chat-list/Chat-list";
import {ChatEntity, ChatMember, ChatMessage} from "../../../entities/chat/chat.entity";

interface Props {
    chats: ChatEntity[];
    members: ChatMember[];
    messages: ChatMessage[];
    onSendNewMessage: any;
    me: any;
}
const MainChat = (props: Props) => {
    return(
        <section className="main">
            <ChatList chats={props.chats}/>
            <MemberList members={props.members} me={props.me}/>
            <ChatField
                members={props.members}
                messages={props.messages}
                onSendNewMessage={props.onSendNewMessage}
                me={props.me}
            />
        </section>
    );
}
export default MainChat;
