import axios from "axios"

// messageboard = a collection of threads

// ACTION TYPES
const GET_MESSAGEBOARD = "GET_MESSAGEBOARD"
const POST_MESSAGE = "POST_MESSAGE"
const GET_THREAD = "GET_THREAD"
const POST_THREAD = "POST_THREAD"

// ACTION CREATORS

const getMessageBoard = messageBoard => {
  return {
    type: GET_MESSAGEBOARD,
    payload: messageBoard
  }
}

const postMessage = message => {
  return {
    type: POST_MESSAGE,
    payload: message
  }
}

const getThread = messages => {
  return {
    type: GET_THREAD,
    payload: messages
  }
}

const postThread = newThread => {
  return {
    type: POST_THREAD,
    payload: newThread
  }
}

//return all the threadsnpm
export const getMessageBoardThunk = messageBoardId => async dispatch => {
  // console.log(address);
  try {
    console.log("blueberry")
    // Query the api for the officials associated with the given address
    const { data } = await axios.get(
      `http://localhost:5000/api/messages/messageboard/${messageBoardId}`
    )
    console.log("cantaloupe", data)
    dispatch(getMessageBoard(data))
  } catch (error) {
    console.log("Error in getOfficialsThunk:", error)
  }
}

//return all the threads
export const getThreadThunk = threadId => async dispatch => {
  // console.log(address);
  try {
    console.log("penguin berry")
    // Query the api for the officials associated with the given address
    const { data } = await axios.get(
      `http://localhost:5000/api/messages/messageboard/thread/${threadId}`
    )
    console.log("cantaloupe berry", data.messages)
    dispatch(getThread(data.messages))
  } catch (error) {
    console.log("Error in getThreadThunk:", error)
  }
}

export const postMessageThunk = message => async dispatch => {
  try {
    let newMessage = await axios.post(
      "http://localhost:5000/api/messages",
      message
    )
    console.log("pikachu", newMessage.datas)
    dispatch(postMessage(newMessage.data))
  } catch (error) {
    console.log("Error in postMessageThunk", error)
  }
}

//info has thread and message
export const postThreadThunk = info => async dispatch => {
  try {
    // const headers = {
    //   "Content-Type": "application/json"
    // }
    let { data } = await axios.post(
      "http://localhost:5000/api/messages/messageboard",
      info
      // {
      //   headers: headers
      // }
    ) //in backend, thread is returned
    console.log("Pichu", data)
    dispatch(postThread(data))
  } catch (error) {
    console.log("Error in postMessageThunk", error)
  }
}

const initialState = {}

// REDUCER
const officialReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGEBOARD:
      return {
        ...state,
        threads: action.payload
      }
    case GET_THREAD:
      return {
        ...state,
        messages: action.payload
      }
    case POST_MESSAGE:
      console.log("chicken", state.messages)
      return {
        ...state,
        messages: [...state.messages, action.payload]
      }
    case POST_THREAD:
      return {
        ...state,
        threads: [...state.threads, action.payload]
      }

    default:
      return state
  }
}

export default officialReducer
