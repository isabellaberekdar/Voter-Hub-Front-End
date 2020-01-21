import axios from "axios"

// ACTION TYPES
const GET_OFFICIAL = "GET_OFFICIAL"
const GET_OFFICIALS = "GET_OFFICIALS"
const GET_PHOTO = "GET_PHOTO"
const GET_ARTICLES = "GET_ARTICLES"

// ACTION CREATORS
const getOfficial = official => {
  return {
    type: GET_OFFICIAL,
    payload: official
  }
}

const getOfficials = officials => {
  return {
    type: GET_OFFICIALS,
    payload: officials
  }
}

const getPhoto = photo => {
  return {
    type: GET_PHOTO,
    payload: photo
  }
}

const getArticles = articles => {
  return {
    type: GET_ARTICLES,
    payload: articles
  }
}

// THUNK CREATORS
export const getOfficialsThunk = address => async dispatch => {
  // console.log(address);
  try {
    // Query the api for the officials associated with the given address
    const { data } = await axios.get(
      `https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCzgqBJLDzmJQo5Cj7PVBKr7DS8fdH-c8M&address=${address.city}-${address.state}-${address.zip}`
    )
    // console.log("cantaloupe", data)
    dispatch(getOfficials(data))
  } catch (error) {
    console.log("Error in getOfficialsThunk:", error)
  }
}

export const getArticlesThunk = name => async dispatch => {
  try {
    const key = process.env.REACT_APP_MICROSOFT_KEY

    // Query the microsoft api for news articles about the given person
    const { data } = await axios.get(
      `https://api.cognitive.microsoft.com/bing/v7.0/news/search?q=${name}&count=5&offset=0&mkt=en-us&safeSearch=Off`,
      {
        headers: {
          "Ocp-Apim-Subscription-Key": key
        }
      }
    )

    const articles = data.value.map(article => {
      return {
        name: article.name,
        url: article.url,
        articleThumbnail: article.image.thumbnail.contentUrl,
        /* providerThumbnail: article.provider[0].image.thumbnail.contentUrl,  */
        description: article.description,
        provider: article.provider[0].name,
        datePublished: article.datePublished
      }
    })

    console.log(data.value)
    console.log(articles)

    dispatch(getArticles(articles)) // Passes an array of articles
  } catch (error) {
    console.log(error)
  }
}

export const getOfficialThunk = (division, officeIndex, officialIndex) => async dispatch => {
  try {
    let url = `https://www.googleapis.com/civicinfo/v2/representatives/${division}?key=AIzaSyCzgqBJLDzmJQo5Cj7PVBKr7DS8fdH-c8M`

    // Get the official
    const { data } = await axios.get(url)
    // console.log("DATA: ", data)
    // console.log("rutabaga", officeIndex, officialIndex)
    let payload = {
      office: data.offices[officeIndex],
      official: data.officials[data.offices[officeIndex].officialIndices[officialIndex]]
    }
    console.log(payload)
    dispatch(getOfficial(payload))
  } catch (error) {
    console.log("Error in getOfficialThunk:", error)
  }
}

// see if there is a faster way to get the id
// senate only?
// Middle initial???? maybe better to search by phone number
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

const initialState = {}

// REDUCER
const officialReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OFFICIALS:
      // create a new object, copy over everything from state, then add the new officials data that was fetched
      return {
        ...state,
        officials: action.payload
      }
    case GET_OFFICIAL:
      // create a new object, copy over everything from state, then add the new officials data that was fetched
      return {
        ...state,
        official: action.payload
      }
    case GET_PHOTO:
      return {
        ...state,
        photo: action.payload
      }
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload
      }
    default:
      return state
  }
}

export default officialReducer
