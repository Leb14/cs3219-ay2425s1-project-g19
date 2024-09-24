const Question = require('../../models/question');

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



async function getQuestionByTitle(req, res, next) {
    let question;
    try {
        question = await Question.findOne({ title: req.params.title });

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

module.exports = { getQuestionById, getQuestionByTitle };