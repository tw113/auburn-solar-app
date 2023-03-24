const mongoose = require('mongoose');
const Request = require('../models/request');
const User = require('../models/user');

//const { validationResult } = require('express-validator');

exports.getAllRequests = (req, res, next) => {
  Request.find().then((requests) => {
    res.status(200).json({
      message: 'Fetched requests',
      requests: requests,
    });
  });
};

exports.getRequestsByWorkerId = (req, res, next) => {
  Request.find({ workerId: req.userId })
  .then((requests) => {
    res.status(200).json({
      message: 'Fetched requests',
      requests: requests,
    });
  });
};

exports.getRequestsReturnAvailableTimes = (req, res, next) => {
  const datestart = new Date(req.params.date);
  const dateend = new Date(req.params.date);
  dateend.setHours(dateend.getHours() + 23);

  // search according to day
  Request.find({ startDatetime: { $gte: datestart, $lte: dateend } }).then(
    (requests) => {
      let blockedTimes = [];

      requests.forEach((request) => {
        blockedTimes.push({
          startDatetime: request.startDatetime,
          endDatetime: request.endDatetime,
        });
      });

      res.status(200).json({
        blockedTimes: blockedTimes,
      });
    }
  );
};

exports.postRequest = async (req, res, next) => {
  const email = req.body.email;
  const phone = req.body.phone;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const address1 = req.body.address1;
  const city = req.body.city;
  const state = req.body.state;
  const apptType = req.body.apptType;
  const startDatetime = new Date(req.body.startDatetime);
  const customerNotes = req.body.customerNotes;

  let _endDatetime = new Date(startDatetime);

  //TODO: assign worker based on appointment type and availibilty
  const workerId = '62ccdd4ef979bf9076bdc5d4';

  //TODO: make sure request with same time doesn't exist

  //TODO: add times to blocked times

  const user = await User.findById(workerId);
  if (!user) {
    const error = new Error('User not found.');
    error.statusCode = 404;
    throw error;
  }

  if (apptType === 'RegularService') {
    _endDatetime.setHours(startDatetime.getHours() + 1);
  } else {
    _endDatetime.setHours(startDatetime.getHours() + 2);
  }

  const newRequest = new Request({
    email: email,
    phone: phone,
    firstName: firstName,
    lastName: lastName,
    address1: address1,
    city: city,
    state: state,
    apptType: apptType,
    startDatetime: startDatetime,
    endDatetime: _endDatetime,
    workerId: workerId,
    customerNotes: customerNotes,
  });

  newRequest
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Request added successfully',
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
