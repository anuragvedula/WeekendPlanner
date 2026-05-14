import {
  Link,
  useNavigate,
} from "react-router-dom";

import "../css/navbar.css";

import { useRecoilValue } from "recoil";

import { itineraryAtom } from "../store/atoms/itineraryAtom";

function Navbar() {
  const navigate = useNavigate();

  const itinerary =
    useRecoilValue(itineraryAtom);

  return (
    <div className="navbar">
      <h2
        onClick={() => {
          navigate("/");
        }}
      >
        Weekend Planner
      </h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/resources">
          Resources
        </Link>

        <div className="itinerary-link-wrapper">
          <Link to="/itinerary">
            Itinerary
          </Link>

          {itinerary.length > 0 && (
            <span className="itinerary-count">
              {itinerary.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;