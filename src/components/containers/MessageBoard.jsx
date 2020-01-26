import MessageBoardCollection from ".."
import React, { Component } from "react"
import { connect } from "react-redux"
import "../views/Messageboard.css"
import axios from "axios"
import { getMessageBoardThunk, postThreadThunk } from "../../store/utilities/message"

class MessageBoard extends Component {
  constructor() {
    super()
    this.state = {
      msgBoardArray: [],
      inputText: "",
      messageboardID: "",
      subjectInput: "",
      messageInput: "",
      newThread: false
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
        threadInfo: {
          officialId: this.props.officialId,
          subject: this.state.subjectInput
        },
        messageInfo: {
          user: this.props.userEmail,
          text: this.state.messageInput
        }
      }
      this.props.postThread(data)
    } else {
      alert("You must log in to make a post.")
    }
  }

  getMessageBoards = async () => {
    var res = await axios.get("http://voterhub.herokuapp.com/api/messages/messageboard")
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
  toggleForm = () => {
    this.setState({ newThread: !this.state.newThread })
  }
  render() {
    if (this.props.threads && this.props.threads.length > 0) {
      var threads = this.props.threads.map(thread => {
        // parse time created string into date and time
        const created = thread.createdAt.split("T")
        const date = thread.createdAt.split("T")[0]
        const time = thread.createdAt.split("T")[1].split(".")[0]
        return (
          <div className='thread'>
            <span className='posted-by'>
              Posted on {date} at {time}{" "}
            </span>
            <a href={`/thread/${thread.id}`}>{thread.subject}</a>
          </div>
        )
      })
    }

    return (
      <div className='message-board'>
        <p id="messageboard-anchor" class="down-triangle">▼</p>
        <h3 className="msgboard-title">Messageboard</h3>
        {threads}
         <div className='new-thread'>
         <h3>New Thread</h3>
          <button onClick={this.toggleForm}>{'New thread +'}</button>
         </div>
        
        {this.state.newThread ? (
          <form className='new-form' onSubmit={this.handleFormSubmit}>
            Subject
            <input
              id='subject'
              type='text'
              placeholder='Thread subject'
              required
              subjectInput={this.state.subjectInput}
              handleSubjectChange={this.state.handleSubjectChange}
              onChange={this.handleSubjectChange}
              ></input>
            <button type='subnmit'>{'Create new thread'}</button>
          </form>
        ) : null}
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
