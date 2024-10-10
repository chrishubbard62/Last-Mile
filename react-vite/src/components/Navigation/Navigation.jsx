import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="nav-container">
      <ul className="nav-bar">
      <li>
        <NavLink className={({isActive, isPending}) =>
          isPending ? "pending" : isActive ? "active" : ""
        } to='/'>Home/Unassigned</NavLink>
      </li>
      <li>
      <NavLink className={({isActive, isPending}) =>
        isPending ? "pending" : isActive ? "active" : ""
      } to='/current'>Current</NavLink>
      </li>
      <li>
        <NavLink className={({isActive, isPending}) =>
          isPending ? "pending" : isActive ? "active" : ""
        } to='/all'>All</NavLink>
      </li>
      <li>
      <NavLink className={({isActive, isPending}) =>
        isPending ? "pending" : isActive ? "active" : ""
      } to='/deliveries/new'>New Delivery</NavLink>
      </li>
      <li>
        <ProfileButton />
      </li>
    </ul>
    </nav>

  );
}

export default Navigation;
