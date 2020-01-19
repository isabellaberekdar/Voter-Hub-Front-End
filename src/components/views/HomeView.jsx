import React from "react";

import { OfficialCard } from "..";
import { Message } from "..";
import { MessageBoard } from "..";
import MessageBoardCollection from "./MessageBoardCollection";

// If you need cards or styling, you can uncomment the lines here to import
// import "./HomeView.css";
// import { OfficialCard } from "../";

const HomeView = props => {

  //dummy data
  let msgs = [
    <Message user="User 1" text="hi yo, this is message 1" />,
    <Message user="User 2" text="hi yo, this is message 2" />,
    <Message user="User 3" text="hi yo, this is message 3" />
  ]
  let msgboards = [
    <MessageBoard subject="Message Board" messages={msgs} />,
    <MessageBoard subject="Message Board" messages={msgs} />,
    <MessageBoard subject="Message Board" messages={msgs} />
  ]


  return (
    <div>
      <h2>HomeView here</h2>
      <OfficialCard />
      <MessageBoard subject="Message Board" messages={msgs} />
      <MessageBoardCollection official="Obama" messageBoardArray={msgboards} />
    </div>
  );
};

export default HomeView;