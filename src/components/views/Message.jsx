import React from "react";

const Message = props => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return <div>
        <h3>User:{props.user}</h3>
        <p>Text: {props.text}</p>
        <p>Date: {dateTime} </p>
    </div>
};

// Message.propTypes = {
//   user: PropTypes.string.isRequired,
//   text: PropTypes.string.isRequired,
// };

export default Message;