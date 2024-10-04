const GET_DELIVERIES = 'deliveries/getUnassigned'
const GET_DELIVERY = 'deliveries/getDelivery'
const TAKE_DELIVERY = 'deliveries/takeDelivery'

const takeDelivery = (payload) => {
  return {
    type: TAKE_DELIVERY,
    payload
  }
}

const getDeliveries = (payload) => {
  return {
    type: GET_DELIVERIES,
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
    dispatch(getDeliveries(data.Deliveries))
  }
}

export const getCurrentThunk = () => async (dispatch) => {
  const res = await fetch('/api/deliveries/current')
  if(res.ok) {
    const data = await res.json()
    dispatch(getDeliveries(data.Deliveries))
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

export const takeDeliveryThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/deliveries/${id}/take`, {
    method: 'PATCH'
  })
  if(res.ok) {
    const delivery = await res.json()
    dispatch(takeDelivery(delivery))
    return delivery
  }
}

const initialState = {}

export default function deliveryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DELIVERIES: {
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
    case TAKE_DELIVERY: {
      const newState = { ...state}
      newState[action.payload.id] = {...newState[action.payload.id], ...action.payload}
      return newState
    }
    default:
      return state
  }
}
