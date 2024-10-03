import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUnassignedThunk } from "../../redux/deliveries"

export default function DeliveryContainer() {
  const delData = useSelector(state => state.deliveries)
  const dispatch = useDispatch()
  const deliveries = Object.values(delData)

  useEffect(() => {
    dispatch(getUnassignedThunk())
  }, [dispatch])

  return (
    <div>
      {deliveries.map(delivery => <p key={delivery.id}>{delivery.description}</p>)}
    </div>
  )
}
