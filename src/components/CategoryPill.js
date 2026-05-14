function CategoryPill({ category, selected, onClick }) {
    return (
      <button
        className={selected ? "pill active-pill" : "pill"}
        onClick={onClick}
      >
        {category}
      </button>
    );
  }
  
  export default CategoryPill;