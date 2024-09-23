import React from "react";
import { Link } from "react-router-dom";
import QuestionsComponent from "../components/QuestionList";
import Header from "../components/Header";

const Questions = () => {
  return (
    <div>
      {/* Keep the header here */}
      <Header />

      {/* Add content wrapper to push content down from under the header */}
      <div className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3">
         <h1 className="h2 h2-styled">
            Questions
          </h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <Link to="/add" className="btn btn-sm btn-outline-secondary">
                + New Question
              </Link>
            </div>
          </div>
        </div>
        <hr style={{ margin: "10px 15px", color: "white"}} />
        <QuestionsComponent/>
      </div>
    </div>
  );
};

export default Questions;
