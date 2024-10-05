import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import DeliveryContainer from '../components/DeliveryContainer';
import DeliveryDetails from '../components/DeliveryDetailsContainer';
import Layout from './Layout';
import DeliveryForm from '../components/DeliveryForm';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <DeliveryContainer unassigned={true}/>,
      },
      {
        path: "/current",
        element: <DeliveryContainer unassigned={false}/>
      },
      {
        path: "/deliveries/:id",
        element: <DeliveryDetails />
      },
      {
        path: '/deliveries/new',
        element: <DeliveryForm />
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
