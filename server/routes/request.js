const express = require('express');
const { body } = require('express-validator');
const isAuth = require("../middleware/isAuth");

const User = require('../models/user');

const requestController = require('../controllers/request');

const router = express.Router();

router.get('/requests', isAuth, requestController.getRequests);

router.post(
  '/createRequest',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('Email address already exists.');
          }
        });
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 8 }),
    body('firstName').trim().not().isEmpty(),
    body('address1').trim().not().isEmpty(),
    body('city').trim().not().isEmpty(),
    body('state').trim().not().isEmpty(),
    body('zip').trim().not().isEmpty(),
    body('generatorType').trim().not().isEmpty(),
  ],
  requestController.postRequest
);

module.exports = router;
