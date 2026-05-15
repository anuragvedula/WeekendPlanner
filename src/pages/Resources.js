import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import ResourceCard from "../components/ResourceCard";
import StepBreadcrumb from "../components/StepBreadcrumb";
import MapView from "../components/MapView";

import { categoryAtom } from "../store/atoms/categoryAtom";
import { activeStepAtom } from "../store/atoms/activeStepAtom";
import { selectedResourcesAtom } from "../store/atoms/selectedResourcesAtom";
import { itineraryAtom } from "../store/atoms/itineraryAtom";
import { cityAtom } from "../store/atoms/cityAtom";
import { activeStepResourcesSelector } from "../store/selectors/activeStepResourcesSelector";

import "../css/resources.css";

const HEADINGS = {
  Movies: "Pick your movie experience",
  Restaurants: "Where would you like to eat?",
  Clubs: "Choose your nightlife spot",
  Cafes: "Find a cozy café to relax",
  Shopping: "Time for some retail therapy",
  Museums: "Explore art & culture",
  "Amusement Parks": "Choose your thrill ride",
  Bowling: "Time to hit the lanes",
  Hiking: "Pick your trail",
  Camping: "Find your campsite",
  Concerts: "Pick a live show",
  "Gaming Zones": "Level up your evening",
  Karaoke: "Sing your heart out",
  "Live Music": "Find your groove",
  "Sports Events": "Pick a game to watch",
};

function Resources() {
  const navigate = useNavigate();
  const categories = useRecoilValue(categoryAtom);
  const [activeStep, setActiveStep] = useRecoilState(activeStepAtom);
  const [selectedResources, setSelectedResources] = useRecoilState(selectedResourcesAtom);
  const [, setItinerary] = useRecoilState(itineraryAtom);
  const activeResources = useRecoilValue(activeStepResourcesSelector);
  const city = useRecoilValue(cityAtom);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setActiveStep(0);
    setSelectedResources({});
    setInitialized(true);
  }, [setActiveStep, setSelectedResources]);

  const currentCategory = categories[activeStep];
  const prevCategory = activeStep > 0 ? categories[activeStep - 1] : null;
  const prevSelected = prevCategory ? selectedResources[prevCategory] : null;
  const isAllDone = initialized && activeStep >= categories.length && categories.length > 0;

  useEffect(() => {
    if (isAllDone) {
      const ordered = categories.map((cat) => selectedResources[cat]).filter(Boolean);
      setItinerary(ordered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAllDone]);

  function handleSelectResource(resource) {
    const newSelected = {};
    for (let i = 0; i < activeStep; i++) {
      const cat = categories[i];
      if (selectedResources[cat]) newSelected[cat] = selectedResources[cat];
    }
    newSelected[currentCategory] = resource;
    setSelectedResources(newSelected);
    setActiveStep(activeStep + 1);
  }

  function handleBreadcrumbClick(stepIndex) {
    setActiveStep(stepIndex);
  }

  if (!initialized) return null;

  if (!categories.length) {
    return (
      <div className="resources-flow-page">
        <Navbar />
        <div className="flow-empty">
          <h2>No interests selected</h2>
          <p>Go back and pick at least one category to continue.</p>
          <button className="flow-back-btn" onClick={() => navigate("/")}>
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (isAllDone) {
    return (
      <div className="resources-flow-page">
        <Navbar />
        <div className="plan-complete">
          <div className="plan-complete-card">
            <div className="plan-complete-icon">🎉</div>
            <h2 className="plan-complete-title">Your Weekend Plan is Ready!</h2>
            <p className="plan-complete-sub">Here's what you've picked</p>

            <div className="plan-summary">
              {categories.map((cat, i) => {
                const picked = selectedResources[cat];
                if (!picked) return null;
                return (
                  <div key={cat} className="plan-summary-item">
                    <div className="plan-step-num">{i + 1}</div>
                    <div className="plan-summary-info">
                      <p className="plan-cat-label">{cat}</p>
                      <p className="plan-title-label">{picked.title}</p>
                      <p className="plan-location-label">📍 {picked.location}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="plan-actions">
              <button
                className="plan-view-btn"
                onClick={() => navigate("/itinerary")}
              >
                View Full Itinerary →
              </button>
              <button
                className="plan-restart-btn"
                onClick={() => {
                  setActiveStep(0);
                  setSelectedResources({});
                }}
              >
                ← Revise Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const heading = HEADINGS[currentCategory] || `Pick your ${currentCategory?.toLowerCase()} experience`;
  const selectedMarkers = categories.map((cat) => selectedResources[cat]).filter(Boolean);

  return (
    <div className="resources-flow-page">
      <Navbar />

      <StepBreadcrumb
        categories={categories}
        activeStep={activeStep}
        selectedResources={selectedResources}
        onStepClick={handleBreadcrumbClick}
      />

      <div className="flow-main">
        <div className="flow-left">
          <div className="flow-header">
            <h2 className="flow-heading">{heading}</h2>
            {prevSelected ? (
              <p className="flow-context-text">
                Great choice! Here are{" "}
                <span className="context-highlight">
                  {currentCategory.toLowerCase()}
                </span>{" "}
                options near{" "}
                <span className="context-highlight">{prevSelected.title}</span>.
              </p>
            ) : (
              <p className="flow-context-text">
                Step {activeStep + 1} of {categories.length} — choose one to
                continue building your plan.
              </p>
            )}
          </div>

          <div className="cards-scroll-area">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="cards-grid"
              >
                {activeResources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    selected={selectedResources[currentCategory]?.id === resource.id}
                    onSelect={handleSelectResource}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flow-right">
          <div className="flow-map-label">Map View</div>
          <div className="flow-map-wrap">
            <MapView selectedMarkers={selectedMarkers} city={city} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resources;
