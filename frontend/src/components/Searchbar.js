import React from "react";
import "../css/searchbar.css"; // Import CSS file for additional styling

const Searchbar = () => {
  return (
    <div className="searchbar-container">

      <form
        className="nav col-12 col-md-auto flex-fill justify-content-center"
        role="search"
        method="POST"
        action="/search"
      >
        <input
          type="search"
          name="searchTerm"
          className="searchbar-input"
          placeholder="Search..."
          aria-label="Search"
        />
      </form>
    </div>
  );
};

export default Searchbar;
