const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    },
    images: {
        type: [String],
        required: false
    }
});

module.exports = mongoose.model('Question', questionSchema);