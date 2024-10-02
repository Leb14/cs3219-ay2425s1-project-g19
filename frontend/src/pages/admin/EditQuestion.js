import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import categories from "../../config/categoryConfig";
import { getQuestion, updateQuestion } from "../../api/QuestionsApi";
import "../../css/addQuestion.css";

const EditQuestion = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setSelectedCategories] = useState([]);
  const [complexity, setComplexity] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the question id from the route parameter

  // Function to preload data
  useEffect(() => {
    const preloadQuestion = async () => {
      setLoading(true);
      try {
        const questionData = await getQuestion(id); // Fetch the question data by id
        setTitle(questionData.title); // Set state with the fetched data
        setImage(questionData.image);
        setSelectedCategories(questionData.category);
        setComplexity(questionData.complexity);
        setDescription(questionData.description);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching question:", error);
      }
    };

    preloadQuestion(); // Call the function on component mount
  }, [id]); // `useEffect` depends on `id`, so it runs when `id` changes

  // Function to handle input changes
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

  // Function to handle category selection
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (value && !category.includes(value)) {
      setSelectedCategories((prevCategories) => [...prevCategories, value]);
    }
    event.target.value = ""; // Reset dropdown selection
  };

  // Function to remove selected category
  const removeCategory = (categoryToRemove) => {
    setSelectedCategories(category.filter((item) => item !== categoryToRemove));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    document.getElementById("updateQuestionForm").reportValidity();

    const data = {
      title,
      image,
      category,
      complexity,
      description,
    };

    setLoading(true);
    try {
      await updateQuestion(id, data);
      setLoading(false);
      navigate("/question");
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3">
        <h1 className="h2 h2-styled">Edit Question</h1>
      </div>

      <hr style={{ margin: "10px 15px", color: "white" }} />

      <form
        id="updateQuestionForm"
        className="h2-styled"
        onSubmit={handleSubmit}
      >
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
                value={title} // Preload title here
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
                value={image} // Preload image here
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
                value={complexity} // Preload complexity here
                placeholder="Complexity"
                onChange={handleChange}
                required
              >
                <option value="" disabled>
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
            value={description} // Preload description here
            placeholder="Description"
            onChange={handleChange}
            required
          ></textarea>
        </div>
      </form>
      <div className="add-button mb-4 d-flex justify-content-end gap-2">
        <button
          className="btn"
          onClick={() => navigate("/question")} // Fixed the Cancel button
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn"
          onClick={handleSubmit}
          disabled={loading} // Disable the button while loading
        >
          {loading ? "saving..." : "Save Question"}
        </button>
      </div>
    </div>
  );
};

export default EditQuestion;
