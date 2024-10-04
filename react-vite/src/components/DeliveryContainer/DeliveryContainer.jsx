import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUnassignedThunk } from "../../redux/deliveries"
import { NavLink } from "react-router-dom"
import DeliveryCard from "./DeliveryCard"

export default function DeliveryContainer() {
  const delData = useSelector(state => state.deliveries)
  const dispatch = useDispatch()
  const deliveries = Object.values(delData)

  useEffect(() => {
    dispatch(getUnassignedThunk())
  }, [dispatch])

  return (
    <div>
      <nav>
        <ul>
          <li>
          <NavLink to='/'>Unassigned</NavLink>
          </li>
          <li>
          <NavLink to='/current'>Current</NavLink>
          </li>
        </ul>
      </nav>
      {deliveries.map(delivery => <DeliveryCard key={delivery.id} delivery={delivery}/>)}
    </div>
  )
}
