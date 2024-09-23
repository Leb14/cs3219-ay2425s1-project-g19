import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import "../css/addQuestion.css";

const AddQuestion = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState([]);
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
    axios
      .post("http://localhost:8000/questions", data)
      .then(() => {
        setLoading(false);
        navigate("/question");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

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

  const handleCategoryChange = (event, index) => {
    event.preventDefault();
    const selectedValue = event.target.value;
    // Check if the category is already in the array and only add it if it's not
    if (!category.includes(selectedValue)) {
      setCategory((prevCategories) => [...prevCategories, selectedValue]);
    }
    const newClickedStates = [...clickedStates];
    newClickedStates[index] = !newClickedStates[index]; // Toggle clicked state for the specific button
    setClickedStates(newClickedStates);
    console.log(category);
  };

  const categories = ["array", "dynamicProgramming", "graphTheory", "greedy", "hashTable", "heap", "linkedlist", "matrix", "searching"];
  const isClickeds = categories.map(() => false);
  const [clickedStates, setClickedStates] = useState(isClickeds);

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

              <div className="categories">
                {/* <button className="categoryButton" onClick={handleCategoryChange} value="array" >Array</button>
                <button className="categoryButton" onClick={handleCategoryChange} value="dynamicProgramming">Dynamic Programming</button>
                <button className="categoryButton" onClick={handleCategoryChange} value="graphTheory">Graph Theory</button>
                <button className="categoryButton" onClick={handleCategoryChange} value="greedy">Greedy</button>
                <button className="categoryButton" onClick={handleCategoryChange} value="hashTable">Hash Table</button>
                <button className="categoryButton" onClick={handleCategoryChange} value="heap">Heap</button>
                <button className="categoryButton" onClick={handleCategoryChange} value="linkedlist">Linked List</button>
                <button className="categoryButton" onClick={handleCategoryChange} value="matrix">Matrix</button>
                <button className="categoryButton" onClick={handleCategoryChange} value="searching">Searching</button> */}

                {clickedStates.map((isClicked, index) => {
                  return (
                    <button
                      key={index}
                      onClick={(event) => handleCategoryChange(event, index)}
                      style={{
                        backgroundColor: isClicked ? 'lightblue' : 'pink', // Change color based on state
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '0.4rem',
                        margin: '0.2rem',
                        borderRadius: '0.5rem',
                        textAlign: 'center',
                        height: '2.375rem',
                        border: 'none',
                      }}
                      value={categories[index]}
                    >
                      {categories[index]}
                    </button>
                  );
                })}
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
          >
            Add Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestion;
