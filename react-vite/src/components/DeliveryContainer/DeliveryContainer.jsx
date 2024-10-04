import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUnassignedThunk, getCurrentThunk } from "../../redux/deliveries"

import DeliveryCard from "./DeliveryCard"

export default function DeliveryContainer({unassigned}) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const delData = useSelector(state => state.deliveries)
  const unassignedDeliveries = Object.values(delData).filter((delivery) => delivery.courierId === null)
  const currentDeliveries = Object.values(delData).filter((delivery) => delivery.courierId === user.id)

  useEffect(() => {
    unassigned ? dispatch(getUnassignedThunk()) : dispatch(getCurrentThunk())
  }, [dispatch, unassigned])

  return (
    <div>
      {unassigned ? unassignedDeliveries.map(delivery => <DeliveryCard key={delivery.id} delivery={delivery}/>) :
                    currentDeliveries.map(delivery => <DeliveryCard key={delivery.id} delivery={delivery}/>)}
    </div>
  )
}
