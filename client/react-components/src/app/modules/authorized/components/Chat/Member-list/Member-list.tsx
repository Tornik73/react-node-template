import React, {useRef} from "react";
import MemberItem from "../Member-item/Member-item";
import './Member-list.css';
import {ChatMember} from "../../../entities/chat/chat.entity";

interface Props {
    members: ChatMember[];
    me: any;
}
const MemberList = (props: Props) => {
    const members = props.members.map((member: ChatMember) =>
        <MemberItem  key={member.user_id} member={member} me={props.me} />
    );

    return (
        <section className="member__list">
            <h3 className={'member__title'}>Members</h3>
            <div>
                {members}
            </div>

        </section>
    );
}
export default MemberList;
