import axios from "axios"

// ACTION TYPES
const GET_USER = "GET_USER"
const REMOVE_USER = "REMOVE_USER"
const UPDATE_USER_INFO = "UPDATE_USER_INFO"


// ACTION CREATORS
const getUser = user => {
  return {
    type: GET_USER,
    payload: user
  }
}

const removeUser = () => {
  return {
    type: REMOVE_USER
  }
}

const updateUser = updatedUserInfo => {
  return {
    type: UPDATE_USER_INFO,
    payload: updatedUserInfo
  }
}


// THUNK CREATORS

// Edit posts
// not tested yet
export const updateUserThunk = updatedUserInfo => async dispatch => {
  try {
    axios.put('/urltoupdatestuff', updatedUserInfo)
  }
  catch (error) {
    console.log(error)
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get("http://voterhub.herokuapp.com/auth/me", { withCredentials: true })
    dispatch(getUser(res.data || {}))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(
      `http://voterhub.herokuapp.com/auth/${method}`,
      { email, password },
      { withCredentials: true }
    )
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }

  try {
    dispatch(getUser(res.data))
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.delete("http://voterhub.herokuapp.com/auth/logout", { withCredentials: true })
    dispatch(removeUser())
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return action.payload
    case REMOVE_USER:
      return {}
    case UPDATE_USER_INFO:
      return action.payload
    default:
      return state
  }
}

export default reducer
