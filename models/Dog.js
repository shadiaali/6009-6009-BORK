var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    life_expectancy: {
        type: String,
        required: true
    },
    caring_techniques: [{Grooming: String, Excercise: String}],
    living_conditions: {
        type: String,
        required: true
    },
    tip: {
        type: String,
        required: true
    },
    training: {
        type: Schema.Types.ObjectId,
        ref: "Training"
    }
}, {
    collection: 'breeds'
});

var Dog = mongoose.model('Dog', DogSchema);

module.exports = Dog;