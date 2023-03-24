import { logout } from "../../store/reducer/userActions";
import { useStore } from "../../store/store";
import "./Navbar.css";

function Navbar() {
  const [state, dispatch] = useStore();
  return (
    <nav className="navbar">
      <a href="/" class="navbar-logo">
        Home
      </a>
      {!state?.accessToken ?<ul className="navbar-menu">
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/signup">Signup</a>
        </li>
      </ul>:<ul className="navbar-menu">
        <li>
          <a href="/login" onClick={()=>dispatch(logout())}>Logout</a>
        </li>
      </ul>}
    </nav>
  );
}

export default Navbar;
