import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import categories from "../config/categoryConfig";
import { addQuestion } from "../api/QuestionsApi"; 
import "../css/addQuestion.css";

const AddQuestion = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setSelectedCategories] = useState([]);
  const [complexity, setComplexity] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    document.getElementById("addQuestionForm").reportValidity();

    const data = {
      title,
      image,
      category,
      complexity,
      description,
    };

    setLoading(true);
    try {
      console.log(data);
      await addQuestion(data);
      setLoading(false);
      navigate("/question");
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert(`Failed to add question: ${error.message}`);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "image") {
      setImage(value);
    } else if (name === "complexity") {
      setComplexity(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (value && !category.includes(value)) {
      setSelectedCategories((prevCategories) => [...prevCategories, value]);
    }
    event.target.value = ""; // Reset dropdown selection
  };

  const removeCategory = (categoryToRemove) => {
    setSelectedCategories(category.filter((item) => item !== categoryToRemove));
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3">
        <h1 className="h2 h2-styled">Create Question</h1>

        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button to="/add" className="btn btn-sm btn-outline-secondary">
              ?
            </button>
          </div>
        </div>
      </div>

      <hr style={{ margin: "10px 15px", color: "white" }} />

      <form id="addQuestionForm" className="h2-styled">
        <div>
          <div className="row form-group mb-4">
            <div className="col">
              <label className="white-label" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={title}
                placeholder="Title"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col">
              <label className="white-label" htmlFor="image">
                Image
              </label>
              <input
                type="text"
                className="form-control"
                id="image"
                name="image"
                value={image}
                placeholder="Optional"
                onChange={handleChange}
                // required
              />
            </div>
          </div>

          <div className="row form-group mb-4">
            <div className="col">
              <label className="white-label" htmlFor="category">
                Category
              </label>

              <div className="row-md-8">
                <div className="multi-select">
                  <select
                    id="categories"
                    defaultValue=""
                    onChange={handleCategoryChange}
                    className="form-select"
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
              <label className="white-label" htmlFor="complexity">
                Complexity
              </label>
              <select
                type="text"
                className="form-control"
                id="complexity"
                name="complexity"
                value={complexity}
                placeholder="Complexity"
                onChange={handleChange}
                required
              >
                <option value="" disabled selected>
                  Select Complexity
                </option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group mb-4">
          <label className="white-label" htmlFor="description">
            Description
          </label>
          <textarea
            className="form-control"
            name="description"
            id="description"
            cols="30"
            rows="12"
            value={description}
            placeholder="Description"
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group mb-4">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Adding..." : "Add Question"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestion;
