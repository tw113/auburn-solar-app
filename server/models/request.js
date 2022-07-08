const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
    generatorType: {
      type: String,
      required: true,
    },
    chosenDatetime: {
      type: Date,
      required: true,
    },
    chosenTimeslotId: {
      type: Schema.Types.ObjectId,
      ref: 'Opening',
      required: true,
    },
    workerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    customerNotes: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Request', requestSchema);
