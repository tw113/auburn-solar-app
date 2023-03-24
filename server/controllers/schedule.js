// schedule controller
const mongoose = require('mongoose');
const User = require('../models/user');

exports.getBlockedTimesByWorkerId = (req, res, next) => {
  User.findOne({ workerId: req.userId })
    .then((user) => {
      res.status(200).json({
        message: 'open timeslots fetched',
        blockedTimes: user.blockedTime,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postBlockedTime = (req, res, next) => {
  const newBlockedTimes = req.body;
  //console.log(newBlockedTimes);
  User.findOne({ workerId: req.userId })
    .then((user) => {
      if(user.blockedTime) {
        user.blockedTime = newBlockedTimes;
      } else {
        user.blockedTime = []
      }

      return user.save();
    })
    .then(() => {
      res.status(201).json({
        message: 'timeslots added',
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
