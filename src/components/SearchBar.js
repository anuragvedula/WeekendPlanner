import { useRecoilState } from "recoil";
import { cityAtom } from "../store/atoms/cityAtom";

import axios from "axios";

import "../css/searchbar.css";

function SearchBar() {
  const [city, setCity] = useRecoilState(cityAtom);

  const cities = [
    "Hyderabad",
    "Bangalore",
  ];

  async function detectLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await axios.get(
            "https://nominatim.openstreetmap.org/reverse",
            {
              params: {
                lat,
                lon,
                format: "json",
              },
            }
          );

          const data = response.data;

          const detectedCity =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.state ||
            "";

          setCity(detectedCity);
        } catch (error) {
          console.error("Location detection failed:", error);

          alert("Unable to detect location.");
        }
      },
      () => {
        alert("Location permission denied.");
      }
    );
  }

  return (
    <div className="search-container">
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="city-dropdown"
      >
        <option value="">Select City</option>

        {cities.map((cityName) => (
          <option key={cityName} value={cityName}>
            {cityName}
          </option>
        ))}
      </select>

      <button className="location-btn" onClick={detectLocation}>
        📍 Detect My Location
      </button>
    </div>
  );
}

export default SearchBar;