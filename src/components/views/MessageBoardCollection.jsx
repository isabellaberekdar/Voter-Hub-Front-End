import React from "react";
import MessageBoard from "..";

//contains props official and messageBoardArray
const MessageBoardCollection = props => {

    let messageBoardArray = props.messageBoardArray.map(MessageBoard =>
        <div>{MessageBoard}</div>    
    )

    return <div>
        <h2>{props.official}'s MessageBoards</h2>
        {messageBoardArray}
    </div>
}

export default MessageBoardCollection;