import React from "react";

const AddQuestion = () => {
  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowwrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Question</h1>

        <div className="btn-toolbar mb-2 mb-md 0">
          <div className="btn-group me-2">
            <button to="/add" className="btn btn-sm btn-outline-secondary">
              ?
            </button>
          </div>
        </div>
      </div>

      <div className="col py-3">
        <div className="row">
          <div className="col">
            <nav aroia-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">New Question</li>
              </ol>
            </nav>
          </div>
          <div className="col text-end fw-lighter">
            <b>UserId</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
