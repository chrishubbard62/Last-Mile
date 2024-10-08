const GET_KEY = 'deliveries/key'

const getKey = (payload) => {
  return {
    type: GET_KEY,
    payload
  }
}

export const getKeyThunk = () => async (dispatch) =>{
  const res = await fetch('/api/deliveries/map-key')
  if(res.ok) {
    const data = await res.json()
    dispatch(getKey(data.apiKey))
  }
}

const initialState = {}

export default function apiKeyReducer(state = initialState, action) {
  switch(action.type) {
    case GET_KEY: {
      const newState = {...state}
      newState['apiKey'] = action.payload
      return newState
    }
    default:
      return state
  }
}
