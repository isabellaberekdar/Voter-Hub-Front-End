import MessageBoardCollection from "..";
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class MessageBoardCollectionContainer extends Component {
    constructor(){
        super();
        this.state = {
            msgBoardArray: [],
            inputText: ""
        }
    }

    handleChange = (event) => {
        this.setState({inputText: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // console.log("submitted");

        let message = {
            
        }
        axios.post(`http://localhost:5000/api/messages`, { message })
            .then(res => {
                console.log(res);
            })

    }

    getMessageBoards = async () => {    
        var res = await axios.get("http://localhost:5000/api/messages/messageboard");
        await this.setState({ msgBoardArray: res.data});
        console.log("this msgBoard", this.state.msgBoardArray);
    }
    
    componentDidMount() {
        this.getMessageBoards();
    }
    //life cycle: constructor, render, componentDidMount, re-render
    render(){
        let officialId = 1;
        if(this.state.msgBoardArray.length > 0){
            var threads = this.state.msgBoardArray.map(msgBoard => 
                <div>
                    {
                        msgBoard.officialId === officialId ? 
                        <li>
                            {msgBoard.subject}
                            <br/>
                            Message Board ID: {msgBoard.id}
                            <ol>
                                <form onSubmit={this.handleSubmit}>
                                    {
                                        msgBoard.messages.map(message => <div>
                                            <li>{message.user}: {'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'} {message.text}</li>
                                        </div>) 
                                    }
                                    <input type="text" placeholder="Aa" value={this.state.inputText} onChange={this.handleChange}/>
                                </form>
                            </ol>
                        </li>
                        : 
                        <div></div>    
                    }

                </div>
            )

        }   

        return <div>
            {threads}
        </div>
    }
}

export default MessageBoardCollectionContainer;