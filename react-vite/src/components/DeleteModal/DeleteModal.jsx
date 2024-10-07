import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { deleteDeliveryThunk } from "../../redux/deliveries";
import { deleteMessageThunk } from "../../redux/messages"
import './DeleteModal.css'

export default function DeleteModal({delivery, message, type}) {
  const { closeModal } = useModal()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleDeliveryDelete = async () => {
    await dispatch(deleteDeliveryThunk(delivery.id))
    closeModal()
    navigate('/')
  }

  const handleMessageDelete = async () => {
    await dispatch(deleteMessageThunk(message.id))
    closeModal()
  }

  return (
    <div className="delete-modal">
      <h3>Are you Sure you want to delete this {type === 'delivery?' ? 'delivery' : 'message?'}</h3>
      <div className="delete-modal-buttons">
        <button onClick={type === 'delivery' ? handleDeliveryDelete : handleMessageDelete}>Yes</button>
        <button onClick={() => closeModal()}>No</button>
      </div>
    </div>
  )
}
