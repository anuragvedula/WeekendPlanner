import "../css/cards.css";
import { useRecoilState } from "recoil";
import { itineraryAtom } from "../store/atoms/itineraryAtom";

function ResourceCard({ resource }) {
  const [itinerary, setItinerary] = useRecoilState(itineraryAtom);

  function addToItinerary() {
    setItinerary([...itinerary, resource]);
  }

  return (
    <div className="resource-card">
      <img src={resource.image} alt={resource.title} />

      <div className="card-content">
        <h3>{resource.title}</h3>

        <p>{resource.category}</p>

        <p>₹ {resource.budget}</p>

        <p>⭐ {resource.rating}</p>

        <button onClick={addToItinerary}>
          Add To Itinerary
        </button>
      </div>
    </div>
  );
}

export default ResourceCard;