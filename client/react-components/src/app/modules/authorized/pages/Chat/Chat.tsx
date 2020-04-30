import React, {useEffect, useState} from "react";
import {ChatContainer} from "./styles";
import './chat.css';
import {HeaderChat} from "../../components/Chat/Header/Header-chat";
import MainChat from "../../components/Chat/Main/Main-chat";
import {useDispatch, useSelector} from "react-redux";
import {
    GET_ALL_CHATS_ROOMS_REQUEST,
    NEW_MESSAGE,
    USER_SEND_MESSAGE
} from "../../../../redux/actions/chat.actions";
import {AuthReducerState, ChatReducerState} from "../../../../redux/models/reducers";
import socketIOClient from "socket.io-client";
import {environment} from "../../../../../environments/environments.dev";
import {ChatMessage} from "../../entities";
import {CurrentUserSendMessage} from "../../models/Chat/chat.model";


interface ChatState {
    authReducer: AuthReducerState
    chatReducer: ChatReducerState
}

export const Chat = () => {
    const dispatch = useDispatch();
    const CHATS_STATE = useSelector((state: ChatState ) => state.chatReducer.chats);
    const CURRENT_USER = useSelector((state: ChatState ) => state.authReducer.userState);
    const CURRENT_CHAT = useSelector((state: ChatState ) => state.chatReducer.currentChat);
    const MEMBERS = useSelector((state: ChatState ) => state.chatReducer.members);
    const MESSAGES = useSelector((state: ChatState ) => state.chatReducer.messages);
    const [chatRoomName, setChatRoomName] = useState('Chat');

    const [response, setResponse] = useState("");
    useEffect(() => {

        const socket = socketIOClient(environment.api);
        socket.on("chat", (data: React.SetStateAction<string>) => {
            socket.emit('user_connection', CURRENT_USER.user_id);
            setResponse(data);
        });
        socket.on("new_message_chat", (data: ChatMessage) => {
            if(data.user_sender.user_id !== CURRENT_USER.user_id) {
                dispatch(NEW_MESSAGE(data));
            }
        });
    }, []);

    useEffect(() => {
        dispatch(GET_ALL_CHATS_ROOMS_REQUEST(CURRENT_USER.user_id));
    }, [dispatch]);

    useEffect(() => {
        setChatRoomName(CURRENT_CHAT.name);
    }, [CURRENT_CHAT]);

    const onSendNewMessage = (msg: string) => {
        debugger
        const newMessage: CurrentUserSendMessage = {
            chat_id: CURRENT_CHAT.chat_id,
            user_id: CURRENT_USER.user_id,
            content: msg,
            date_create: new Date().toISOString(),
            user_sender: CURRENT_USER
        };
        dispatch(USER_SEND_MESSAGE(newMessage));
    }


    return (
        <ChatContainer>
            <HeaderChat
                chatroomName={chatRoomName}
                me={CURRENT_USER}
            ></HeaderChat>
            <MainChat
                chats={CHATS_STATE}
                members={MEMBERS}
                messages={MESSAGES}
                onSendNewMessage={onSendNewMessage}
                me={CURRENT_USER}
            />
        </ChatContainer>
    )
}
