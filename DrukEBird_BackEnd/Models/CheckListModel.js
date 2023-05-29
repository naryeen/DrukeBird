const mongoose = require('mongoose');
const moment = require('moment');

const currentLocation = new mongoose.Schema({
  latitude: {
    type: Number,
    required: [true, 'latitude'],
    default: 0,
  },
  longitude: {
    type: Number,
    required: [true, 'longitude'],
    default: 0,
  },
});

const EndpointLocation =new mongoose.Schema({
    dzongkhag: {
      type: String,
      default: "null",
    },
    gewog: {
      type: String,
      default: "null",
    },
    village: {
      type: String,
      default: "null",
    },
  })

  const detailSchema = new mongoose.Schema(
    {
      id: {
        type: String,
        required: true,
      },
      selectedDate: {
        type: String,
        required: [true, 'Date'],
        default: moment().format('YYYY-MM-DD'),
      },
      selectedTime: {
        type: String,
        required: [true, 'Time'],
        default: moment().format('HH:mm:ss'),
      },
      observer: {
        type: String,
        required: [true, 'Observer'],
        default: 'null',
      },
      currentLocation: currentLocation,
      count: {
        type: Number,
        required: [true, 'Count'],
        default: 0,
      },
      photo: {
        type: String,
        default: 'null',
      },
      EndpointLocation: [EndpointLocation],
      status: {
        type: String,
        default: 'draftchecklist',
      },
    },
    { _id: false } // Disable the default _id field
  );
  
const BirdsSchema = new mongoose.Schema({
  CheckListName: {
    type: String,
    required: [true, 'CheckListName'],
    default: "null",
  },
  BirdName: {
    type: String,
    required: [true, 'BirdName'],
    default: "null",
  },
  StartbirdingData: [detailSchema],
});

const checkList = mongoose.model('checkList', BirdsSchema);
module.exports = checkList;
