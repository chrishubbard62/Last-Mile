const GET_UNASSIGNED = 'deliveries/getUnassigned'

const getUnassigned = (payload) => {
  return {
    type: GET_UNASSIGNED,
    payload
  }
}

export const getUnassignedThunk = () => async (dispatch) => {
  const res = await fetch('/api/deliveries/unassigned')
  if(res.ok) {
    const data = await res.json();
    dispatch(getUnassigned(data.Deliveries))
  }
}

const initialState = {}

export default function deliveryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_UNASSIGNED: {
      const newState = {...state}
      action.payload.forEach((delivery) => {
        if(state[delivery.id]) {
          newState[delivery.id] = {...state[delivery], ...delivery}
        } else {
          newState[delivery.id] = delivery
        }
      })
      return newState
    }
    default:
      return state
  }
}
