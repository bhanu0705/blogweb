// Header.js
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../../../assets/Logo.png";

function Header({ isLoggedIn, handleLogout }) {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={Logo} alt="logo" />
      </Link>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <span className="search-icon">
          <i className="fas fa-search"></i>
        </span>
      </div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/contact">Practice</Link>
        <Link to="/community">Blogs</Link>
        {isLoggedIn ? (
          <Link to="/" onClick={handleLogout}>Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
