import MessageBoardCollection from "..";
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getMessageBoardThunk } from "../../store/utilities/message";
import '../views/MessageBoard.css'

const threads = [
    {
        id: 1,
        subject: 'General'
    },
    {
        id: 2,
        subject: 'Thread title 2'
    },
    {
        id: 3,
        subject: 'Thread 3 :)'
    },
    {
        id: 4,
        subject: 'This is the fourth thread'
    },
    {
        id: 5,
        subject: 'Who is this?'
    },
]


class MessageBoard extends Component {
    constructor(){
        super();
        this.state = {
            msgBoardArray: [],
            inputText: "",
            messageboardID: ""
        }
    }

    handleChange = (event) => {
        this.setState({inputText: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // console.log("submitted");
        console.log("id", this.state.messageboardID);
        let message = {
            user: 'cats@gmail.cpom',
            text: 'sucessful post',
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
        axios.post('http://localhost:5000/api/messages', {
            user: "asdass",
            text: "scc",
            messageboardID: 1
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

    }

    getMessageBoards = async () => {    
        var res = await axios.get("http://localhost:5000/api/messages/messageboard");
        await this.setState({ msgBoardArray: res.data});
        // console.log("this msgBoard", this.state.msgBoardArray);
    }
    
    componentDidMount() {
        this.getMessageBoards();
        this.props.getMessageBoard(1);
    }
    //life cycle: constructor, render, componentDidMount, re-render

    
    render(){
        let officialId = 1;
        return (
            <div className='message-board'>
                <h3>Messageboard</h3>
                {threads.map(thread => 
                    <div className='thread'>
                        {
                            <li>
                                <a href={`/thread/${thread.id}`}>{thread.subject}</a>
                                <br/>
                                Thread ID: {thread.id} <br/>
                            </li>
                                
                        }
    
                    </div>
                )}

            </div>
        )
        }
    }
    
    //map state to props
    
/*         if(this.state.msgBoardArray.length > 0){
    var threads = this.state.msgBoardArray.map(msgBoard => 
        <div>
            {
                msgBoard.officialId === officialId ? 
                <li>
                    <a href={`/thread/${msgBoard.id}`}>{msgBoard.subject}</a>
                    <br/>
                    Thread ID: {msgBoard.id} <br/>
                </li>
                : 
                <div></div>    
            }

        </div>
    ) */

/*  }  */  
/* 
return <div>
{threads} */
    const mapState = state => {
    return {
      userEmail: state.user.email
    }
  }

const mapDispatch = dispatch => {
    return {
        getMessageBoard: (id) => dispatch(getMessageBoardThunk(id))
    }
};

export default connect(mapState,mapDispatch)(MessageBoard)
