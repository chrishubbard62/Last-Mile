const GET_MESSAGES = 'messages/getMessages'

const getMessages = (payload) => {
  return {
    type: GET_MESSAGES,
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
    default:
      return state
  }
}
