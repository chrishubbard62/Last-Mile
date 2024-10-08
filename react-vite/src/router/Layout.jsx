import { useEffect, useState } from "react";
import { Outlet, Navigate} from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import { getKeyThunk } from "../redux/apiKey";


export default function Layout() {
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
    dispatch(getKeyThunk())
  }, [dispatch]);

  if(!sessionUser && isLoaded) {
    return <Navigate to="/login" replace={true}/>
  }

  return (
    <>
      <ModalProvider>
        <Navigation />
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
    </>
  );
}
