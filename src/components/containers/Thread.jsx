import MessageBoardCollection from ".."
import React, { Component } from "react"
import { connect } from "react-redux"
import axios from "axios"
import { getThreadThunk, postMessageThunk } from "../../store/utilities/message"
import { MessageCard } from ".."

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
      "penguinades",
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

  componentDidUpdate(prevProps) {
  }

  render() {
    console.log(this.props.messages)
    let messageDisplay
    if (this.props.messages) {
      //console.log("brocali", this.props.thread.messages)

      messageDisplay = this.props.messages.map(message => (
/*         {this.props.threadSubject}
 */        <li>{message.text}</li>
      ))
    }

    return (
      <div>
        {this.props.threadSubject}
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
    user: state.user,
    threadSubject: state.message.threadSubject
  }
}

const mapDispatch = dispatch => {
  return {
    getThread: threadId => dispatch(getThreadThunk(threadId)),
    postMessage: message => dispatch(postMessageThunk(message))
  }
}

export default connect(mapState, mapDispatch)(Thread)
