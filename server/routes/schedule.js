const express = require('express');
const { body } = require('express-validator');

const scheduleController = require('../controllers/schedule');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get('/times', isAuth, scheduleController.getBlockedTimesByWorkerId);

router.post('/add-block', isAuth, scheduleController.postBlockedTime);

module.exports = router;
