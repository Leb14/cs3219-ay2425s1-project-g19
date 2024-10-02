import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import Searchbar from "../components/Searchbar";
import { getQuestionList, deleteQuestion } from "../api/QuestionsApi"; 

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const data = await getQuestionList();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Failed to fetch questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteQuestion(id);
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question._id !== id)
      );
      console.log("Delete successful");
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <div className="content">
        {/* <Searchbar/> */}
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3">
          <h1 className="h2 h2-styled">Questions</h1>
          <div className="btn-group me-2">
            <Link to="/add" className="btn btn-sm btn-white-text">
              + New Question
            </Link>
          </div>
        </div>

        <div className="mb-2">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchInput}
            onChange={handleSearchChange}
            className="form-control"
            style={{height: "50px", fontSize: "18px"}}
          />
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
              <th scope="col" className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan="5">Loading...</td></tr>}
            {error && <tr><td colSpan="5">{error}</td></tr>}
            {filteredQuestions.length === 0 && !loading ? (
              <tr><td colSpan="5">No questions found</td></tr>
            ) : (
              filteredQuestions.map((question) => (
                <tr className="align-middle" key={question._id}>
                  <td>{question.title}</td>
                  <td style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", maxWidth: "30rem"}}>{question.description}</td>
                  <td>{question.category ? question.category.join(", ") : "No category"}</td>
                  <td>{question.complexity}</td>
                  <td className="text-end">
                    <div className="d-flex flex-row justify-content-end gap-2">
                      <Link to={`/view/${question._id}`} className="btn btn-primary btn-small">
                        <i className="bi bi-eye"></i>
                      </Link>
                      <Link to={`/edit/${question._id}`} className="btn btn-warning btn-small">
                        <i className="bi bi-pencil"></i>
                      </Link>
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this question?")) {
                            handleDelete(question._id);
                          }
                        }}
                        className="btn btn-danger btn-small"
                      >
                        <i className="bi bi-person-x"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Questions;
