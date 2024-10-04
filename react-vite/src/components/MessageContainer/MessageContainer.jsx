import { useParams } from "react-router-dom"

export default function MessageContainer() {
  const {id} = useParams()
  return <h1>{id}</h1>
}
