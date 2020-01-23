import axios from "axios"

// ACTION TYPES
const GET_OFFICIAL = "GET_OFFICIAL"
const GET_OFFICIALS = "GET_OFFICIALS"
const GET_PHOTO = "GET_PHOTO"
const GET_ARTICLES = "GET_ARTICLES"
const GET_CID = "GET_CID"
const STORE_NAME = "STORE_NAME"
const GET_FUNDERS = "GET_FUNDERS"
const STORE_STATE = "STORE_STATE"
const STORE_CD = "STORE_CD"
const STORE_ZIP = "STORE_ZIP"
const STORE_COORDS = "STORE_COORDS"

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

export const storeName = info => {
  return {
    type: STORE_NAME,
    payload: info
  }
}

export const getCid = info => {
  return {
    type: GET_CID,
    payload: info
  }
}

export const getFunders = funders => {
  return {
    type: GET_FUNDERS,
    payload: funders
  }
}

export const storeState = stateAbbrev => {
  return {
    type: STORE_STATE,
    payload: stateAbbrev
  }
}

export const storeCD = CD => {
  return {
    type: STORE_CD,
    payload: CD
  }
}

export const storeZip = zip => {
  return {
    type: STORE_ZIP,
    payload: zip
  }
}

export const storeCoords = coords => {
  return {
    type: STORE_COORDS,
    payload: coords
  }
}

// THUNK CREATORS
export const getOfficialsThunk = searchbarValue => async dispatch => {
  // console.log(address);
  try {
    // Query the api for the officials associated with the given address
    const { data } = await axios.get(
      `https://www.googleapis.com/civicinfo/v2/representatives?address=${searchbarValue}&key=AIzaSyCzgqBJLDzmJQo5Cj7PVBKr7DS8fdH-c8M`
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
        articleThumbnail: article.image,
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

export const getOfficialThunk = (
  division,
  officeIndex,
  officialIndex
) => async dispatch => {
  try {
    let url = `https://www.googleapis.com/civicinfo/v2/representatives/${division}?key=AIzaSyCzgqBJLDzmJQo5Cj7PVBKr7DS8fdH-c8M`

    // Get the official
    const { data } = await axios.get(url)
    // console.log("DATA: ", data)
    // console.log("rutabaga", officeIndex, officialIndex)
    let payload = {
      office: data.offices[officeIndex],
      official:
        data.officials[data.offices[officeIndex].officialIndices[officialIndex]]
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

export const getCidThunk = nameObj => async dispatch => {
  // console.log("arugula", nameObj)
  try {
    // Query the api for the officials associated with the given state abbrev
    const { data } = await axios.get(
      `https://www.opensecrets.org/api/?method=getLegislators&id=${nameObj.stateAbbrev}&apikey=968574846610c513dface6ad9e5a2aa9&output=json`
    )
    let legislators = data.response.legislator
    // console.log("celery", legislators)

    // DON'T DELETE THE FOLLOWING LINES, in case phone numbers end up being insufficient
    // Finds the legislator in legislators with the same last name (first name won't be sufficient)
    // const found = legislators.find(element =>
    //   element["@attributes"].firstlast.includes(nameObj.lastName)
    // )

    // Finds the legislator in legislators with the same phone number
    const found = legislators.find(
      element =>
        element["@attributes"].phone
          .replace("(", "")
          .replace(")", "")
          .replace("-", "")
          .replace(" ", "")
          .replace("-", "") === nameObj.phone
    )
    // console.log("wheatgrass", found["@attributes"].cid)
    dispatch(getCid(found["@attributes"]))
  } catch (error) {
    console.log("Error in getCidThunk:", error)
  }
}

export const getFundersThunk = cid => async dispatch => {
  console.log("CID", cid)
  try {
    let url = `https://www.opensecrets.org/api/?method=candIndustry&cid=${cid}&cycle=2020&apikey=968574846610c513dface6ad9e5a2aa9&output=json`

    // Get the top ten industries who contributed for the 2020 cycle
    const { data } = await axios.get(url)
    // console.log("MEOW")
    // console.log("DATA: ", data.response.industries.industry)
    dispatch(getFunders(data.response.industries.industry))
  } catch (error) {
    console.log("Error in getFundersThunk:", error)
  }
}

export const storeCoordsThunk = (state, cd, zip) => async dispatch => {
  console.log(state, cd, zip)

  async function countryCoords() {}
  async function stateCoords(state) {
    try {
      console.log("cucumber")
      // Query the api for the geoJSON for the given state and congressional district
      const { data } = await axios.get(
        `https://theunitedstates.io/districts/states/${state}/shape.geojson`
      )
      console.log("coconut", data)
      dispatch(storeCoords(data))
    } catch (error) {
      console.log("Error in getCoordsThunk:", error)
    }
  }
  async function districtCoords(state, cd) {
    try {
      // Query the api for the geoJSON for the given state and congressional district
      const { data } = await axios.get(
        `https://theunitedstates.io/districts/cds/2012/${state}-${cd}/shape.geojson`
      )
      console.log("honeydew", data)
      dispatch(storeCoords(data))
    } catch (error) {
      console.log("Error in getCoordsThunk:", error)
    }
  }
  async function zipCoords(zip) {
    try {
      console.log("kiwi")
      // Query the api for the geoJSON for the given state and congressional district
      const { data } = await axios.get(
        `https://theunitedstates.io/districts/states/${state}/shape.geojson`
      )
      console.log("coconut", data)
      dispatch(storeCoords(data))
    } catch (error) {
      console.log("Error in getCoordsThunk:", error)
    }
  }

  if (
    (state == undefined && cd !== undefined) ||
    (state == undefined && cd == undefined && zip == undefined)
  ) {
    // country
    countryCoords()
    console.log("COUNTRY")
  } else if (state !== undefined && cd == undefined && zip == undefined) {
    // state
    stateCoords(state)
    console.log("STATE")
  } else if (state !== undefined && cd !== undefined) {
    // congressional district
    districtCoords(state, cd)
    console.log("CONGRESSIONAL DISTRICT")
  } else if (cd == undefined && zip !== undefined) {
    zipCoords(zip)
    console.log("COUNTY / ZIP CODE")
  } else {
    // country
    countryCoords()
    console.log("COUNTRY")
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
    case STORE_NAME:
      return {
        ...state,
        nameObj: action.payload
      }
    case GET_CID:
      return {
        ...state,
        cid: action.payload
      }
    case GET_FUNDERS:
      return {
        ...state,
        funders: action.payload
      }
    case STORE_STATE:
      return { ...state, state: action.payload }
    case STORE_CD:
      return { ...state, cd: action.payload }
    case STORE_ZIP:
      return { ...state, zip: action.payload }
    case STORE_COORDS:
      return { ...state, coords: action.payload }
    default:
      return state
  }
}

export default officialReducer
