import React from 'react';
import './Room-title.css';

const RoomTitle = (props: any) => {
    return (
        <div className="RoomTitle">
            <h1>{props.chatroomName}</h1>
        </div>
    );
}

export default RoomTitle;
