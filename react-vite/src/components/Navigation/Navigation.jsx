import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="nav-container">
      <div className="nav-bar-outer">
      <ul className="nav-bar">
      <li>
        <NavLink className={({isActive, isPending}) =>
          isPending ? "pending" : isActive ? "active" : "waiting"
        } to='/'>Home/Unassigned</NavLink>
      </li>
      <li>
      <NavLink className={({isActive, isPending}) =>
        isPending ? "pending" : isActive ? "active" : "waiting"
      } to='/current'>Current</NavLink>
      </li>
      <li>
        <NavLink className={({isActive, isPending}) =>
          isPending ? "pending" : isActive ? "active" : "waiting"
        } to='/all'>All</NavLink>
      </li>
      <li>
      <NavLink className={({isActive, isPending}) =>
        isPending ? "pending" : isActive ? "active" : "waiting"
      } to='/deliveries/new'>New Delivery</NavLink>
      </li>
      <li>
        <ProfileButton />
      </li>
    </ul>
      </div>
    </nav>

  );
}

export default Navigation;
