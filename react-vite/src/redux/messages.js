const GET_MESSAGES = 'messages/getMessages'
const CREATE_MESSAGE = 'messages/createMessage'

const getMessages = (payload) => {
  return {
    type: GET_MESSAGES,
    payload
  }
}

const createMessage = (payload) => {
  return {
    type: CREATE_MESSAGE,
    payload
  }
}

export const getMessagesThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/deliveries/${id}/messages`)
  if(res.ok) {
    const data = await res.json()
    dispatch(getMessages(data.Messages))
  }
}

export const createMessageThunk = (id, message) => async (dispatch) => {
  const res = await fetch(`/api/deliveries/${id}/messages`, {
    method: 'POST',
    body: JSON.stringify(message),
    headers: {'Content-Type': 'application/json'}
  })
  if(res.ok) {
    const message = await res.json()
    dispatch(createMessage(message))
  }
}

const initialState = {}

export default function messageReducer(state = initialState, action) {
  switch(action.type) {
    case GET_MESSAGES: {
      const newState = {...state}
      action.payload.forEach((message) => {
        if(state[message.id]) {
          newState[message.id] = {...state[message.id], ...message}
        } else {
          newState[message.id] = message
        }
      })
      return newState
    }
    case CREATE_MESSAGE: {
      const newState = {...state}
      newState[action.payload.id] = action.payload
      return newState
    }
    default:
      return state
  }
}
