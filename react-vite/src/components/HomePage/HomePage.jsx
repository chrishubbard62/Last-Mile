import { Navigate} from "react-router-dom"
import { useSelector } from "react-redux"
export default function HomePage() {
  const user = useSelector(state => state.session.user)
  
  return <h1></h1>
}
