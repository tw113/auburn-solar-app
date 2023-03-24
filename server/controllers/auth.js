// auth controller

const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Role = require('../models/role');
//const ApptType = require('../models/appt_type');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        roleId: '62ccd144d521b973f4ff3121', // lowest permissions (customer)
        blockedTime: [ // default saturday off
          { startDatetime: '2022-07-16T14:00:00.000Z', weekday: 'S' },
          { startDatetime: '2022-07-16T15:00:00.000Z', weekday: 'S' },
          { startDatetime: '2022-07-16T16:00:00.000Z', weekday: 'S' },
          { startDatetime: '2022-07-16T17:00:00.000Z', weekday: 'S' },
          { startDatetime: '2022-07-16T18:00:00.000Z', weekday: 'S' },
          { startDatetime: '2022-07-16T19:00:00.000Z', weekday: 'S' },
          { startDatetime: '2022-07-16T20:00:00.000Z', weekday: 'S' },
          { startDatetime: '2022-07-16T21:00:00.000Z', weekday: 'S' },
          { startDatetime: '2022-07-16T22:00:00.000Z', weekday: 'S' },
        ],
      });
      return user.save();
    })
    .then((result) => {
      res
        .status(201)
        .json({ message: 'You have successfully created an account' });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const expiration = '24h';

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({
      errorMessage: errors.array()[0].errorMessage,
      validationErrors: errors.array(),
    });
  }

  await User.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((result) => {
          if (result) {
            //Create new signature packed into jsonwebtoken
            const token = jwt.sign(
              {
                userId: user._id.toString(),
                email: user.email,
              },
              process.env.JWT_SECRET,
              { expiresIn: expiration }
            );
            Role.findById(user.roleId.toString())
              .then((role) => {
                res.status(200).json({
                  message: 'Successfully Logged In',
                  token: token,
                  expiresIn: expiration,
                  user: user,
                  role: role.level,
                });
              })
              .catch((err) => {
                const error = new Error('User not found.');
                error.statusCode = 404;
                throw error;
              });
          } else {
            res.status(400).json({ message: 'Invalid user information' });
          }
        });
      } else {
        res.status(401).json({ message: 'User not found' });
      }
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
