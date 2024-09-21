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
    category: {
        type: [String],
        required: true
    },
    complexity: {
        type: Number,
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