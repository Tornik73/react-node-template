import {useState} from "react";
import React from 'react';
import LogoHeader from "../Logo-header/Logo-header";
import RoomTitle from "../Room-title/Room-title";
import './Header-chat.css';
import {User} from "../../../../../redux/models/reducers";

interface Props {
    chatroomName: string;
    me: User;
}
export const HeaderChat = (props: Props) => {
    const [name, setName] = useState(props.me.name ? props.me.name : props.me.user_id.substr(-10))

    const handleChangeName = (e: any) => {
        setName(e.target.value)
        let visitor = {...props.me};
        visitor.name = e.target.value;
        // props.updateVisitor(visitor)
    }
    return (
        <div className='header__chat'>
            <LogoHeader/>
            <RoomTitle chatroomName={props.chatroomName}/>
            {/*{*/}
            {/*    props.me ?*/}
            {/*        <input*/}
            {/*            className='name__input'*/}
            {/*            value={name}*/}
            {/*            placeholder='Ваше имя'*/}
            {/*            onChange={(e) => handleChangeName(e)}*/}
            {/*        />*/}
            {/*        : null*/}
            {/*}*/}
        </div>
    );
}
