import axios from "axios"

// ACTION TYPES
const GET_OFFICIAL = "GET_OFFICIAL"

// ACTION CREATORS
/* ** move api keys out ** */

const getOfficial = official => {
  return {
    type: GET_OFFICIAL,
    payload: official
  }
}

// THUNK CREATORS
export const getOfficialThunk = address => async dispatch => {
  try {
    // Query the api for the officials associated with the given address
    const data = await axios.get(
      `https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCzgqBJLDzmJQo5Cj7PVBKr7DS8fdH-c8M&address=${address.city}-${address.state}-${address.zip}`
    )
    console.log(data)
    dispatch(getOfficial(data))
  } catch (error) {
    console.log("Error in getOfficialThunk:", error)
  }
}

// REDUCER
const reducer = (state = {}, action) => {
  switch (action.type) {
    
    case GET_OFFICIAL:
      // create a new object, copy over everything from state, then add the new officials data that was fetched
      return {
        ...state,
        officials: action.payload
      }
    default:
      return state
  }
}

export default reducer