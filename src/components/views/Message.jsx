import React from "react";

const Message = props => {
    const { user, text } = props;

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    return <div>
        <h3>User:{user}</h3>
        <p>Text: {text}</p>
        <p>Date: {dateTime} </p>
    </div>
};

// Message.propTypes = {
//   user: PropTypes.string.isRequired,
//   text: PropTypes.string.isRequired,
// };

export default Message;