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
    }
    
    componentDidMount() {
        this.getOfficialsArray(); 
    }
    render(){
        return <div>
            
        </div>
    }
}

export default MessageBoardCollectionContainer;