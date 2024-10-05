import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createDeliveryThunk } from "../../redux/deliveries";
import { STATES, REQUIRED, EXCEEDED, INVALID } from "./FormUtils";
import './DeliveryForm.css'

export default function DeliveryForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [pickupName, setPickupName] = useState('')
  const [pickupCity, setPickupCity] = useState('')
  const [pickupState, setPickupState] = useState('Select-State')
  const [pickupZip, setPickupZip] = useState('')
  const [pickupAddress, setPickupAddress] = useState('')

  const [dropName, setDropName] = useState('')
  const [dropCity, setDropCity] = useState('')
  const [dropState, setDropState] = useState('')
  const [dropZip, setDropZip] = useState('')
  const [dropAddress, setDropAddress] = useState('')

  const [description, setDescription] = useState('')
  const [specialInstructions, setSpecialInstructions] = useState('')

  const [valErrors, setValErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const errors = {}

    if (pickupName.length < 1) errors.pickupName = REQUIRED
    if (pickupName.length > 100) errors.pickupName = EXCEEDED
    if (pickupCity.length < 1) errors.pickupCity = REQUIRED
    if (pickupCity.length > 50) errors.pickupCity = EXCEEDED
    if (pickupAddress.length < 1) errors.pickupAddress = REQUIRED
    if (pickupAddress.length > 150) errors.pickupAddress = EXCEEDED
    if (pickupZip.length < 1) errors.pickupZip = REQUIRED
    if (pickupZip.length > 15) errors.pickupZip = EXCEEDED
    if (!STATES.includes(pickupState)) errors.pickupState = INVALID

    if (dropName.length < 1) errors.dropName = REQUIRED
    if (dropName.length > 100) errors.dropName = EXCEEDED
    if (dropCity.length < 1) errors.dropCity = REQUIRED
    if (dropCity.length > 50) errors.dropCity = EXCEEDED
    if (dropAddress.length < 1) errors.dropAddress = REQUIRED
    if (dropAddress.length > 150) errors.dropAddress = EXCEEDED
    if (dropZip.length < 1) errors.dropZip = REQUIRED
    if (dropZip.length > 15) errors.dropZip = EXCEEDED

    if (description.length < 1) errors.description = REQUIRED
    if (description.length > 500) errors.description = EXCEEDED
    if (specialInstructions.length < 1) errors.specialInstructions = REQUIRED
    if (specialInstructions.length > 500) errors.specialInstructions = EXCEEDED

    if (!STATES.includes(dropState)) errors.dropState = INVALID

    setValErrors(errors)

  }, [pickupName, pickupCity, pickupAddress, pickupZip,
      pickupState, dropName.length, dropCity.length,
      dropAddress.length, dropZip.length, dropState,
      specialInstructions, description])

  const handleNew = async (e) => {
    e.preventDefault()
    setSubmitted(true)
    if(Object.values(valErrors).length) return
    const delivery = {
      pickup_name: pickupName,
      pickup_city: pickupCity,
      pickup_state: pickupState,
      pickup_zip: pickupZip,
      pickup_address: pickupAddress,
      drop_name: dropName,
      drop_city: dropCity,
      drop_state: dropState,
      drop_zip: dropZip,
      drop_address: dropAddress,
      special_instructions: specialInstructions,
      description
    }
    const newDelivery = await dispatch(createDeliveryThunk(delivery))
    navigate(`/deliveries/${newDelivery.id}`)

  }

  return (
    <div>
      <h2>Page Title Placeholder</h2>
      <div className="form-container">
        <div className="form-pickup-container">
          <div>
            <label htmlFor="pickupName">Pickup Name</label>
            {submitted && <span className="errors"> {valErrors.pickupName}</span>}
          </div>
          <input
            type="text"
            value={pickupName}
            onChange={e => setPickupName(e.target.value)}
            name='pickupName'
          />
          <div>
            <label htmlFor="pickupAddress">Pickup Address</label>
            {submitted && <span className="errors"> {valErrors.pickupAddress}</span>}
          </div>
          <input
            type="text"
            value={pickupAddress}
            onChange={e => setPickupAddress(e.target.value)}
            name='pickupAddress'
          />
          <div>
            <label htmlFor="pickupCity">Pickup City</label>
            {submitted && <span className="errors"> {valErrors.pickupCity}</span>}
          </div>
          <input
            type="text"
            value={pickupCity}
            onChange={e => setPickupCity(e.target.value)}
            name="pickupCity"
          />
          <div>
            <label htmlFor="pickupState">Pickup State</label>
            {submitted && <span className="errors"> {valErrors.pickupState}</span>}
          </div>
          <select
            name="pickupState"
            id="pickState"
            value={pickupState}
            onChange={e => setPickupState(e.target.value)}
          >
            <option value="select-state">Select-State</option>
            {STATES.map((state) => {
              return (<option key={`p${state}`} value={state}>{state}</option>)
            })}
          </select>
          <div>
            <label htmlFor="pickupZip">Pickup Zip</label>
            {submitted && <span className="errors"> {valErrors.pickupZip}</span>}
          </div>
          <input
            type="text"
            value={pickupZip}
            onChange={e => setPickupZip(e.target.value)}
            name="pickupZip"
          />
        </div>
        <div className="form-drop-container">
          <div>
            <label htmlFor="dropName">Drop Name</label>
            {submitted && <span className="errors"> {valErrors.dropName}</span>}
          </div>
          <input
            type="text"
            value={dropName}
            onChange={e => setDropName(e.target.value)}
            name='dropName'
          />
          <div>
            <label htmlFor="dropAddress">Drop Address</label>
            {submitted && <span className="errors"> {valErrors.dropAddress}</span>}
          </div>
          <input
            type="text"
            value={dropAddress}
            onChange={e => setDropAddress(e.target.value)}
            name='dropAddress'
          />
          <div>
            <label htmlFor="dropCity">Drop City</label>
            {submitted && <span className="errors"> {valErrors.dropCity}</span>}
          </div>
          <input
            type="text"
            value={dropCity}
            onChange={e => setDropCity(e.target.value)}
            name="dropCity"
          />
          <div>
            <label htmlFor="dropState">Drop State</label>
            {submitted && <span className="errors"> {valErrors.dropState}</span>}
          </div>
          <select
            value={dropState}
            onChange={e => setDropState(e.target.value)}
            name="dropState"
          >
            <option value="select-state">Select-State</option>
            {STATES.map((state) => {
              return (<option key={`d${state}`} value={state}>{state}</option>)
            })}
          </select>
          <div>
            <label htmlFor="dropZip">Drop Zip</label>
          </div>
          <input
            type="text"
            value={dropZip}
            onChange={e => setDropZip(e.target.value)}
            name="dropZip"
          />
        </div>
      </div>
      <div className="form-details-container">
        <div>
          <label htmlFor="description">Delivery Description</label>
          {submitted && <span className="errors"> {valErrors.description}</span>}
        </div>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          name="description"
          placeholder="What is the courier picking up?"
        />
        <div>
          <label htmlFor="specialInstructions">Special Instructions</label>
          {submitted && <span className="errors"> {valErrors.specialInstructions}</span>}
        </div>
        <textarea
          value={specialInstructions}
          onChange={e => setSpecialInstructions(e.target.value)}
          name="specialInstructions"
          placeholder="Please provide any additional details or special requirements for this task"
        />
        <div><button onClick={handleNew}>Submit</button></div>
      </div>
    </div>
  )
}
