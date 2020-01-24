import MessageBoardCollection from ".."
import React, { Component } from "react"
import { connect } from "react-redux"
import axios from "axios"
import { getThreadThunk, postMessageThunk } from "../../store/utilities/message"
import { MessageCard, MessageCardFirst } from ".."

class Thread extends Component {
  constructor() {
    super()
    this.state = {
      //         msgBoardArray: [],
      //         inputText: "",
      //         messageboardID: ""
      inputText: ""
    }
  }

  // getThread = async () => {
  //     var res = await axios.get("http://localhost:5000/api/messages/messageboard/thread/1");
  //     await this.setState({ msgBoardArray: res.data});
  //     // console.log("this msgBoard", this.state.msgBoardArray);
  // }

  handleOnSubmit = e => {
    e.preventDefault()
    console.log(
      "acai",
      this.props.user.email,
      this.state.inputText,
      this.props.messages
    )

    if (this.props.isLoggedIn) {
      //post request; add message to database

      let msg = {
        user: this.props.user.email,
        text: this.state.inputText,
        messageBoardID: this.props.match.params.threadId
      }
      this.props.postMessage(msg)
      // axios.post("http://localhost:5000/api/messages", msg)
      // .then(this.props.postMessage(msg))

      //re-renders page to display new message
      //doesn't actually change state
      // .then(this.setState({ inputText: this.state.inputText }))
    } else {
      alert("Log in to post a request")
    }
  }

  handleOnChange = e => {
    this.setState({ inputText: e.target.value })
  }

  componentDidMount() {
    const id = this.props.match.params.threadId
    this.props.getThread(id)
  }

  componentDidUpdate(prevProps) {}

  render() {
    console.log(this.props.messages)
    let messages = [
      {
        id: 1,
        user: "Bob",
        text:
          "Hi my name is Bob. This is the first message. This is the first message. This is the first message. This is the first message.",
        messageBoardID: 1,
        createdAt: "2020-01-23T01:58:10.363Z",
        updatedAt: "2020-01-23T15:58:10.457Z",
        messageboardId: 1
      },
      {
        id: 2,
        user: "Joe",
        text:
          "Hi my name is Joe. This is the second message. This is the second message. This is the second message. This is the second message. This is the second message. This is the second message. This is the second message. This is the second message. This is the second message.",
        messageBoardID: 1,
        createdAt: "2020-01-23T03:58:10.367Z",
        updatedAt: "2020-01-23T15:58:10.461Z",
        messageboardId: 1
      },
      {
        id: 1,
        user: "Alice",
        text:
          "Hi my name is Alice. This is the third message. Undefined pumpkin.",
        messageBoardID: 1,
        createdAt: "2020-01-23T06:58:10.363Z",
        updatedAt: "2020-01-23T15:58:16.457Z",
        messageboardId: 1
      },
      {
        id: 2,
        user: "Ophelia",
        text: "Hi my name is Ophelia. This is the fourth message.",
        messageBoardID: 1,
        createdAt: "2020-01-23T15:58:12.367Z",
        updatedAt: "2020-01-23T19:58:12.461Z",
        messageboardId: 1
      }
    ]

    // DON'T FORGET TO UNCOMMENT THIS
    // this is commented so we can use placeholder hardcoded messages while styling the Threads pages
    // if (this.props.messages) {
    //   // console.log("broccoli", this.props.thread.messages)

    //   messageDisplay = this.props.messages.map(message => (
    //     <li>
    //       {message.text}
    //       {message.user}
    //       {message.createdAt}
    //     </li>
    //   ))
    // }
    // REPLACE THIS WITH THE CODE ABOVE
    // messages is a hardcoded array of message objects
    let messageFirst = (
      <MessageCardFirst
        message={messages[0]}
        commentCount={messages.length - 1}
      />
    )
    let messageDisplay = messages.slice(1).map(message => (
      <MessageCard message={message} />
      // <li>
      //   {message.text}
      //   {message.user}
      //   {message.createdAt}
      // </li>
    ))

    return (
      <div className="thread-container">
        {messageFirst}
        {messageDisplay}
        <form onSubmit={this.handleOnSubmit}>
          <input
            type="text"
            placeholder="Aa"
            onChange={this.handleOnChange}
            value={this.state.inputText}
          />
        </form>
      </div>
    )
  }
}

//map state to props
const mapState = state => {
  return {
    messages: state.message.messages,
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getThread: threadId => dispatch(getThreadThunk(threadId)),
    postMessage: message => dispatch(postMessageThunk(message))
  }
}

export default connect(mapState, mapDispatch)(Thread)
