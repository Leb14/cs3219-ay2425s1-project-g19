const Question = require('../../models/question');

const getQuestionById = async (req, res, next) => {
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

const checkDuplicateTitle = async (req, res, next) => {
    const title = req.body.title;
    try {
        const existingQuestion = await Question.findOne({ title: title });

        if (existingQuestion) {
            return res.status(400).json({ message: 'Question with this title already exists' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    next();
}

module.exports = {getQuestionById, checkDuplicateTitle};