import React from "react";

import {
  GoogleMap,
  useLoadScript,
  OverlayView,
} from "@react-google-maps/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "12px",
};

const center = {
  lat: 17.385044,
  lng: 78.486671,
};

function MapView({ markers = [] }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:
      process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) {
    return <div>Map failed to load</div>;
  }

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
    >
      {markers.map((marker) => (
        <OverlayView
          key={marker.id}
          position={{
            lat: marker.latitude,
            lng: marker.longitude,
          }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div
            title={marker.title}
            style={{
              transform: "translate(-50%, -100%)",
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{
                color: "#FFC107",
                fontSize: "32px",
                filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))",
              }}
            />
          </div>
        </OverlayView>
      ))}
    </GoogleMap>
  );
}

export default MapView;