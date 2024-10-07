import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMessagesThunk, createMessageThunk } from "../../redux/messages"
import OpenModalButton from '../OpenModalButton'
import DeleteModal from "../DeleteModal"
import UpdateModal from "../UpdateModal"
import { IoMdSend } from "react-icons/io";
import { EXCEEDED, REQUIRED } from "../Utils/FormUtils"


export default function MessageContainer() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const messageData = useSelector(state => state.messages)
  const user = useSelector(state => state.session.user)
  const messages = Object.values(messageData).filter((message) => message.deliveryId === +id)
  const [message, setMessage] = useState('')
  const [valErrors, setValErrors] = useState({})

  useEffect(() => {
    const errors = {}
    if(message.length < 1) errors.message = REQUIRED
    if(message.length > 500) errors.message = EXCEEDED
    setValErrors(errors)
  }, [message])

  useEffect(() => {
    dispatch(getMessagesThunk(id))
  }, [dispatch, id])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(Object.values(valErrors).length) {
      alert(`Message ${valErrors.message}`)
      return
    }
    const newMessage = {
      message
    }
    dispatch(createMessageThunk(id, newMessage))
    setMessage('')
  }

  return (
    <div className="Messages-outer-container">
      <h2>MESSAGES</h2>
      {messages.map((message) => {
        return (
          <div  key={message.id}>
            <span>{message.user.username}</span>
            <span>{message.message} </span>
            <span>{message.createdAt}</span>
            {user.id === message.user.id ?
            <span>
            <span><OpenModalButton buttonText='Update' modalComponent={<UpdateModal message={message} />}/></span>
            <span><OpenModalButton buttonText='Delete' modalComponent={<DeleteModal message={message} type={'message'}/>}/></span>
            </span> :
            <span></span>
            }

          </div>
        )
      })
    }
      <form>
        <input type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        />
        <button onClick={handleSubmit}><IoMdSend/></button>
      </form>
    </div>
  )
}
