import React, { useEffect, useState } from 'react';
import { getAllQuestions } from '../api/QuestionsApiService';

const QuestionsComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10); 

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getAllQuestions();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const indexOfLastQuestion = currentPage * entriesPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - entriesPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const totalPages = Math.ceil(questions.length / entriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (questionId) => {
    // Redirect to edit page or handle edit functionality
    console.log(`Edit question with ID: ${questionId}`);
    // For example, you can redirect to the edit page:
    // window.location.href = `/edit-question/${questionId}`;
  };

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Date Created</th>
            <th>Actions</th> {/* New column for actions */}
          </tr>
        </thead>
        <tbody>
          {currentQuestions.map((question) => (
            <tr key={question._id}>
              <td>{question.title}</td>
              <td>{question.category ? question.category.join(', ') : 'No Category'}</td>
              <td>{new Date(question.dateCreated).toLocaleString()}</td>
              <td>
                <button 
                  className="btn btn-primary" 
                  onClick={() => handleEdit(question._id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionsComponent;
