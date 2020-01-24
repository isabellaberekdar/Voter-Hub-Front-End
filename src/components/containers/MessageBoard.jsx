import MessageBoardCollection from ".."
import React, { Component } from "react"
import { connect } from "react-redux"
import axios from "axios"
import {
  getMessageBoardThunk,
  postThreadThunk
} from "../../store/utilities/message"

class MessageBoard extends Component {
  constructor() {
    super()
    this.state = {
      msgBoardArray: [],
      inputText: "",
      messageboardID: "",
      subjectInput: "",
      messageInput: ""
    }
  }


  handleSubjectChange = event => {
    this.setState({ subjectInput: event.target.value })
  }
  handleMessageChange = event => {
    this.setState({ messageInput: event.target.value })
  }

  handleFormSubmit = e => {
    e.preventDefault()
    if (this.props.isLoggedIn) {
      let data = {
        "threadInfo": {
          "officialId": this.props.officialId,
          "subject": this.state.subjectInput
        },
        "messageInfo": {
          "user": this.props.userEmail,
          "text": this.state.messageInput
        }
      }
      this.props.postThread(data)
    } else {
      alert("You must log in to make a post.")
    }
  }

  getMessageBoards = async () => {
    var res = await axios.get("http://localhost:5000/api/messages/messageboard")
    await this.setState({ msgBoardArray: res.data })
    // console.log("this msgBoard", this.state.msgBoardArray);
  }

  componentDidMount() {
    console.log(this.props)
    this.props.getMessageBoard(this.props.officialId)
    // get all threads where the officialId is the id of this official
  }

  componentDidUpdate(prevProps) {
    
    if (prevProps.officialId != this.props.officialId) {
      this.props.getMessageBoard(this.props.officialId)
    }
  }
  //life cycle: constructor, render, componentDidMount, re-render
  render() {
 

    console.log("peach", this.props)
    let officialId = 1
    if (this.state.msgBoardArray.length > 0) {
      var threads = this.state.msgBoardArray.map(msgBoard => (
        <div>
          {msgBoard.officialId === officialId ? (
            <li>
              <a href={`/thread/${msgBoard.id}`}>{msgBoard.subject}</a>
              <br />
              Thread ID: {msgBoard.id} <br />
            </li>
          ) : (
            <div></div>
          )}
        </div>
      ))
    }

    return (
      <div>
        {threads}
        <form onSubmit={this.handleFormSubmit}>
          <h3>New Thread</h3>
          Subject
          <input
            id="subject"
            type="text"
            placeholder="Thread subject"
            required
            subjectInput={this.state.subjectInput}
            handleSubjectChange={this.state.handleSubjectChange}
            onChange={this.handleSubjectChange}
          ></input>
          <br />
          Message
          <input
            id="message"
            type="text"
            placeholder="Enter the first message for this thread"
            required
            messageInput={this.state.messageInput}
            onChange={this.handleMessageChange}
          ></input>
          <br />
          <button type="subnmit">Create new thread</button>
        </form>
      </div>
    )
  }
}

//map state to props
const mapState = state => {
  return {
    userEmail: state.user.email,
    userId: state.user.id,
    isLoggedIn: !!state.user.id,
    threads: state.message.threads
  }
}

const mapDispatch = dispatch => {
  return {
    getMessageBoard: id => dispatch(getMessageBoardThunk(id)),
    postThread: data => dispatch(postThreadThunk(data))
  }
}

export default connect(mapState, mapDispatch)(MessageBoard)
