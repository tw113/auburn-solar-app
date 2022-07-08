const mongoose = require('mongoose');
const Request = require('../models/request');
const User = require('../models/user');
const Timeslot = require('../models/timeslot');

//const { validationResult } = require('express-validator');

exports.getRequests = (req, res, next) => {
  Request.find({ workerId: req.userId }).then((requests) => {
    res.status(200).json({
      message: 'Fetched requests',
      requests: requests,
    });
  });
};

exports.postRequest = async (req, res, next) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const address1 = req.body.address1;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const generatorType = req.body.generatorType;
  const customerNotes = req.body.customerNotes;
  const chosenTimeslot = '62c7bc8d5f7446e8349f66f9'; // TODO:req.body.chosenTimeslot;

  // get worker attached to the timeslot
  const timeslot = await Timeslot.findById(chosenTimeslot);
  const userId = timeslot.workerId;

  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found.');
    error.statusCode = 404;
    throw error;
  }

  const newRequest = new Request({
    email: email,
    firstName: firstName,
    lastName: lastName,
    address1: address1,
    city: city,
    state: state,
    zip: zip,
    generatorType: generatorType,
    chosenDatetime: new Date(timeslot.datetime),
    chosenTimeslotId: chosenTimeslot,
    workerId: userId,
    customerNotes: customerNotes,
  });

  newRequest
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Request added successfully',
        requestId: result._id,
        newRequest: result,
      });
      // update timeslot to isBooked true
      timeslot.isBooked = true;
      return timeslot.save();
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
