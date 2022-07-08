const express = require('express');
const { body } = require('express-validator');

const Timeslot = require('../models/timeslot');

const scheduleController = require('../controllers/schedule');

const router = express.Router();

router.get('/timeslots', scheduleController.getOpenTimeslots);

module.exports = router;