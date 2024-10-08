import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { takeDeliveryThunk, unassignDeliveryThunk } from '../../redux/deliveries'
import './DeliveryContainer.css'


export default function DeliveryCard({ delivery, all }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleDetails = () => {
    navigate(`/deliveries/${delivery.id}`)
  }
  const handleTake = () => {
    dispatch(takeDeliveryThunk(delivery.id))

  }
  const handleUnassign = () => {
    dispatch(unassignDeliveryThunk(delivery.id))
  }

  return (
    <div className="card-outer-container">
      <div className="pickup-container">
        <h3>Pickup</h3>
        <h3>{delivery.pickupName}</h3>
        <div>{delivery.pickupAddress}</div>
        <div>{delivery.pickupCity}, {delivery.pickupState} {delivery.pickupZip}</div>
      </div>
      <div className="drop-container">
        <h3>Drop off</h3>
        <h3>{delivery.dropName}</h3>
        <div>{delivery.dropAddress}</div>
        <div>{delivery.dropCity}, {delivery.dropState} {delivery.dropZip}</div>
      </div>
      <div className='card-button-container'>
        <button onClick={handleDetails}>Details</button>
        {!all && (delivery.courierId  ?  <button onClick={handleUnassign}>Unassign</button> : <button onClick={handleTake}>Take</button>)}
      </div>
      <div className='courier-container'>
        {delivery.courier ? <p>Courier: {delivery.courier.username}</p> : <p>Courier: None</p>}
      </div>
    </div>
  )
}
