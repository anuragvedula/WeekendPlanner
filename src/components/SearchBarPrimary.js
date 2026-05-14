import { useState } from "react";

import "../css/searchBarPrimary.css";

function SearchBarPrimary({ categories, onSelect }) {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="searchbar-primary">
      <input
        type="text"
        placeholder="Search categories..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => {
          setTimeout(() => setShowDropdown(false), 200);
        }}
      />

      {showDropdown && query && (
        <div className="dropdown">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div
                key={category}
                className="dropdown-item"
                onClick={() => {
                  onSelect(category);
                  setQuery(category);
                  setShowDropdown(false);
                }}
              >
                {category}
              </div>
            ))
          ) : (
            <div className="dropdown-item">No Match Found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBarPrimary;