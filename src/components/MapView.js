import React, { useRef, useCallback, useEffect } from "react";
import { GoogleMap, useLoadScript, OverlayView, Polyline } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilm, faUtensils, faWineGlass, faMugSaucer,
  faBagShopping, faLandmark, faTicket, faBowlingBall,
  faPersonHiking, faCampground, faMicrophone, faGamepad,
  faMicrophoneLines, faGuitar, faTrophy, faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import "../css/mapview.css";

const containerStyle = { width: "100%", height: "100%" };

const CITY_CENTERS = {
  Hyderabad: { lat: 17.385, lng: 78.487 },
  Bangalore: { lat: 12.972, lng: 77.594 },
};

const CATEGORY_CONFIG = {
  "Movies":          { icon: faFilm,           color: "#7C3AED" },
  "Restaurants":     { icon: faUtensils,        color: "#DC2626" },
  "Clubs":           { icon: faWineGlass,       color: "#DB2777" },
  "Cafes":           { icon: faMugSaucer,       color: "#D97706" },
  "Shopping":        { icon: faBagShopping,     color: "#2563EB" },
  "Museums":         { icon: faLandmark,        color: "#4F46E5" },
  "Amusement Parks": { icon: faTicket,          color: "#059669" },
  "Bowling":         { icon: faBowlingBall,     color: "#EA580C" },
  "Hiking":          { icon: faPersonHiking,    color: "#16A34A" },
  "Camping":         { icon: faCampground,      color: "#65A30D" },
  "Concerts":        { icon: faMicrophone,      color: "#BE185D" },
  "Gaming Zones":    { icon: faGamepad,         color: "#7C3AED" },
  "Karaoke":         { icon: faMicrophoneLines, color: "#C026D3" },
  "Live Music":      { icon: faGuitar,          color: "#B45309" },
  "Sports Events":   { icon: faTrophy,          color: "#0891B2" },
};

const DEFAULT_CONFIG = { icon: faLocationDot, color: "#1c1916" };

const MAP_STYLES = [
  { elementType: "geometry",                             stylers: [{ color: "#f9f9f9" }] },
  { elementType: "labels.text.fill",                    stylers: [{ color: "#9e9e9e" }] },
  { elementType: "labels.text.stroke",                  stylers: [{ color: "#ffffff" }] },
  { featureType: "road",        elementType: "geometry",        stylers: [{ color: "#ffffff" }] },
  { featureType: "road",        elementType: "geometry.stroke", stylers: [{ color: "#eeeeee" }] },
  { featureType: "road.highway",elementType: "geometry",        stylers: [{ color: "#f5f5f5" }] },
  { featureType: "road.highway",elementType: "geometry.stroke", stylers: [{ color: "#e0e0e0" }] },
  { featureType: "water",       elementType: "geometry",        stylers: [{ color: "#d4eaf7" }] },
  { featureType: "water",       elementType: "labels.text.fill",stylers: [{ color: "#9ed3e3" }] },
  { featureType: "poi.park",    elementType: "geometry",        stylers: [{ color: "#e8f5e9" }] },
  { featureType: "poi",         elementType: "labels",          stylers: [{ visibility: "off" }] },
  { featureType: "transit",                                     stylers: [{ visibility: "off" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#e0e0e0" }] },
];

function applyBounds(map, markers) {
  if (!map || markers.length === 0) return;

  if (markers.length === 1) {
    map.panTo({ lat: markers[0].latitude, lng: markers[0].longitude });
    map.setZoom(14);
    return;
  }

  const bounds = new window.google.maps.LatLngBounds();
  markers.forEach((m) => bounds.extend({ lat: m.latitude, lng: m.longitude }));
  map.fitBounds(bounds, 80);
}

function MapView({ selectedMarkers = [], city = "Hyderabad" }) {
  const mapRef      = useRef(null);
  // Keep a ref so onLoad can always read the latest markers even before effects run
  const markersRef  = useRef(selectedMarkers);
  const defaultCenter = CITY_CENTERS[city] || CITY_CENTERS.Hyderabad;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  // Sync ref every render so onLoad always sees the latest value
  markersRef.current = selectedMarkers;

  const onLoad = useCallback((map) => {
    mapRef.current = map;
    applyBounds(map, markersRef.current);
  }, []);

  // Re-fit whenever markers change (handles 2nd, 3rd… selections)
  useEffect(() => {
    applyBounds(mapRef.current, selectedMarkers);
  }, [selectedMarkers]);

  const pathCoords = selectedMarkers.map((m) => ({
    lat: m.latitude,
    lng: m.longitude,
  }));

  if (loadError) return <div className="map-status">Map failed to load.</div>;
  if (!isLoaded)  return <div className="map-status">Loading map…</div>;

  return (
    <div className="map-wrapper">
      {selectedMarkers.length === 0 && (
        <div className="map-empty-overlay">
          <div className="map-empty-icon">📍</div>
          <p className="map-empty-text">Select a venue to see it on the map</p>
        </div>
      )}

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={11}
        onLoad={onLoad}
        options={{
          mapTypeControl:    false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl:       true,
          styles:            MAP_STYLES,
        }}
      >
        {pathCoords.length > 1 && (
          <Polyline
            path={pathCoords}
            options={{
              strokeColor:   "#3B82F6",
              strokeOpacity: 0.9,
              strokeWeight:  5,
              geodesic:      true,
            }}
          />
        )}

        {selectedMarkers.map((marker, index) => {
          const config = CATEGORY_CONFIG[marker.category] || DEFAULT_CONFIG;
          return (
            <OverlayView
              key={`${marker.id}-${index}`}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="map-marker" style={{ "--marker-color": config.color }}>
                <div className="map-marker-bubble">
                  <FontAwesomeIcon icon={config.icon} className="map-marker-icon" />
                  <div className="map-marker-step">{index + 1}</div>
                </div>
                <div className="map-marker-tip" />
                <div className="map-marker-label">{marker.title}</div>
              </div>
            </OverlayView>
          );
        })}
      </GoogleMap>
    </div>
  );
}

export default MapView;
