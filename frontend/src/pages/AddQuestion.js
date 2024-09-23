import React, { useState } from 'react';
import { createQuestion } from '../api/QuestionsApiService';  // Adjust the path as necessary

const AddQuestion = () => {
  const [questionName, setQuestionName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [complexity, setComplexity] = useState('');
  const [description, setDescription] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'questionName') {
      setQuestionName(value);
    } else if (name === 'description') {
      setDescription(value);
    } else if (name === 'complexity') {
      setComplexity(value);
    }
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (value && !selectedCategories.includes(value)) {
      setSelectedCategories([...selectedCategories, value]);
    }
    event.target.value = ''; // Reset dropdown selection
  };

  const removeCategory = (category) => {
    setSelectedCategories(selectedCategories.filter((item) => item !== category));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newQuestion = {
        title: questionName,
        category: selectedCategories,
        complexity,
        description,
    };

    const formData = new FormData();
    for (const key in newQuestion) {
        formData.append(key, newQuestion[key]);
    }

    // Log the form data for debugging
    for (const [key, value] of formData.entries()) {
        console.log(key, value);
    }

    try {
        await createQuestion(formData);
        alert('Question created successfully!');
        // Reset form fields after submission
        setQuestionName('');
        setSelectedCategories([]);
        setComplexity('');
        setDescription('');
    } catch (error) {
        console.error('Error creating question:', error);
        alert('There was an error creating the question.');
    }
};


  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3">
        <h1 className="h2 h2-styled">Create Question</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button className="btn btn-sm btn-outline-secondary">?</button>
          </div>
        </div>
      </div>

      <hr style={{ margin: '10px 15px', color: 'white' }} />

      <form onSubmit={handleSubmit} className="h2-styled">
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
              onChange={handleInputChange}
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
            rows="4"
            value={description}
            placeholder="Description"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="row form-group mb-4">
          <div className="col-md-4">
            <label htmlFor="categories">Category</label>
          </div>
          
          <div className="row-md-8">
            <div className="multi-select">
              <select
                id="categories"
                onChange={handleCategoryChange}
                defaultValue=""
                className="form-select"
              >
                <option value="" disabled>Select categories</option>
                <option value="Array">Array</option>
                <option value="Dynamic Programming">Dynamic Programming</option>
                <option value="Greedy Algorithm">Greedy Algorithm</option>
                <option value="Graph">Graph</option>
                <option value="Tree">Tree</option>
                <option value="Searching">Searching</option>
                <option value="Shortest Path">Shortest Path</option>
                {/* Add more categories as needed */}
              </select>

              <div className="selected-categories">
                {selectedCategories.map((category) => (
                  <span key={category} className="tag bg-grey">
                    {category}
                    <button type="button" onClick={() => removeCategory(category)} className="remove-tag">×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row form-group mb-4">
          <div className="col-md-4">
            <label className="white-label" htmlFor="complexity">Complexity</label>
          </div>
          
          <div className="row-md-8">
            <select
              id="complexity"
              name="complexity"
              value={complexity}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value="" disabled>Select complexity</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
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
