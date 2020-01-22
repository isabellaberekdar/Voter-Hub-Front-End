import axios from "axios"

// messageboard = a collection of threads


// ACTION TYPES
const GET_MESSAGEBOARD = "GET_MESSAGEBOARD"
const POST_MESSAGE = "POST_MESSAGE"

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

//return all the threads 
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



// // THUNK CREATORS
// export const getOfficialsThunk = searchbarValue => async dispatch => {
//   // console.log(address);
//   try {
//     // Query the api for the officials associated with the given address
//     const { data } = await axios.get(
//       `https://www.googleapis.com/civicinfo/v2/representatives?address=${searchbarValue}&key=AIzaSyCzgqBJLDzmJQo5Cj7PVBKr7DS8fdH-c8M`
//     )
//     // console.log("cantaloupe", data)
//     dispatch(getOfficials(data))
//   } catch (error) {
//     console.log("Error in getOfficialsThunk:", error)
//   }
// }

const initialState = {}

// REDUCER
const officialReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_MESSAGEBOARD:
          return {
              ...state, 
              threads: action.payload
          }
    // case GET_OFFICIALS:
    //   // create a new object, copy over everything from state, then add the new officials data that was fetched
    //   return {
    //     ...state,
    //     officials: action.payload
    //   }
    // case GET_OFFICIAL:
    //   // create a new object, copy over everything from state, then add the new officials data that was fetched
    //   return {
    //     ...state,
    //     official: action.payload
    //   }
    // case GET_PHOTO:
    //   return {
    //     ...state,
    //     photo: action.payload
    //   }
    // case GET_ARTICLES:
    //   return {
    //     ...state,
    //     articles: action.payload
    //   }
    // case STORE_NAME:
    //   return {
    //     ...state,
    //     nameObj: action.payload
    //   }
    // case GET_CID:
    //   return {
    //     ...state,
    //     cid: action.payload
    //   }
    default:
      return state
  }
}

export default officialReducer
