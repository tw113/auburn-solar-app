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
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
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
    apptType: {
      type: String,
      required: true,
    },
    startDatetime: {
      type: Date,
      required: true,
    },
    endDatetime: {
      type: Date,
      required: true,
    },
    workerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    customerNotes: {
      type: String,
    },
    workerNotes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Request', requestSchema);
