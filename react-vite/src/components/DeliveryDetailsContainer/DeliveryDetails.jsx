import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getDeliveryThunk } from "../../redux/deliveries"
import './DeliveryDetails.css'
import SFMap from '/map.jpg'
import MessageContainer from '../MessageContainer'

export default function DeliveryDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const delivery = useSelector(state => state.deliveries[id])

  useEffect(() => {
    dispatch(getDeliveryThunk(id))
  }, [dispatch, id])

  if (!delivery) return <h2>Loading</h2>

  return (
    <div className="details-page-container">
    <div className="details-outer-container">
      <div className="details-delivery-container">
        <div className="details-pickup">
          <h2>Delivery Details</h2>
          <h3>Pickup</h3>
          <h3>{delivery.pickupName}</h3>
          <div>{delivery.pickupAddress}</div>
          <div>{delivery.pickupCity}, {delivery.pickupState} {delivery.pickupZip}</div>
        </div>
        <div className="details-drop">
          <h3>Drop off</h3>
          <h3>{delivery.dropName}</h3>
          <div>{delivery.dropAddress}</div>
          <div>{delivery.dropCity}, {delivery.dropState} {delivery.dropZip}</div>
        </div>
        <div className="details-instructions">
          <h3>Description</h3>
          <div>{delivery.description}</div>
          <h3>Special Instructions</h3>
          <div>{delivery.specialInstructions}</div>
        </div>
      </div>
      <div className="map-placeholder">
        <img className='map' src={SFMap} alt="map" />
      </div>
    </div>
    <div className="messages-container">
    <MessageContainer />
    </div>
    </div>
  )
}
