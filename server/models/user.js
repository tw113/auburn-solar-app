const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    ref: 'Role',
    required: true
  },
  assignedRequests: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Request'
    }
  ]
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);