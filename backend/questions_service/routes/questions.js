const express = require('express');
const router = express.Router();
const Question = require('../models/question');

// Middlewares
async function getQuestionById(req, res, next) {
    let question;
    try {
        question = await Question.findById(req.params.id);

        // If the question does not exist, return a 404 response
        if (question == null) {
            return res.status(404).json({ message: 'Cannot find question' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.question = question;
    next();
}


// Get all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a question by id
router.get('/:id', getQuestionById, async (req, res) => {
    res.json(res.question);
});

// Create a question
router.post('/', async (req, res) => {
    const question = new Question({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        complexity: req.body.complexity,
        images: req.body.images
    });

    try {
        const newQuestion = await question.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a question
router.patch('/:id', getQuestionById, async (req, res) => {
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
    if (req.body.images != null) {
        res.question.images = req.body.images;
    }

    try {
        const updatedQuestion = await res.question.save();
        res.json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a question
router.delete('/:id', getQuestionById, async (req, res) => {
    try {
        await res.question.deleteOne();
        res.json({ message: `Question ${req.params.id} deleted` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;