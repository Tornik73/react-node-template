import React from "react";
import './Chat-item.css';
import icon from './icon.svg';
import {useDispatch} from "react-redux";
import {GET_CHAT_ROOM_MEMBERS_REQUEST, GET_CHAT_ROOM_MESSAGES_REQUEST} from "../../../../../redux/actions/chat.actions";
import {ChatEntity} from "../../../entities";

interface Props {
    chat: ChatEntity;
}
const ChatItem = (props: Props) => {
    const dispatch = useDispatch();
    const goToChat = (chat: ChatEntity) => {
        dispatch(GET_CHAT_ROOM_MEMBERS_REQUEST(chat.chat_id));
        dispatch(GET_CHAT_ROOM_MESSAGES_REQUEST(chat.chat_id));
    }


    function getName(){
        let name = '';
            if(props.chat.name){
                name = props.chat.name
            }
            else {
                name = props.chat.chat_id.substring(props.chat.chat_id.length-10, props.chat.chat_id.length);
            }
        return name;
    }

    return(
        <div onClick={()=> goToChat(props.chat)  }  className="chat__item">
            <img src={ icon } alt={ props.chat.name }/>
            <span>
                { getName() }
            </span>
            {
                // props.chat.is_online && <span className="chat__item-online">•</span>
            }
        </div>
    );
}
export default ChatItem;
