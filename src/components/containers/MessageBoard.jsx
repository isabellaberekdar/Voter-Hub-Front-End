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

  handleChange = event => {
    this.setState({ inputText: event.target.value })
  }
  handleSubjectChange = event => {
    this.setState({ subjectInput: event.target.value })
  }
  handleMessageChange = event => {
    this.setState({ messageInput: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    // console.log("submitted");
    console.log("id", this.state.messageboardID)
    let message = {
      user: "cats@gmail.cpom",
      text: "sucessful post",
      // user: this.props.userEmail,
      // text: this.state.inputText,
      // messageboardID: this.state.messageboardID
      messageboardID: 1
    }
    // axios.post("http://localhost:5000/api/messages", { message })
    //     .then(res => {
    //         console.log(res);
    //         console.log("posted")
    //     })
    axios
      .post("http://localhost:5000/api/messages", {
        user: "asdass",
        text: "scc",
        messageboardID: 1
      })
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  handleFormSubmit = e => {
    e.preventDefault()
    // axios.post("http://localhost:5000/api/messages/messageboard", payload)
    console.log("Whale Pancake")
    if (this.props.isLoggedIn) {
      let data = {
        threadInfo: {
          officialId: this.props.officialId,
          subject: this.state.subject
        },
        messageInfo: {
          id: this.props.userId,
          user: this.props.userEmail,
          text: this.state.messageInput
        }
      }
      this.props.postThread()
    } else {
      alert("User not logged in!")
    }
  }

  getMessageBoards = async () => {
    var res = await axios.get("http://localhost:5000/api/messages/messageboard")
    await this.setState({ msgBoardArray: res.data })
    // console.log("this msgBoard", this.state.msgBoardArray);
  }

  componentDidMount() {
    this.getMessageBoards()
    this.props.getMessageBoard(1)
  }
  //life cycle: constructor, render, componentDidMount, re-render
  render() {
    console.log("peach", this.props.officialId)
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
            placeholder="Coconut Human"
            required
            subjectInput={this.state.subjectInput}
            handleSubjectChange={this.state.handleSubjectChange}
          ></input>
          <br />
          Message
          <input
            id="message"
            type="text"
            placeholder="Aa"
            required
            messageInput={this.state.messageInput}
          ></input>
          <br />
          <button type="subnmit">Submit</button>
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
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getMessageBoard: id => dispatch(getMessageBoardThunk(id)),
    postThread: data => dispatch(postThreadThunk(data))
  }
}

export default connect(mapState, mapDispatch)(MessageBoard)
