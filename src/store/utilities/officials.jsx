import axios from "axios";

// ACTION TYPES
const GET_OFFICIALS = "GET_OFFICIALS";

// ACTION CREATORS
/* ** move api keys out ** */

const getOfficials = officials => {
  return {
    type: GET_OFFICIALS,
    payload: officials
  };
};

// THUNK CREATORS
export const getOfficialsThunk = address => async dispatch => {
  // console.log(address);
  try {
    // Query the api for the officials associated with the given address
    const data = await axios.get(
      `https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCzgqBJLDzmJQo5Cj7PVBKr7DS8fdH-c8M&address=${address.city}-${address.state}-${address.zip}`
    );
    console.log(data);
    dispatch(getOfficials(data));
  } catch (error) {
    console.log("Error in getOfficialsThunk:", error);
  }
};

const initialState = {};

// REDUCER
const officialsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OFFICIALS:
      // create a new object, copy over everything from state, then add the new officials data that was fetched
      return {
        ...state,
        officials: action.payload
      };
    default:
      return state;
  }
};

export default officialsReducer;
