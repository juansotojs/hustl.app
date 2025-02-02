const mongoose = require('mongoose');
const {Schema} = mongoose;


const PlaceSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectID, ref:'User'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
});

const PlaceModel = mongoose.model('Place', PlaceSchema);

module.exports = PlaceModel;