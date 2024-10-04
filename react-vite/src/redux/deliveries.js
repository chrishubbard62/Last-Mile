const GET_UNASSIGNED = 'deliveries/getUnassigned'
const GET_DELIVERY = 'deliveries/getDelivery'

const getUnassigned = (payload) => {
  return {
    type: GET_UNASSIGNED,
    payload
  }
}

const getDelivery = (payload) => {
  return {
    type: GET_DELIVERY,
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

export const getDeliveryThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/deliveries/${id}`)
  if(res.ok) {
    const delivery = await res.json()
    dispatch(getDelivery(delivery))
    return delivery
  }
}

const initialState = {}

export default function deliveryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_UNASSIGNED: {
      const newState = {...state}
      action.payload.forEach((delivery) => {
        if(state[delivery.id]) {
          newState[delivery.id] = {...state[delivery.id], ...delivery}
        } else {
          newState[delivery.id] = delivery
        }
      })
      return newState
    }
    case GET_DELIVERY: {
      const newState = {...state}
      if(state[action.payload.id]) {
        newState[action.payload.id] = {...state[action.payload.id], ...action.payload}
      } else {
        newState[action.payload.id] = action.payload
      }
      return newState
    }
    default:
      return state
  }
}
