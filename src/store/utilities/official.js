import axios from "axios";

// ACTION TYPES
const GET_OFFICIAL = "GET_OFFICIAL";
const GET_OFFICIALS = "GET_OFFICIALS";
const GET_PHOTO = "GET_PHOTO";

// ACTION CREATORS
/* ** move api keys out ** */

const getOfficial = official => {
  return {
    type: GET_OFFICIAL,
    payload: official
  };
};

const getOfficials = officials => {
  return {
    type: GET_OFFICIALS,
    payload: officials
  };
};

const getPhoto = photo => {
  return {
    type: GET_PHOTO,
    payload: photo
  };
};

// THUNK CREATORS
export const getOfficialThunk = address => async dispatch => {
  console.log(address);
  try {
    // Query the api for the officials associated with the given address
    const data = await axios
      .get
      // `https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCzgqBJLDzmJQo5Cj7PVBKr7DS8fdH-c8M&address=${address.city}-${address.state}-${address.zip}`
      ();
    console.log(data);
    dispatch(getOfficial(data));
  } catch (error) {
    console.log("Error in getOfficialThunk:", error);
  }
};

// THUNK CREATORS
export const getOfficialsThunk = address => async dispatch => {
  // console.log(address);
  try {
    // Query the api for the officials associated with the given address
    const { data } = await axios.get(
      `https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCzgqBJLDzmJQo5Cj7PVBKr7DS8fdH-c8M&address=${address.city}-${address.state}-${address.zip}`
    );
    console.log("canteloupe", data);
    dispatch(getOfficials(data));
  } catch (error) {
    console.log("Error in getOfficialsThunk:", error);
  }
};

// see if there is a faster way to get the id
// senate only?
export const getPhotoThunk = (first, last, state) => async dispatch => {
  try {
    // get small list of local officials
    const { data } = await axios.get(
      `https://api.propublica.org/congress/v1/members/senate/${state}/current.json`,
      {
        headers: {
          "X-API-Key": "5nyWHyGLejmxUBanKJgsUjLedZa1IpLHIDxJVTr3"
        }
      }
    );
    // look for the official with the given name
    const person = data.results.find(
      person => person.first_name === first && person.last_name === last
    );
    // use the id to find their photo
    if (person) {
      const photo = `https://theunitedstates.io/images/congress/225x275/${person.id}.jpg`;
      dispatch(getPhoto(photo));
    } else {
      // if -1, the official was not found. Supply a default photo
    }
  } catch (error) {
    console.log("Error in getPhotoThunk:", error);
  }
};

const initialState = {};

// REDUCER
const officialReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OFFICIALS:
      // create a new object, copy over everything from state, then add the new officials data that was fetched
      return {
        ...state,
        officials: action.payload
      };
    case GET_OFFICIAL:
      // create a new object, copy over everything from state, then add the new officials data that was fetched
      return {
        ...state,
        official: action.payload
      };
    case GET_PHOTO:
      return {
        ...state,
        photo: action.payload
      };
    default:
      return state;
  }
};

export default officialReducer;
