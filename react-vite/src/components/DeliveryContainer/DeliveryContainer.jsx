import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUnassignedThunk, getCurrentThunk, getAllThunk } from "../../redux/deliveries"

import DeliveryCard from "./DeliveryCard"

export default function DeliveryContainer({page}) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const delData = useSelector(state => state.deliveries)
  const unassignedDeliveries = Object.values(delData).filter((delivery) => delivery.courierId === null)
  const currentDeliveries = Object.values(delData).filter((delivery) => delivery.courierId === user.id)
  const allDeliveries = Object.values(delData).sort((a , b) => a.courierId - b.courierId)

  useEffect(() => {
    if(page === 'unassigned') {
      dispatch(getUnassignedThunk())
      return
    }
    if (page === 'current') {
      dispatch(getCurrentThunk())
      return
    }
    if(page === 'all') {
      dispatch(getAllThunk())
      return
    }
  }, [dispatch, page])

  if(page === 'unassigned') {
    return (
      <div>
        {unassignedDeliveries.map(delivery => <DeliveryCard key={delivery.id} delivery={delivery}/>)}
      </div>
    )
  }
  if(page === 'current') {
    return (
      <div>
        {currentDeliveries.map(delivery => <DeliveryCard key={delivery.id} delivery={delivery}/>)}
      </div>
    )
  }
  if(page === 'all') {
    return (
      <div>
        {allDeliveries.map(delivery => <DeliveryCard key={delivery.id} delivery={delivery} all={true}/>)}
      </div>
    )
  }

}
