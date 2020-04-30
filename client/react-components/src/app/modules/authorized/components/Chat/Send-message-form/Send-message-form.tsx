import React, {useState} from 'react';
import './Send-message-form.css';
import {ChatMember, ChatMessage} from "../../../entities";


interface Props {
    onSendNewMessage: (msg: string) => void ;
}
function SendMessageForm(props: any) {
    const [message, setMessage] = useState('');
    const [sendMessageButtonState, setSendMessageButtonState] = useState(false);
    const currentMessageChanged = (e: any) => {
        setMessage(e.target.value);
    }

    const sendMessageClicked = async (e: any) => {
        setSendMessageButtonState(true);
        e.preventDefault();
        if (message.length > 0) {
            await props.onSendNewMessage(message);
            setMessage('');
            setSendMessageButtonState(false);
        }
    }
    return (
        <section className="send-message">
            <form className='send-message__form'>
                <input
                    type="text"
                    className='send-message__input'
                    value={message}
                    onChange={currentMessageChanged}
                    placeholder="Type message to send"/>
                <button
                    type="submit"
                    className='send-message__button'
                    onClick={sendMessageClicked}
                    disabled={sendMessageButtonState}
                >
                    Send
                </button>
            </form>
        </section>
    );
}
export default SendMessageForm;
