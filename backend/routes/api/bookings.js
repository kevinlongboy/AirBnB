const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');

/************************************** global variables **************************************/

let error = {};

const validateBooking = [
    check('startDate')
        .exists({ checkFalsy: true }),
    check('endDate')
        .exists({ checkFalsy: true })
        .isAfter(this.startDate)
        .withMessage("endDate cannot be on or before startDate"),
    handleValidationErrors
]

/************************************ /bookings/:bookingId ************************************/

// README, line 1181
router.put('/:bookingId', requireAuth, validateBooking, async (req, res) => {

    let bookingId = req.params.bookingId;
    let putBooking = await Review.findByPk(bookingId);

    if (!putBooking) {
        error.message = "Booking couldn't be found";
        error.status = 404;
        next(err);
    }

    let { startDate, endDate } = req.body;

    if (startDateExists) {
        error.message = "Start date conflicts with an existing booking";
        statusCode = 403;
        next(err)
    }
    if (endDateExists) {
        error.message = "End date conflicts with an existing booking";
        statusCode = 403;
        next(err)
    }

    if (putBooking.endDate.isAfter(this.date)) {
        error.message = "Past bookings can't be modified";
        statusCode = 403;
        next(err)
    }

    try {
        if (startDate) putBooking, set({ startDate: startDate });
        if (endDate) putBooking, set({ endDate: endDate });
        await putBooking.save();
        res.status(200).json(putBooking)

    } catch (err) {
        error.message = "Validation Error";
        error.statusCode = 400;
        next(err);
    }
});


// README, line 1278
router.delete('/:bookingId', requireAuth, async (req, res) => {

    let bookingId = req.params.bookingId;
    let deleteBooking = await Review.findByPk(bookingId);

    if (!deleteBooking) {
        error.message = "Booking couldn't be found";
        error.status = 404;
        next(err);

    } else if (deleteBooking.startDate.isBefore(this.date)) {
        error.message = "Bookings that have been started can't be deleted";
        error.status = 403;
        next(err);

    } else {
        deleteBooking.destroy();
        deleteBooking.save();
        res
            .status(200)
            .json({
                "message": "Successfully deleted",
                "statusCode": 200
            })
    };
});


/************************************* /bookings/current **************************************/

// Postman 28: "Get All Current User's Bookings"
// README, line 986
router.get('/current', requireAuth, async (req, res, next) => {


    let getCurrentBookings = await Booking.findAll({
        where: { userId: req.user.id },
        raw: true
    });

    for (let i = 0; i < getCurrentBookings.length; i++) {

        let booking = getCurrentBookings[i];

        let bookingSpotInfo = await Spot.findByPk(booking.spotId, {
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            },
            raw: true
        })
        booking.Spot = bookingSpotInfo;

        let spotPreviewImg = await SpotImage.findOne({
            where: { spotId: booking.Spot.id, preview: 1 },
            attributes: {
                exclude: ['id', 'preview', 'spotId', 'createdAt', 'updatedAt']
            },
            raw: true
        })
        booking.Spot.previewImage = spotPreviewImg.url

    }
    res
        .status(200)
        .json({
            "Bookings": getCurrentBookings
        })
});

/*************************************** error handler ****************************************/

router.use((err, req, res, next) => {
    res.json(error)
})


/****************************************** export ********************************************/

module.exports = router;
