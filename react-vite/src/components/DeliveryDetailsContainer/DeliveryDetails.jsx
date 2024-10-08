import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getDeliveryThunk } from "../../redux/deliveries"
import OpenModalButton from '../OpenModalButton'
import './DeliveryDetails.css'

import MessageContainer from '../MessageContainer'
import DeleteModal from "../DeleteModal"
import MapComponent from "../Map"

export default function DeliveryDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const delivery = useSelector(state => state.deliveries[id])

  useEffect(() => {
    dispatch(getDeliveryThunk(id))
  }, [dispatch, id])

  const handleUpdate = () => {
    navigate(`/deliveries/${id}/update`)
  }


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
          <div className='details-button-container'>
            <span><button onClick={handleUpdate}>Update</button></span>
            <span><OpenModalButton buttonText='Delete' modalComponent={<DeleteModal delivery={delivery} type={'delivery'}/>}/></span>
          </div>
        </div>
      </div>
      <div className="map-placeholder">
        <MapComponent />
      </div>
    </div>
    <div className="messages-container">
    <MessageContainer />
    </div>
    </div>
  )
}
