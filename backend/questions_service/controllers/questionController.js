const Question = require("../models/question");

// @desc    Get all questions
// @route   GET /questions
// @access  Public
const listQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a question by id
// @route   GET /questions/:id
// @access  Public
const getQuestion = async (req, res) => {
  res.json(res.question);
};

// @desc    Create a question
// @route   POST /questions
// @access  Public
const createQuestion = async (req, res) => {
  const question = new Question({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    complexity: req.body.complexity,
    image: req.body.image,
  });

  try {
    const newQuestion = await question.save();
    res.json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a question
// @route   PATCH /questions/:id
// @access  Public
const updateQuestion = async (req, res) => {
  if (req.body.title != null) {
    res.question.title = req.body.title;
  }
  if (req.body.description != null) {
    res.question.description = req.body.description;
  }
  if (req.body.category != null) {
    res.question.category = req.body.category;
  }
  if (req.body.complexity != null) {
    res.question.complexity = req.body.complexity;
  }
  if (req.body.image != null) {
    res.question.image = req.body.image;
  }

  try {
    const updatedQuestion = await res.question.save();
    res.json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a question
// @route   DELETE /questions/:id
// @access  Public
const deleteQuestion = async (req, res) => {
  try {
    await res.question.deleteOne();
    res.json({ message: `Question ${req.params.id} deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  listQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
