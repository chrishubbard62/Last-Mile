import { useNavigate } from 'react-router-dom'
import './DeliveryContainer.css'



export default function DeliveryCard({ delivery }) {
  const navigate = useNavigate()
  const handleDetails = () => {
    navigate(`/deliveries/${delivery.id}`)
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
        <button>Take</button>
      </div>
    </div>
  )
}
