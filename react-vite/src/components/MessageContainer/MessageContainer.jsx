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
    <div className="messages-outer-container">
      <h2>MESSAGES</h2>
      {messages.map((message) => {
        return (
          <div className='single-message' key={message.id}>
            <span>{message.user.username}:
            <div>{message.createdAt}</div>
            </span>
            <span>{message.message} </span>
            <span></span>
            {user.id === message.user.id ?
            <span className="message-button-box">
            <span className="message-buttons"><OpenModalButton buttonText='Update' modalComponent={<UpdateModal message={message} />}/></span>
            <span className="message-buttons"><OpenModalButton buttonText='Delete' modalComponent={<DeleteModal message={message} type={'message'}/>}/></span>
            </span> :
            <span></span>
            }
          </div>
        )
      })
    }
      <form className="message-form">
        <input className="message-form-input" type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        />
        <button className='message-buttons' onClick={handleSubmit}><IoMdSend/></button>
      </form>
    </div>
  )
}
