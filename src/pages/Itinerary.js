import Navbar from "../components/Navbar";

import { useRecoilState } from "recoil";

import { itineraryAtom } from "../store/atoms/itineraryAtom";

function Itinerary() {
  const [itinerary, setItinerary] =
    useRecoilState(itineraryAtom);

  function removeFromItinerary(id) {
    const updatedItinerary = itinerary.filter(
      (item) => item.id !== id
    );

    setItinerary(updatedItinerary);
  }

  return (
    <div>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Your Weekend Itinerary</h1>

        {itinerary.length === 0 ? (
          <p>No activities added yet.</p>
        ) : (
          itinerary.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                marginTop: "20px",
                borderRadius: "10px",
                background: "white",
              }}
            >
              <h3>{item.title}</h3>

              <p>{item.category}</p>

              <p>₹ {item.budget}</p>

              <p>⭐ {item.rating}</p>

              <p>{item.location}</p>

              <button
                onClick={() =>
                  removeFromItinerary(item.id)
                }
                style={{
                  marginTop: "10px",
                  padding: "10px 16px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Remove From Itinerary
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Itinerary;