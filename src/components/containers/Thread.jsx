import MessageBoardCollection from ".."
import React, { Component } from "react"
import { connect } from "react-redux"
import axios from "axios"
import { getThreadThunk } from "../../store/utilities/message"
import { MessageCard } from ".."

class Thread extends Component {
  // constructor(){
  //     super();
  //     this.state = {
  //         msgBoardArray: [],
  //         inputText: "",
  //         messageboardID: ""
  //     }
  // }

  // handleChange = (event) => {
  //     this.setState({inputText: event.target.value});
  // }

  // getThread = async () => {
  //     var res = await axios.get("http://localhost:5000/api/messages/messageboard/thread/1");
  //     await this.setState({ msgBoardArray: res.data});
  //     // console.log("this msgBoard", this.state.msgBoardArray);
  // }

  handleOnSubmit = () => {
    
  }

  componentDidMount() {
    const id = this.props.match.params.threadId
    this.props.getThread(id)
  }

  render() {
    let messageDisplay
    if (this.props.messages) {
      console.log(this.props.messages)
      messageDisplay = this.props.messages.messages.map(message => (
        <li>{message.text}</li>
      ))
    }

    return (
      <div>
        THREAD HERE
        {messageDisplay}
        <input type="text" placeholder="Aa" onSubmit={this.handleOnSubmit}/>
      </div>
    )
  }
}

//map state to props
const mapState = state => {
  return {
    messages: state.message.messages
  }
}

const mapDispatch = dispatch => {
  return {
    getThread: threadId => dispatch(getThreadThunk(threadId))
  }
}

export default connect(mapState, mapDispatch)(Thread)
