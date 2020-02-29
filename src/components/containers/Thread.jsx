import MessageBoardCollection from ".."
import React, { Component } from "react"
import { connect } from "react-redux"
import { getThreadThunk, postMessageThunk, deleteMessageThunk } from "../../store/utilities/message"
import { MessageCard, MessageCardFirst } from ".."
import "./Thread.css"

class Thread extends Component {
  constructor() {
    super()
    this.state = {
      inputText: ""
    }
  }

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
    } else {
      alert("Log in to post a request")
    }
  }

  handleOnChange = e => {
    this.setState({ inputText: e.target.value })
  }

  handleDelete = message => {
    this.props.deleteMessage(message)
  }
  componentDidMount() {
    const id = this.props.match.params.threadId
    this.props.getThread(id)
  }

  render() {
    let messageDisplay
    let { messages, user, threadSubject } = this.props

    if (messages) {
      messageDisplay = messages.map(message => (
        <div>
          <MessageCard
            message={message}
            handleDelete={() => this.handleDelete(message)}
            loggedInUser={user.email}
          />
        </div>
      ))
    }

    return (
      <div className='thread-container'>
        <h1 className='thread-subject'>{threadSubject}</h1>
        {messageDisplay}
        <form className='new-message-form' onSubmit={this.handleOnSubmit}>
          <p>Post New Comment</p>
          <textarea rows='5' cols='50' required onChange={this.handleOnChange}></textarea>
          <button type='subnmit'>{"Post"}</button>
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
