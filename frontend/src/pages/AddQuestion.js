import React, { useState } from "react";

const AddQuestion = () => {
  const [questionName, setQuestionName] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [category, setCategory] = useState("");
  const [complexity, setComplexity] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const target = event.target;
    const name = target.name;
    const value = target.value;

    if (name === "questionName") {
      setQuestionName(value);
    } else if (name === "dateCreated") {
      setDateCreated(value);
    } else if (name === "category") {
      setCategory(value);
    } else if (name === "complexity") {
      setComplexity(value);
    } else if (name === "description") {
      setDescription(value);
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
      
      <hr style={{ margin: "10px 15px", color: "white"}} />

      <form action="/add" method="post" className="h2-styled">
        <div className="row form-group mb-4">
          <div className="col">
            <label className="white-label" htmlFor="questionName">Question Name</label>
            <input
              type="text"
              className="form-control"
              id="questionName"
              name="questionName"
              value={questionName}
              placeholder="Question Name"
              onChange={handleSubmit}
              required
            />
          </div>

          <div className="col">
            <label className="white-label" htmlFor="dateCreated">Date Created</label>
            <input
              type="text"
              className="form-control"
              id="dateCreated"
              name="dateCreated"
              value={dateCreated}
              placeholder="Date Created"
              onChange={handleSubmit}
              required
            />
          </div>
        </div>

        <div className="row form-group mb-4">
          <div className="col">
            <label className="white-label" htmlFor="category">Category</label>
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              value={category}
              placeholder="Category"
              onChange={handleSubmit}
              required
            />
          </div>

          <div className="col">
            <label className="white-label" htmlFor="complexity">Complexity</label>
            <input
              type="text"
              className="form-control"
              id="complexity"
              name="complexity"
              value={complexity}
              placeholder="Complexity"
              onChange={handleSubmit}
              required
            />
          </div>
        </div>

        <div className="form-group mb-4">
          <label className="white-label" htmlFor="description">Description</label>
          <textarea
            className="form-control"
            name="description"
            id="description"
            cols="30"
            rows="12"
            value={description}
            placeholder="Description"
            onChange={handleSubmit}
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
