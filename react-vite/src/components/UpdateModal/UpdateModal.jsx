import { useModal } from "../../context/Modal";
import { useState, useEffect } from "react";
import { updateMessageThunk } from "../../redux/messages";
import { EXCEEDED, REQUIRED } from "../Utils/FormUtils";
import { useDispatch } from "react-redux";

export default function UpdateModal({ message }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch()
  const [newMessage, setNewMessage] = useState(message.message)
  const [valErrors, setValErrors] = useState({})

  useEffect(() => {
    const errors = {}
    if (newMessage.length < 1) errors.message = REQUIRED
    if (newMessage.length > 500) errors.message = EXCEEDED
    setValErrors(errors)
  }, [newMessage])

  const handleConfirm = async (e) => {
    e.preventDefault()
    if (Object.values(valErrors).length) {
      alert(`Message ${valErrors.message}`)
      return
    }
    const updatedMessage = {
      message: newMessage
    }
    await dispatch(updateMessageThunk(message.id, updatedMessage))
    closeModal()
  }

  return (
    <div className="update-modal">
      <input
        type="text"
        name="text"
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)} />
      <div className="update-modal-buttons">
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={() => closeModal()}>Cancel</button>
      </div>
    </div>
  )
}
