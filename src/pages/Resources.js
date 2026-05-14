import Navbar from "../components/Navbar";
import ResourceCard from "../components/ResourceCard";

import { useRecoilValue } from "recoil";

import { filteredResourcesSelector } from "../store/selectors/filteredResourcesSelector";

import "../css/resources.css";
import MapView from "../components/MapView";
import FilterDropdown from "../components/FilterDropdown";

function Resources() {
  const resources = useRecoilValue(filteredResourcesSelector);

  return (
    <div>
      <Navbar />

      <div className="resources-page">
        {/* TOP BAR */}
        <div className="top-controls">
          <input
            type="text"
            placeholder="Search events..."
            className="search-input"
          />

          <input
            type="text"
            placeholder="Enter 
            Zipcode"
            className="zipcode-input"
          />

          <FilterDropdown></FilterDropdown>
        </div>

        {/* MAIN CONTENT */}
        <div className="content-layout">
          {/* LEFT SIDE - RESOURCE CARDS */}
          <div className="resources-scroll-section">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>

          {/* RIGHT SIDE - MAP */}
          <div className="map-section">
            <MapView />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resources;
