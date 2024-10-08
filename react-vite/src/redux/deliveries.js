const GET_DELIVERIES = 'deliveries/getUnassigned'
const GET_DELIVERY = 'deliveries/getDelivery'
const UPDATE_COURIER = 'deliveries/takeDelivery'
const CREATE_DELIVERY = 'deliveries/createDelivery'
const UPDATE_DELIVERY = 'deliveries/updateDelivery'
const DELETE_DELIVERY = 'deliveries/deleteDelivery'

const createDelivery = (payload) => {
  return {
    type: CREATE_DELIVERY,
    payload
  }
}

const updateDelivery = (payload) => {
  return {
    type: UPDATE_DELIVERY,
    payload
  }
}

const deleteDelivery = (payload) => {
  return {
    type: DELETE_DELIVERY,
    payload
  }
}

const updateCourier = (payload) => {
  return {
    type: UPDATE_COURIER,
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
  if (res.ok) {
    const data = await res.json();
    dispatch(getDeliveries(data.Deliveries))
  }
}

export const getCurrentThunk = () => async (dispatch) => {
  const res = await fetch('/api/deliveries/current')
  if (res.ok) {
    const data = await res.json()
    dispatch(getDeliveries(data.Deliveries))
  }
}

export const getAllThunk = () => async (dispatch) => {
  const res = await fetch('/api/deliveries')
  if (res.ok) {
    const data = await res.json()
    dispatch(getDeliveries(data.Deliveries))
  }
}

export const getDeliveryThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/deliveries/${id}`)
  if (res.ok) {
    const delivery = await res.json()
    dispatch(getDelivery(delivery))
    return delivery
  }
}

export const takeDeliveryThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/deliveries/${id}/take`, {
    method: 'PATCH'
  })
  if (res.ok) {
    const delivery = await res.json()
    dispatch(updateCourier(delivery))
    return delivery
  }
}

export const unassignDeliveryThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/deliveries/${id}/unassign`, {
    method: "PATCH"
  })
  if (res.ok) {
    const delivery = await res.json()
    dispatch(updateCourier(delivery))
    return delivery
  }
}

export const createDeliveryThunk = (delivery) => async (dispatch) => {
  const res = await fetch('/api/deliveries', {
    method: 'POST',
    body: JSON.stringify(delivery),
    headers: { 'Content-Type': 'application/json' }
  })
  if (res.ok) {
    const newDelivery = await res.json()
    dispatch(createDelivery(newDelivery))
    return newDelivery
  }
}

export const updateDeliveryThunk = (id, delivery) => async (dispatch) => {
  const res = await fetch(`/api/deliveries/${id}`, {
    method: 'PUT',
    body: JSON.stringify(delivery),
    headers: { 'Content-Type': 'application/json' }
  })
  if (res.ok) {
    const updatedDelivery = await res.json()
    dispatch(updateDelivery(updatedDelivery))
    return updatedDelivery
  }
}

export const deleteDeliveryThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/deliveries/${id}`, {
    method: 'DELETE'
  })
  if (res.ok) {
    const confirmation = await res.json()
    dispatch(deleteDelivery(id))
    return confirmation
  }
}

const initialState = {}

export default function deliveryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DELIVERIES: {
      const newState = { ...state }
      action.payload.forEach((delivery) => {
        if (state[delivery.id]) {
          newState[delivery.id] = { ...state[delivery.id], ...delivery }
        } else {
          newState[delivery.id] = delivery
        }
      })
      return newState
    }
    case GET_DELIVERY: {
      const newState = { ...state }
      if (state[action.payload.id]) {
        newState[action.payload.id] = { ...state[action.payload.id], ...action.payload }
      } else {
        newState[action.payload.id] = action.payload
      }
      return newState
    }
    case UPDATE_COURIER: {
      const newState = { ...state }
      newState[action.payload.id] = { ...newState[action.payload.id], ...action.payload }
      return newState
    }
    case CREATE_DELIVERY: {
      const newState = { ...state }
      newState[action.payload.id] = action.payload
      return newState
    }
    case UPDATE_DELIVERY: {
      const newState = { ...state }
      newState[action.payload.id] = { ...newState[action.payload.id], ...action.payload }
      return newState
    }
    case DELETE_DELIVERY: {
      const newState = { ...state }
      delete newState[action.payload]
      return newState
    }
    default: {
      return state
    }
  }
}
