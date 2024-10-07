import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <nav>
      <ul className="nav-bar">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink className='nav-link' to='/'>Unassigned</NavLink>
      </li>
      <li>
      <NavLink className='nav-link' to='/current'>Current</NavLink>
      </li>
      <li>
        <NavLink className='nav-link' to='/all'>All</NavLink>
      </li>
      <li>
      <NavLink className='nav-link' to='/deliveries/new'>New Delivery</NavLink>
      </li>
      <li>
        <ProfileButton />
      </li>
    </ul>
    </nav>

  );
}

export default Navigation;
