const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../middleware/isAuth');

const User = require('../models/user');

const requestController = require('../controllers/request');

const router = express.Router();

router.get('/requests', isAuth, requestController.getAllRequests);

router.get('/requests:userId', isAuth, requestController.getRequestsByWorkerId);

router.get('/times/:date', requestController.getRequestsReturnAvailableTimes);

router.post(
  '/new',
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
    body('phone').trim().not().isEmpty(),
    body('firstName').trim().isLength({ min: 8 }),
    body('lastName').trim().not().isEmpty(),
    body('address1').trim().not().isEmpty(),
    body('city').trim().not().isEmpty(),
    body('state').trim().not().isEmpty(),
    body('apptType').trim().not().isEmpty(),
    body('startDatetime').trim().not().isEmpty(),
    body('endDatetime').trim().not().isEmpty(),
    body('workerId').trim().not().isEmpty(),
  ],
  requestController.postRequest
);

module.exports = router;
