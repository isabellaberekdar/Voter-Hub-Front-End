import MessageBoardCollection from "..";
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class MessageBoardCollectionContainer extends Component {
    constructor(){
        super();
        this.state = {
            officials : []
        }
    }
    
    getOfficialsArray = async () => {
        var res = await axios.get("http://localhost:5000/api/messages/messageboardcollection");
        await this.setState({ officials: res.data});
        console.log(this.state.officials);
        // console.log("messages array: ", this.state.officials[0].messageboards);
    }
    
    componentDidMount() {
        this.getOfficialsArray(); 
    }
    render(){
        let officialDisplay = this.state.officials.map(offi => 
            <div>
                <h3>Official: {offi.officialName}</h3>
                {/* <div>{offi.messageboards}</div> */}
            </div>
        )
        return <div>
            {officialDisplay}
        </div>
    }
}

export default MessageBoardCollectionContainer;