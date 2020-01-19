import React from "react";
import Message from "..";

//MessageBoard is an array containing Message objects {name, text}
//has a prop "subject" and "messages"
const MessageBoard = props => {
    let allMessage = props.messages === "undefined" ? 
        "No Messages"
        : props.messages.map(message => 
            <div>{message}</div>
        );

    return <div>
        <h3>Subject: {props.subject}</h3>
        <p>All Messages: {allMessage}</p>
    </div>
}

export default MessageBoard;