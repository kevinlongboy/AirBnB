const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Booking, Review, ReviewImage, Spot, User } = require('../../db/models');

/************************************** global variables **************************************/

let error = {};



/************************************ /bookings/:bookingId ************************************/

/************************************* /bookings/current **************************************/


/*************************************** error handler ****************************************/

router.use((err, req, res, next) => {
    res.json(err)
})



/****************************************** export ********************************************/

module.exports = router;
