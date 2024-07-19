const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema ({
    post: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Place'},
    user: {type:mongoose.Schema.Types.ObjectId, required:true},
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;