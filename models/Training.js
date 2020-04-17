var mongoose = require('mongoose');

var TrainingSchema = new mongoose.Schema({
    title: String,
    videos: Array,
}, {
    collection: 'training'
});

var Training = mongoose.model('Training', TrainingSchema);

module.exports = Training;