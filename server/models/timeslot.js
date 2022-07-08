const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeslotSchema = new Schema({
  datetime: {
    type: Date,
    required: true,
  },
  workerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

module.exports = mongoose.model("Timeslot", timeslotSchema);