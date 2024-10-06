import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { deleteDeliveryThunk } from "../../redux/deliveries";
import './DeleteModal.css'

export default function DeleteModal({delivery}) {
  const { closeModal } = useModal()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleDelete = async () => {
    await dispatch(deleteDeliveryThunk(delivery.id))
    closeModal()
    navigate('/')
  }

  return (
    <div className="delete-modal">
      <h3>Are you Sure you want to delete this delivery?</h3>
      <div className="delete-modal-buttons">
        <button onClick={handleDelete}>Yes</button>
        <button onClick={() => closeModal()}>No</button>
      </div>
    </div>


  )
}
