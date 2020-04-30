import React from "react";
import './Member-item.css';
import icon from './icon.svg';
import {ChatMember} from "../../../entities/chat/chat.entity";

interface Props {
    member: ChatMember;
    me: any;
}
const MemberItem = (props: Props) => {

    function getName(){
        let name = '';
        if (props.member.user_id === props.me.uuid) {
            if(props.me.name) {
                name = props.me.name
            }
            else {
                name = props.me.uuid.substring(props.me.uuid.length-10, props.me.uuid.length);
            }
        }
        else {
            if(props.member.email){
                name = props.member.email
            }
            else {
                name = props.member.user_id.substring(props.member.user_id.length-10, props.member.user_id.length);
            }
        }
        return name;
    }

    return(
        <div className="member__item">
            <img src={ icon } alt={ props.member.email }/>
            <span>
                { getName() }
                {
                    props.member.user_id === props.me.uuid && " (Вы) "
                }
            </span>
            {
                // props.member.is_online && <span className="member__item-online">•</span>
            }
        </div>
    );
}
export default MemberItem;
