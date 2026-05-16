import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">

      <h1 className="logo-text">
        Nexus Club
      </h1>

      <div className="nav-links">
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-button">Get Started</Link>
      </div>
    </nav>
  );
};

export default Navbar;