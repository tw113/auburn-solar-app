// auth controller

const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

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
        role: 0, // lowest permissions (customer)
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

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const expiration = '1h';

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({
      errorMessage: errors.array()[0].errorMessage,
      validationErrors: errors.array(),
    });
  }

  User.findOne({ email: email })
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
            res.status(200).json({
              message: 'Successfully Logged In',
              userId: user._id.toString(),
              role: user.role,
              token: token,
              expiresIn: expiration,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
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
