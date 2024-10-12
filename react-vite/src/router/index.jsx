import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import DeliveryContainer from '../components/DeliveryContainer';
import DeliveryDetails from '../components/DeliveryDetailsContainer';
import Layout from './Layout';
import DeliveryForm from '../components/DeliveryForm';
import TempChat from '../components/TempChat';



export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <DeliveryContainer page={'unassigned'}/>,
      },
      {
        path: "/current",
        element: <DeliveryContainer page={'current'}/>
      },
      {
        path: '/all',
        element: <DeliveryContainer page={'all'} />
      },
      {
        path: "/deliveries/:id",
        element: <DeliveryDetails />
      },
      {
        path: '/deliveries/new',
        element: <DeliveryForm newDelivery={true}/>
      },
      {
        path: 'deliveries/:id/update',
        element: <DeliveryForm newDelivery={false}/>
      },
      {
        path: 'socket/test',
        element: <TempChat />
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
