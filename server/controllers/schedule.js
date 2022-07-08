const Timeslot = require('../models/timeslot');

exports.getOpenTimeslots = (req, res, next) => {
  Timeslot.find({ isBooked: false })
    .then((timeslots) => {
      res.status(200).json({
        message: 'open timeslots fetched',
        timeslots: timeslots,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postTimeslot = (req, res, next) => {
  const newTimeslot = new Timeslot({
    datetime: new Date(2022, 7, 7, 9),
    workerId: '62c521fa008ce6eef9a08184',
  });

  newTimeslot
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'timeslot created',
        timeslotId: result._id,
        timeslot: result,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
