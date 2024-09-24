const express = require('express');
const router = express.Router();
const { getQuestionById, getQuestionByTitle } = require('../controllers/middlewares/questionMiddleware');
const { listQuestions, getQuestion, createQuestion, updateQuestion, deleteQuestion } = require('../controllers/questionController');

// Get all questions
router.get('/', listQuestions);

// Get a question by id
router.get('/:id', getQuestionById, getQuestion);

router.get('/title/:title', getQuestionByTitle, getQuestion);

// Create a question
router.post('/', createQuestion);

// Update a question
router.patch('/:id', getQuestionById, updateQuestion);

// Delete a question
router.delete('/:id', getQuestionById, deleteQuestion);


module.exports = router;