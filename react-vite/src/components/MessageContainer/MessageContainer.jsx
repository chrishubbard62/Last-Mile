import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMessagesThunk } from "../../redux/messages"
import { FaMessage } from "react-icons/fa6"

export default function MessageContainer() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const messageData = useSelector(state => state.messages)
  // const user = useSelector(state => state.session.user)
  const messages = Object.values(messageData).filter((message) => message.deliveryId === +id)


  useEffect(() => {
    dispatch(getMessagesThunk(id))
  }, [dispatch, id])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="Messages-outer-container">
      <h2>MESSAGES</h2>
      {messages.map((message) => {
        return (
          <div  key={message.id}>
            <span>{message.user.username} </span>
            <span>{message.message} </span>
            <span>{message.createdAt}</span>
            <span><button>update</button></span>
            <span><button>delete</button></span>
          </div>
        )
      })
    }
      <form>
        <input type="text"/>
        <button onClick={handleSubmit}><FaMessage></FaMessage></button>
      </form>
    </div>
  )
}
