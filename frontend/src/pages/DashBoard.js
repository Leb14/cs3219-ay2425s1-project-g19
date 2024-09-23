import React from "react";
import { Link } from "react-router-dom";

const DashBoard = () => {
  return (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowwrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Dashboard</h1>

      <div className="btn-toolbar mb-2 mb-md 0">
        <div className="btn-group me-2">
          <Link to="/add" className="btn btn-sm btn-outline-secondary">
            + New Question
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
