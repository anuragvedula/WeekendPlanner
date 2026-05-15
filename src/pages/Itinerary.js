import { useRecoilState } from "recoil";

import Navbar from "../components/Navbar";
import { itineraryAtom } from "../store/atoms/itineraryAtom";

import "../css/itinerary.css";

function Itinerary() {
  const [itinerary, setItinerary] = useRecoilState(itineraryAtom);

  function removeFromItinerary(id) {
    setItinerary(itinerary.filter((item) => item.id !== id));
  }

  const totalBudget = itinerary.reduce((sum, item) => sum + item.budget, 0);

  return (
    <div className="itinerary-page">
      <Navbar />

      <div className="itinerary-main">
        <div className="itinerary-left">
          <div className="itinerary-header">
            <h1 className="itinerary-title">Your Weekend Itinerary</h1>
            {itinerary.length > 0 && (
              <p className="itinerary-total">Total ₹ {totalBudget.toLocaleString()}</p>
            )}
          </div>

          {itinerary.length === 0 ? (
            <div className="itinerary-empty">
              <p>No activities planned yet.</p>
            </div>
          ) : (
            <div className="itinerary-scroll">
              {itinerary.map((item, index) => (
                <div key={item.id} className="itinerary-card">
                  <div className="itinerary-card-num">{index + 1}</div>

                  <div className="itinerary-card-body">
                    <div className="itinerary-card-top">
                      <div>
                        <p className="itinerary-card-category">{item.category}</p>
                        <h3 className="itinerary-card-title">{item.title}</h3>
                        <p className="itinerary-card-location">📍 {item.location}</p>
                      </div>
                      <button
                        className="itinerary-remove-btn"
                        onClick={() => removeFromItinerary(item.id)}
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="itinerary-card-meta">
                      <span className="itinerary-card-budget">₹ {item.budget.toLocaleString()}</span>
                      <span className="itinerary-card-rating">⭐ {item.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Itinerary;
