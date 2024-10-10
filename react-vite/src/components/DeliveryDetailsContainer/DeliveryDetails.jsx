import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getDeliveryThunk } from "../../redux/deliveries"
import OpenModalButton from '../OpenModalButton'
import './DeliveryDetails.css'
import MessageContainer from '../MessageContainer'
import DeleteModal from "../DeleteModal"
import MapComponent from "../Map"
import { setKey, fromAddress } from 'react-geocode'

export default function DeliveryDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const delivery = useSelector(state => state.deliveries[id])
  const key = useSelector(state => state.apiKeys.apiKey)
  const [pickupMarker, setPickupMarker] = useState({ lat: null, lng: null })
  const [dropMarker, setDropMarker] = useState({ lat: null, lng: null })
  const [markersLoaded, setMarkersLoaded] = useState(false)

  useEffect(() => {
    dispatch(getDeliveryThunk(id))
  }, [dispatch, id])

  const handleUpdate = () => {
    navigate(`/deliveries/${id}/update`)
  }

  // TODO---------------------- apiKey set to null while developing to save api calls -----------------------------
  useEffect(() => {
    const getMarkers = async () => {
      try {
        setKey(null)
        const pickupRes = await fromAddress(`${delivery.pickupAddress} ,${delivery.pickupCity}, ${delivery.pickupState}`)
        const { lat: pickupLat, lng: pickupLng } = pickupRes.results[0].geometry.location
        setPickupMarker({ lat: pickupLat, lng: pickupLng })
        const dropRes = await fromAddress(`${delivery.dropAddress} ,${delivery.dropCity}, ${delivery.dropState}`)
        const { lat: dropLat, lng: dropLng } = dropRes.results[0].geometry.location
        setDropMarker({ lat: dropLat, lng: dropLng })
        setMarkersLoaded(true)
      }
      catch (error) {
        console.error('hello')
        setMarkersLoaded(true)
      }
    }
    if (delivery) getMarkers()
  }, [delivery, key])
   // TODO---------------------- apiKey set to null while developing to save api calls -----------------------------

  if (!delivery) return <h2>Loading</h2>

  return (
    <div className="details-page-container">
      <div className="details-outer-container">
        <div className="details-delivery-container">
          <div className="details-pickup">
            <h2>Delivery Details</h2>
            <h3 className="address-category">Pickup</h3>
            <h3>{delivery.pickupName}</h3>
            <div>{delivery.pickupAddress}</div>
            <div>{delivery.pickupCity}, {delivery.pickupState} {delivery.pickupZip}</div>
          </div>
          <div className="details-drop">
            <h3 className="address-category">Drop off</h3>
            <h3>{delivery.dropName}</h3>
            <div>{delivery.dropAddress}</div>
            <div>{delivery.dropCity}, {delivery.dropState} {delivery.dropZip}</div>
          </div>
          <div className="details-instructions">
            <h3 className="address-category">Description</h3>
            <div>{delivery.description}</div>
            <h3 className="address-category">Special Instructions</h3>
            <div>{delivery.specialInstructions}</div>
          </div>
          <div className='details-button-container'>
              <span><button onClick={handleUpdate}>Update</button></span>
              <span><OpenModalButton buttonText='Delete' modalComponent={<DeleteModal delivery={delivery} type={'delivery'} />} /></span>
            </div>
        </div>
        <div className="map-container">
          {key && markersLoaded && <MapComponent apiKey={key} pickup={pickupMarker} drop={dropMarker} />}
        </div>
      </div>
      <div className="messages-container">
        <MessageContainer />
      </div>
    </div>
  )
}
