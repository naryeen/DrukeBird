const mongoose = require ('mongoose')

const currentLocation = new mongoose.Schema({
    latitude:{
        type:Number,
        required: [true, 'latitude' ],
        default:0
    },

    longtitude:{
        type:Number,
        required: [true, 'longtitude' ],
        default:0
    }
})

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

    // Location: {
    //     type: String,
    //     type: [Number], // Array of numbers representing latitude and longitude
    //     default: [0, 0],// Default location set to [0, 0] (latitude, longitude)
    //     required:[true, 'Location'],
    // },
    
    Location: currentLocation,
   
    BirdName: {
        type: String,
        required: [true, 'BirdName'],
        default:"null"
    },
    Count: {
        type: Number,
        required: [true, 'Count'],
        default: 0
    },
    
    EndpointLoaction: {
        type: String,
        required: [true, 'EndPointLoaction!'],
        default:"null"
    },
    BirdType: {
        type: String,
        enum: ['Adult', 'Juvenile'],
        default: 'Adult',
    },
    JAcounts:{
        type:Number,
        require: [true, 'JAcount'],
        default:0
    },
    
    active: {
        type: Boolean,
        default: true,
        // select: false,
    },

})
// mongooose middleware

const CheckList = mongoose.model('CheckList', checkListSchema )
module.exports = CheckList


