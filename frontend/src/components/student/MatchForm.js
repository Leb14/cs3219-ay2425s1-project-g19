import React, { useState } from "react";
import categories from "../../config/categoryConfig";

const MatchForm = ({ onSubmit }) => {
  const [category, setCategory] = useState([]);
  const [difficulty, setDifficulty] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById("matchForm").reportValidity();
    onSubmit({ category, difficulty });
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (value && !category.includes(value)) {
      setCategory((prevCategories) => [...prevCategories, value]);
    }
    event.target.value = ""; // Reset dropdown selection
  };

  const removeCategory = (categoryToRemove) => {
    setCategory(category.filter((item) => item !== categoryToRemove));
  };

  return (
    <form id="matchForm" onSubmit={handleSubmit}>
      <div className="form-group mb-4">
        <div className="col">
          <label className="gray-label" htmlFor="category">
            Category
          </label>

          <div className="row-md-8">
            <div className="multi-select">
              <select
                id="categories"
                defaultValue=""
                onChange={handleCategoryChange}
                className="form-select"
                // required
              >
                <option value="" disabled>
                  Select categories
                </option>
                {/* Use categories from config file */}
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>

              <div className="selected-categories">
                {category.map((cat) => (
                  <span key={cat} className="tag bg-grey">
                    {cat}
                    <button
                      type="button"
                      onClick={() => removeCategory(cat)}
                      className="remove-tag"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <label className="gray-label" htmlFor="difficulty">
            Difficulty
          </label>
          <select
            type="text"
            className="form-select"
            id="difficulty"
            name="difficulty"
            value={difficulty}
            placeholder="difficulty"
            onChange={(e) => setDifficulty(e.target.value)}
            required
          >
            <option value="" disabled selected>
              Select Difficulty
            </option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>
      <br />
      <div className="flex items-center justify-center">
        <button type="submit" className="btn justify-center align-middle">
          Find Match
        </button>
      </div>
    </form>
  );
};

export default MatchForm;
