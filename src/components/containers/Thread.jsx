import MessageBoardCollection from ".."
import React, { Component } from "react"
import { connect } from "react-redux"
import axios from "axios"
import {
  getThreadThunk,
  postMessageThunk,
  deleteMessageThunk
} from "../../store/utilities/message"
import { MessageCard, MessageCardFirst } from ".."
import "./Thread.css"

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

  handleDelete = message => {
    console.log("props", this.props)
    console.log("deleting message in Thread.jsx", message)
    this.props.deleteMessage(message)
  }
  componentDidMount() {
    const id = this.props.match.params.threadId
    this.props.getThread(id)
  }

  componentDidUpdate(prevProps) {}

  render() {
    // console.log(this.props.messages)

    // DON'T FORGET TO UNCOMMENT THIS
    // this is commented so we can use placeholder hardcoded messages while styling the Threads pages
    // if (this.props.messages) {
    //   // console.log("broccoli", this.props.thread.messages)
    /* 
       messageDisplay = this.props.messages.map(message => (
         <li>
           {message.text}
           {message.user}
           {message.createdAt}
         </li>
      ))
    } */
    // REPLACE THIS WITH THE CODE ABOVE
    // messages is a hardcoded array of message objects
    /*     let messageFirst = (
      <MessageCardFirst
        message={messages[0]}
        commentCount={messages.length - 1}
      />
    ) */
    let messageDisplay
    if (this.props.messages) {
      messageDisplay = this.props.messages.map(message => (
        <div>
          {console.log("message", message)}
          <MessageCard
            message={message}
            handleDelete={() => this.handleDelete(message)}
          />
          {/* <li>{message}</li> */}
        </div>
        /*        <li>
           {message.text}
           {message.user}
           {message.createdAt}
         </li> */
      ))
    }

    return (
      <div className="thread-container">
        <h1 className="thread-subject">{this.props.threadSubject}</h1>
        {/*  {messageFirst} */}
        {messageDisplay}
        <form className="new-message-form" onSubmit={this.handleOnSubmit}>
          <p>Post New Comment</p>
          <textarea
            rows="5"
            cols="50"
            required
            onChange={this.handleOnChange}
          ></textarea>
          {/* 
            <input
              id='subject'
              type='text'
              placeholder='Enter a message'
              required
              value={this.state.inputText}
              handleSubjectChange={this.state.handleSubjectChange}
              onChange={this.handleOnChange}
              
              ></input> */}
          <button type="subnmit">{"Post"}</button>
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
    user: state.user,
    threadSubject: state.message.threadSubject
  }
}

const mapDispatch = dispatch => {
  return {
    getThread: threadId => dispatch(getThreadThunk(threadId)),
    postMessage: message => dispatch(postMessageThunk(message)),
    deleteMessage: message => dispatch(deleteMessageThunk(message))
  }
}

export default connect(mapState, mapDispatch)(Thread)
