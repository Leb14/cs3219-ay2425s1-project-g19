import React, { useState } from "react";

const AddQuestion = () => {
  const [questionName, setQuestionName] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [category, setCategory] = useState([]);
  const [complexity, setComplexity] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const name = target.name;
    const value = target.value;

    if (name === "title") {
      setQuestionName(value);
    } else if (name === "image") {
      setDateCreated(value);
    } else if (name === "complexity") {
      setComplexity(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    // Add selected category to the existing categories, separated by a comma
    if (!category.includes(selectedValue)) {
      setCategory((prevCategories) =>
        prevCategories ? prevCategories + `${selectedValue}, ` : selectedValue
      );
    }
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

      <form action="/add" method="post" className="h2-styled">
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
                value={questionName}
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
                value={dateCreated}
                placeholder="Image"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row form-group mb-4">
            <div className="col">
              <label className="white-label" htmlFor="category">
                Category
              </label>
              <input
                type="text"
                className="form-control"
                id="categoryInput"
                name="category"
                value={category} // Display categories as comma-separated
                placeholder="Select categories"
                readOnly
              />
              <select
                className="form-control"
                id="category"
                onChange={handleCategoryChange}
              >
                <option value="rray">Array</option>
                <option value="dynamicProgramming">Dynamic Programming</option>
                <option value="graphTheory">Graph Theory</option>
                <option value="greedy">Greedy</option>
                <option value="hashTable">Hash Table</option>
                <option value="heap">Heap</option>
                <option value="linkedlist">Linked List</option>
                <option value="matrix">Matrix</option>
                <option value="searching">Searching</option>
              </select>
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
          <button type="submit" className="btn btn-primary">
            Add Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestion;
