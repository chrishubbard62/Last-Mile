import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import DeliveryContainer from '../components/DeliveryContainer';
import DeliveryDetails from '../components/DeliveryDetailsContainer';
import Layout from './Layout';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <DeliveryContainer />,
      },
      {
        path: "/deliveries/:id",
        element: <DeliveryDetails />
      }
    ],
  },
  {
    path: "login",
    element: <LoginFormPage />,
  },
  {
    path: "signup",
    element: <SignupFormPage />,
  },
]);
