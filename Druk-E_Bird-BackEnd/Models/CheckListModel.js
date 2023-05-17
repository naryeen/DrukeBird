const mongoose = require ('mongoose')

const checkListSchema = new mongoose.Schema({
    Date: {
        type: Date,
        required: [true, 'Date' ],
        default: Date.now
    },

    Time: {
        type: Date,
        required: [true, 'Time'],
        default: Date.now
    },

    Location: {
        type: Date,
        type: [Number], // Array of numbers representing latitude and longitude
        default: [0, 0],// Default location set to [0, 0] (latitude, longitude)
        required:[true, 'Location'],
    },
   
    BirdName: {
        type: String,
        required: [true, 'BirdName'],
        default:"null"
    },

    Count: {
        type: Number,
        required: [true, 'Count'],
        defualt: 0
    },

    EndpointLoaction: {
        type: String,
        required: [true, 'EndPointLoaction!'],
        default:"null"
    },


    active: {
        type: Boolean,
        default: true,
        // select: false,
    },

})
// mongooose middleware

const CheckList = mongoose.model('User', checkListSchema )
module.exports = CheckList


