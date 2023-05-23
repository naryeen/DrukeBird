const mongoose = require ('mongoose')
const validator = require('validator')

const unknownSchema = new mongoose.Schema({
    unknownBirdPic: {
        type: String,
        required: true,
      },
      unknownCount: {
        type: Number,
        default: 0,
        required: true
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'It must belong to a User.']
      },
})

const Unknown = mongoose.model('Unknown', unknownSchema)
module.exports = Unknown