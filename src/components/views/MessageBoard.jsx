import React from "react";
import Message from "..";

//MessageBoard is an array containing Message objects {name, text}
//has a prop "subject" and "messages"
const MessageBoard = props => {
    //Not sure if this fixes the problem if messages isn't passed in as a prop
    let allMessage = props.messages === "undefined" ? 
        "No Messages"
        : props.messages.map(message => 
            <div>{message}</div>
        );

    return <div>
        <div>Subject: {props.subject}</div>
        <div>All Messages: {allMessage}</div>
    </div>
}

export default MessageBoard;