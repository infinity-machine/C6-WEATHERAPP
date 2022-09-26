const { Schema, SchemaTypes, model} = require('mongoose');

const savedLocSchema = new Schema({
    lat: {
        type: Number,
        required: true
    },
    lon: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    }
})

const SavedLoc = model('SavedLoc', savedLocSchema);
module.exports = { SavedLoc, savedLocSchema}