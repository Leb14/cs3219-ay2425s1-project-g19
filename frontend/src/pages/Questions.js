import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/questions")
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  });

  const handleDelete = (id) => {
    fetch(`/edit/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete successful", data);
      })
      .catch((error) => {
        console.error("Error deleting:", error);
      });
  }; // Add a closing curly brace here

  return (
    <div>
      {/* Keep the header here */}
      <Header />

      {/* Add content wrapper to push content down from under the header */}
      <div className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3">
          <h1 className="h2 h2-styled">Questions</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <Link to="/add" className="btn btn-sm btn-outline-secondary">
                + New Question
              </Link>
            </div>
          </div>
        </div>
        <hr style={{ margin: "10px 15px", color: "white" }} />
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Complexity</th>
              <th scope="col" className="text-end">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {questions.map((question) => (
              <tr className="align-middle">
                <td>{question.title}</td>
                <td>{question.description}</td>
                <td>
                  {question.category
                    ? question.category.join(", ")
                    : "No category"}
                </td>
                <td>{question.complexity}</td>
                <td className="text-end">
                  <div className="d-flex flex-row justify-content-end gap-2">
                    <a
                      href={`/view/${question._id}`}
                      type="button"
                      className="btn btn-primary btn-small"
                    >
                      <i className="bi bi-eye"></i>
                    </a>

                    <a
                      href={`/edit/${question._id}`}
                      type="button"
                      className="btn btn-warning btn-small"
                    >
                      <i className="bi bi-pencil"></i>
                    </a>

                    <form
                      className="position-relative"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleDelete(question._id); // Trigger DELETE request on form submit
                      }}
                    >
                      <button
                        type="submit"
                        className="btn btn-danger btn-small"
                      >
                        <i className="bi bi-person-x"></i>
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Questions;
