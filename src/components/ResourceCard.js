import "../css/cards.css";
import { useRecoilState } from "recoil";
import { itineraryAtom } from "../store/atoms/itineraryAtom";

function ResourceCard({ resource, selected, onSelect }) {
  const [itinerary, setItinerary] = useRecoilState(itineraryAtom);

  function handleClick() {
    if (onSelect) {
      onSelect(resource);
    } else {
      setItinerary([...itinerary, resource]);
    }
  }

  return (
    <div className={`resource-card${selected ? " resource-card--selected" : ""}`}>
      <div className="card-image-wrap">
        <img src={resource.image} alt={resource.title} />
        {selected && <div className="card-selected-badge">✓ In Your Plan</div>}
      </div>

      <div className="card-content">
        <h3>{resource.title}</h3>
        <p className="card-category">{resource.category}</p>
        <p className="card-location">📍 {resource.location}</p>
        <div className="card-meta">
          <span className="card-budget">₹ {resource.budget}</span>
          <span className="card-rating">⭐ {resource.rating}</span>
        </div>
        <button
          className={selected ? "card-btn card-btn--selected" : "card-btn"}
          onClick={handleClick}
        >
          {selected ? "✓ In Your Plan" : "Add To Plan"}
        </button>
      </div>
    </div>
  );
}

export default ResourceCard;
