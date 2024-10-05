import { useState } from "react";
import { useDispatch } from "react-redux";
import { STATES } from "./FormUtils";
import './DeliveryForm.css'

export default function DeliveryForm() {
  const [pickupName, setPickupName] = useState('')
  const [pickupCity, setPickupCity] = useState('')
  const [pickupState, setPickupState] = useState('')
  const [pickupZip, setPickupZip] = useState('')
  const [pickupAddress, setPickupAddress] = useState('')

  const [dropName, setDropName] = useState('')
  const [dropCity, setDropCity] = useState('')
  const [dropState, setDropState] = useState('')
  const [dropZip, setDropZip] = useState('')
  const [dropAddress, setDropAddress] = useState('')

  const [description, setDescription] = useState('')
  const [specialInstructions, setSpecialInstructions] = useState('')

  const dispatch = useDispatch()

  return (
    <div>
      <h2>Page Title Placeholder</h2>
      <div className="form-container">
        <div className="form-pickup-container">
          <div>
            <label htmlFor="pickupName">Pickup Name</label>
          </div>
          <input
            type="text"
            value={pickupName}
            onChange={e => setPickupName(e.target.value)}
            name='pickupName'
          />
          <div>
            <label htmlFor="pickupAddress">Pickup Address</label>
          </div>
          <input
            type="text"
            value={pickupAddress}
            onChange={e => setPickupAddress(e.target.value)}
            name='pickupAddress'
          />
          <div>
            <label htmlFor="pickupCity">Pickup City</label>
          </div>
          <input
            type="text"
            value={pickupCity}
            onChange={e => setPickupCity(e.target.value)}
            name="pickupCity"
          />
          <div>
            <label htmlFor="pickupState">Pickup State</label>
          </div>
          <select
            name="pickupState"
            id="pickState"
            value={pickupState}
            onChange={e => setPickupState(e.target.value)}
          >
            {STATES.map((state) => {
              return (<option key={state} value={state}>{state}</option>)
            })}
          </select>
          <div>
            <label htmlFor="pickupZip">Pickup Zip</label>
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
          </div>
          <input
            type="text"
            value={dropName}
            onChange={e => setDropName(e.target.value)}
            name='dropName'
          />
          <div>
            <label htmlFor="dropAddress">Drop Address</label>
          </div>
          <input
            type="text"
            value={dropAddress}
            onChange={e => setDropAddress(e.target.value)}
            name='dropAddress'
          />
          <div>
            <label htmlFor="dropCity">Drop City</label>
          </div>
          <input
            type="text"
            value={dropCity}
            onChange={e => setDropCity(e.target.value)}
            name="dropCity"
          />
          <div>
            <label htmlFor="dropState">Drop State</label>
          </div>
          <select
            value={dropState}
            onChange={e => setDropState(e.target.value)}
            name="dropState"
          >
            {STATES.map((state) => {
              return (<option key={state} value={state}>{state}</option>)
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
          </div>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            name="description"
            placeholder="What is the courier picking up?"
            />
          <div>
            <label htmlFor="specialInstructions">Special Instructions</label>
          </div>
          <textarea
            value={specialInstructions}
            onChange={e => setSpecialInstructions(e.target.value)}
            name="specialInstructions"
            placeholder="Please provide any additional details or special requirements for this task"
          />
        </div>
    </div>
  )
}
