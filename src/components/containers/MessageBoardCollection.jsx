import MessageBoardCollection from "..";
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class MessageBoardCollectionContainer extends Component {
    constructor(){
        super();
        this.state = {
            // officials : [],
            msgBoardArray: []
        }
    }
    
    // getOfficialsArray = async () => {
    //     var res = await axios.get("http://localhost:5000/api/messages/messageboardcollection");
    //     await this.setState({ officials: res.data});
    //     console.log("this official", this.state.officials);
    //     // console.log("messages array: ", this.state.officials[0].messageboards);
    // }
    getMessageBoards = async () => {
        var res = await axios.get("http://localhost:5000/api/messages/messageboard");
        await this.setState({ msgBoardArray: res.data});
        console.log("this msgBoard", this.state.msgBoardArray);
    }
    
    componentDidMount() {
        // this.getOfficialsArray(); 
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
                            <ol>
                                {
                                    msgBoard.messages.map(message => <div>
                                        <li>{message.user}: {'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'} {message.text}</li>
                                    </div>) 
                                }
                            </ol>
                        </li>
                        : 
                        <div></div>    
                    }

                </div>
            )

        }   

        // console.log(`message board ${this.state.officials}`)

        // let threads = this.state.officials[0].messageboards.map(msgboard => 
        //     <li>{msgboard.subject}</li>
        // );
        return <div>
            {/* <h3>{this.state.officials[0]}</h3> */}
            {threads}
        </div>
    }
}

export default MessageBoardCollectionContainer;