import React from "react"

import "./MessageCardFirst.css"

const MessageCardFirst = props => {
  // const { user, text } = props;

  // var today = new Date();
  // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  // var dateTime = date+' '+time;

  console.log(props)

  // "2020-01-23T15:58:10.367Z"
  let datetime = new Date(props.message.createdAt)
  //   console.log(datetime.getDate())

  let date = ("0" + datetime.getDate()).slice(-2)
  let month = ("0" + (datetime.getMonth() + 1)).slice(-2) // Be careful! January is 0 not 1
  let year = datetime.getFullYear()

  let dateString = year + "-" + month + "-" + date
  let timeString =
    ("0" + datetime.getHours()).slice(-2) +
    ":" +
    ("0" + datetime.getMinutes()).slice(-2)

  return (
    <div className="first-message">
      <p className="first-meta">
        Posted by {props.message.user} {dateString} at {timeString}
      </p>

      <p className="first-text">{props.message.text}</p>
    </div>
  )
}

// Message.propTypes = {
//   user: PropTypes.string.isRequired,
//   text: PropTypes.string.isRequired,
// };

export default MessageCardFirst
