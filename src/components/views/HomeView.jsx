import React from "react";

import { OfficialCard } from "..";
import { Message } from "..";
import { MessageBoard } from "..";

// If you need cards or styling, you can uncomment the lines here to import
// import "./HomeView.css";
// import { OfficialCard } from "../";

const HomeView = props => {

  let msgs = [
    <Message user="User 1" text="hi yo, this is message 1" />,
    <Message user="User 2" text="hi yo, this is message 2" />,
    <Message user="User 3" text="hi yo, this is message 3" />
  ]

  return (
    <div>
      <h2>HomeView here</h2>
      <OfficialCard />
      <MessageBoard subject="Message Board" messages={msgs} />
    </div>
  );
};

export default HomeView;