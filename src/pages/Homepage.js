import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import CategoryPill from "../components/CategoryPill";

import "../css/homepage.css";

import { useRecoilState } from "recoil";
import { categoryAtom } from "../store/atoms/categoryAtom";
import { budgetAtom } from "../store/atoms/budgetAtom";
import SearchBarPrimary from "../components/SearchBarPrimary";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

function Homepage() {
  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] =
    useRecoilState(categoryAtom);

  const [budget, setBudget] = useRecoilState(budgetAtom);

  const [showMore, setShowMore] = useState(false);

  const categories = [
    "Movies",
    "Restaurants",
    "Clubs",
    "Amusement Parks",
    "Cafes",
    "Gaming Zones",
    "Museums",
    "Concerts",
    "Shopping",
    "Hiking",
    "Bowling",
    "Camping",
    "Live Music",
    "Karaoke",
    "Sports Events",
  ];

  const visibleCategories = categories.slice(0, 8);
  const hiddenCategories = categories.slice(8);

  function toggleCategory(category) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  return (
    <div>
      <Navbar />

      <div className="hero-section">
        <h1>Plan Your Perfect Weekend</h1>

        <p>
          Discover fun activities near you based on your interests & budget.
        </p>

        <div className="search-row">
          <SearchBarPrimary categories={categories} onSelect={toggleCategory} />

          <SearchBar />
        </div>

        <div className="budget-section">
          <p>Budget: ₹ {budget}</p>

          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </div>

        <div className="categories-container">
          {visibleCategories.map((category) => (
            <CategoryPill
              key={category}
              category={category}
              selected={selectedCategories.includes(category)}
              onClick={() => toggleCategory(category)}
            />
          ))}

          {showMore &&
            hiddenCategories.map((category) => (
              <CategoryPill
                key={category}
                category={category}
                selected={selectedCategories.includes(category)}
                onClick={() => toggleCategory(category)}
              />
            ))}

          {!showMore ? (
            <button className="more-pill" onClick={() => setShowMore(true)}>
              + More
            </button>
          ) : (
            <button className="more-pill" onClick={() => setShowMore(false)}>
              Show Less
            </button>
          )}
        </div>

        <button className="generate-btn" onClick={() => navigate("/resources")}>
          Generate My Weekend
        </button>
      </div>
    </div>
  );
}

export default Homepage;
