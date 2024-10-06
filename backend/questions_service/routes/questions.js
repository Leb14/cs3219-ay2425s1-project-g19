const express = require('express');
const router = express.Router();
const { verifyAccessToken, verifyIsAdmin } = require('../controllers/middlewares/access-control');

const { getQuestionById, checkDuplicateTitle } = require('../controllers/middlewares/questionMiddleware');
const { listQuestions, getQuestion, createQuestion, updateQuestion, deleteQuestion } = require('../controllers/questionController');

// Get all questions
router.get('/', verifyAccessToken, verifyIsAdmin, listQuestions);

// Get a question by id
router.get('/:id', verifyAccessToken, getQuestionById, getQuestion);

// Create a question
router.post('/', verifyAccessToken, verifyIsAdmin, checkDuplicateTitle, createQuestion);

// Update a question
router.patch('/:id', verifyAccessToken, verifyIsAdmin, checkDuplicateTitle, getQuestionById, updateQuestion);

// Delete a question
router.delete('/:id', verifyAccessToken, verifyIsAdmin, getQuestionById, deleteQuestion);


module.exports = router;