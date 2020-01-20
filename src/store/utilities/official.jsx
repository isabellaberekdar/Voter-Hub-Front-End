import axios from "axios"

// ACTION TYPES
const GET_SINGLE_OFFICIAL = "GET_SINGLE_OFFICIAL"
const GET_OFFICIAL = "GET_OFFICIAL"
const GET_PHOTO = "GET_PHOTO"
// ACTION CREATORS
/* ** move api keys out ** */

const getOfficial = official => {
  return {
    type: GET_OFFICIAL,
    payload: official
  }
}

const getPhoto = photo => {
  return {
    type: GET_PHOTO,
    payload: photo
  }
}

const getSingleOfficial = official => {
  return {
    type: GET_SINGLE_OFFICIAL,
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

// see if there is a faster way to get the id
// senate only?
// Note: can get larger photos by replacing '225x275' with '450x550' or 'original'
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
    )

    // look for the official with the given name
    const person = data.results.find(
      person => person.first_name === first && person.last_name === last
    )

    // use the id to find their photo
    if (person) {
      const photo = `https://theunitedstates.io/images/congress/225x275/${person.id}.jpg`
      dispatch(getPhoto(photo))
    } else {
      // if -1, the official was not found. Supply a default photo
    }
  } catch (error) {
    console.log("Error in getPhotoThunk:", error)
  }
}


/* 
ocd-division/country:us
ocd-division/country:us/state:ny
ocd-division/country:us/state:ny/county:new_york
ocd-division/country:us/state:ny/place:new_york
more?

president/ VP:
ocd-division/country:us

Senator/Governor/Lieutenant Governor:
ocd-division/country:us/state:ny

New York City Comptroller/New York Public Advocate/Mayor
ocd-division/country:us/state:ny/place:new_york

Manhattan District Attorney/New York Manhattan Borough President
ocd-division/country:us/state:ny/county:new_york

NY Attorney General/NY State Comptroller
ocd-division/country:us/state:ny

-index of the rep in the array (defaults to 0)
*/

/* 
  Information that should be passed into the thunk:
  -the divisionId: ocd-division/country:us/state:ny
  -The position of the official in the array. Defaults to 0

  page links should look like /NY/place/nameofplace/index
*/

 export const getSingleOfficialThunk = (divisionId, index = 0) => async dispatch => {
  try {
    // divisionId will look something like: ocd-division/country:us/state:ny/place:new_york
    // split this by / first
    const query = divisionId.split('/')  

    // To do: state will not exist for the pres/vp so this needs to change


    // Now looks like: [ocd-division, country:us, state:ny, place:new_york]
    // Get the state from query[2]
    const state = query[2].split(':')[1]


    // If query[3] exists, we want to know if it specifies a place or county and what the name of it is
    let placeOrCounty = null
    let placeOrCountyName = null
    if (query.length > 3) {
      [ placeOrCounty, placeOrCountyName ] = query[3].split(':')
    }
    
    console.log('query: ', query)
    console.log('state: ', state)

    console.log('placeOrCounty: ', placeOrCounty)
    console.log('placeOrCountyName: ', placeOrCountyName)
    let url = ''
    if (placeOrCounty) {
      url = `https://www.googleapis.com/civicinfo/v2/representatives/ocd-division%2Fcountry%3Aus%2Fstate%3A${state}%2F${placeOrCounty}%3A${placeOrCountyName}?key=AIzaSyCzgqBJLDzmJQo5Cj7PVBKr7DS8fdH-c8M`
      
    }
    else {
      url = `https://www.googleapis.com/civicinfo/v2/representatives/ocd-division%2Fcountry%3Aus%2Fstate%3A${state}?key=AIzaSyCzgqBJLDzmJQo5Cj7PVBKr7DS8fdH-c8M`
    } 

    // Get the official
    const {data} = await axios.get(url)
    console.log('DATA: ', data.officials[index])
    dispatch(getSingleOfficial(data.officials[index]))

  } catch (error) {
    console.log("Error in getSingleOfficialThunk:", error)
  }
}




/* export const getSingleOfficialThunk = (first, last, state, index = 0, placeOrCounty = '', placeOrCountyName = '') => async dispatch => {
  try {
    let url = ''
    if (placeOrCounty === '') {
      url = 
    }
    else {
      url = `https://www.googleapis.com/civicinfo/v2/representatives/ocd-division%2Fcountry%3Aus%2Fstate%3A${state}%2F${placeOrCounty} %3A${placeOrCountyName}?key=AIzaSyCzgqBJLDzmJQo5Cj7PVBKr7DS8fdH-c8M`
    } 
    const data = await axios.get(
      url
    )    
  } catch (error) {
    console.log("Error in getSingleOfficialThunk:", error)
  }
} */

// REDUCER
const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_OFFICIAL:
      // create a new object, copy over everything from state, then add the new officials data that was fetched
      return {
        ...state,
        officials: action.payload
      }
    case GET_PHOTO:
      return {
        ...state,
        photo: action.payload
      }
    case GET_SINGLE_OFFICIAL:
      return {
        ...state,
        singleOfficial: action.payload
      }
    default:
      return state
  }
}

export default reducer
