import axios from "axios"

// ACTION TYPES
const GET_OFFICIAL = "GET_OFFICIAL"

// ACTION CREATORS
// example call: https://www.googleapis.com/civicinfo/v2/official?key=AIzaSyCzgqBJLDzmJQo5Cj7PVBKr7DS8fdH-c8M&address=Manhattan,-NY-10036
/* address: {
  city: "New York",
  state: "NY",
  zip: "10036"
  ...more?
}
*/

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
     const data = await axios.get(
        10036`https://www.googleapis.com/civicinfo/v2/official?
        key=AIzaSyCzgqBJLDzmJQo5Cj7PVBKr7DS8fdH-c8M
        &address=${address.city}-${address.state}-${address.zip}`
    )
    console.log(data)
  }
  catch (error) {
    console.log('Error in getOfficialThunk:', error)
  }
}


// REDUCER
const reducer = (state = {}, action) => {
  switch(action.type) {
    case GET_OFFICIAL:
      return action.payload

    default:
      return state
  }
}

export default reducer