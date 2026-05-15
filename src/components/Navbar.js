import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/navbar.css";
import { useRecoilValue } from "recoil";
import { itineraryAtom } from "../store/atoms/itineraryAtom";

function Navbar() {
  const navigate = useNavigate();
  const itinerary = useRecoilValue(itineraryAtom);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="navbar">
      <h2 onClick={() => { navigate("/"); closeMenu(); }}>
        Weekend Planner
      </h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/resources">Resources</Link>
        <div className="itinerary-link-wrapper">
          <Link to="/itinerary">Itinerary</Link>
          {itinerary.length > 0 && (
            <span className="itinerary-count">{itinerary.length}</span>
          )}
        </div>
      </div>

      <button
        className={`nav-hamburger${menuOpen ? " nav-hamburger--open" : ""}`}
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {menuOpen && (
        <div className="nav-mobile-menu">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/resources" onClick={closeMenu}>Resources</Link>
          <div className="itinerary-link-wrapper">
            <Link to="/itinerary" onClick={closeMenu}>Itinerary</Link>
            {itinerary.length > 0 && (
              <span className="itinerary-count">{itinerary.length}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
