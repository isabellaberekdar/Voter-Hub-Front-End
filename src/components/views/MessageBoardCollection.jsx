import React from "react"
import MessageBoard from ".."


//contains props official and messageBoardArray
const MessageBoardCollection = props => {
  const { official, messageBoardArray } = props

  let messageBoardArr = messageBoardArray.map(MessageBoard => (
    <div>{MessageBoard}</div>
  ))

    return <div>
        <h2 id="msgboard-title">{official}'s MessageBoards</h2>
        {messageBoardArr}
    </div>
  )
}

export default MessageBoardCollection
