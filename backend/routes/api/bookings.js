const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');


/************************************** global variables **************************************/

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

// Postman 31, 32: "Edit a Booking"
// README, line 1181
router.put('/:bookingId', requireAuth, validateBooking, async (req, res) => {

    let bookingId = req.params.bookingId;
    let error = {};

    try {
        let putBooking = await Booking.findByPk(bookingId);

        /*************** Error Handler: Spot couldn't be found ***************/
        if (!putBooking) {
            error.message = "Booking couldn't be found";
            error.status = 404;
            return res
                .json(error);
        }

        let { startDate, endDate } = req.body;

        /*************** Error Handler: endDate cannot be on or before startDate ***************/
        if (startDate >= endDate) {
            error.message = "Validation error"
            error.statusCode = 400
            error.errors = { endDate: "endDate cannot be on or before startDate" }
            return res.json(error)
        }

        let allExistingBookings = await Booking.findAll({
            where: { spotId: putBooking.spotId },
            attributes: {
                exclude: ['id', 'createdAt', 'updatedAt', 'userId', 'spotId']
            }
        });

        /*************** Error Handler: Sorry, this spot is already booked for the specified dates ***************/
        for (let i = 0; i < allExistingBookings.length; i++) {
            let existingBooking = allExistingBookings[i]
            let existingStartDate = existingBooking.startDate
            let existingEndDate = existingBooking.endDate

            if ((startDate === existingStartDate) && (endDate === existingEndDate)) {
                error.message = "Sorry, this spot is already booked for the specified dates";
                error.statusCode = 403;
                error.errors = {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflict with an existing booking",
                }
                return res.json(error)

            } else if ((endDate >= existingStartDate) && (endDate <= existingEndDate)) {
                error.message = "Sorry, this spot is already booked for the specified dates";
                error.statusCode = 403;
                error.errors = { endDate: "End date conflicts with an existing booking" }
                return res.json(error)

            } else if ((startDate >= existingStartDate) && (startDate <= existingEndDate)) {
                error.message = "Sorry, this spot is already booked for the specified dates";
                error.statusCode = 403;
                error.errors = { startDate: "Start date conflicts with an existing booking" }
                return res.json(error)
            }
        }

        /*************** Booking must belong to the current user ***************/
        if (putBooking.userId == req.user.id) {
            if (startDate) putBooking.update({ startDate: startDate });
            if (endDate) putBooking.update({ endDate: endDate });
            await putBooking.save();
            return res
                .status(200)
                .json(putBooking)
        }

    } catch (err) {
        error.message = err;
        return res.json(error);
    }
});


// Postman 35: "Delete a Booking - Send Twice to Error Check Invalid Id On Second Request"
// README, line 1278
router.delete('/:bookingId', requireAuth, async (req, res) => {

    let bookingId = req.params.bookingId;
    let error = {};

    try {
        let deleteBooking = await Booking.findByPk(bookingId);

        if (!deleteBooking) {
            error.message = "Booking couldn't be found";
            error.status = 404;
            return res
                .json(error);
        }

        let currentDate = new Date();
        let dd = String(currentDate.getDate()).padStart(2, '0');
        let mm = String(currentDate.getMonth() + 1).padStart(2, '0');
        let yyyy = currentDate.getFullYear();
        currentDate = `${yyyy}-${mm}-${dd}`;

        if ((deleteBooking.startDate < currentDate) && (deleteBooking.endDate > currentDate)) {
            error.message = "Bookings that have been started can't be deleted";
            error.status = 403;
            return res
                .json(error);
        }

        deleteBooking.destroy();
        deleteBooking.save();
        return res
            .status(200)
            .json({
                "message": "Successfully deleted",
                "statusCode": 200
            });

    } catch (err) {
        error.error = err
        return res.json(error);
    }
});


/************************************* /bookings/current **************************************/

// Postman 28: "Get All Current User's Bookings"
// README, line 986
router.get('/current', requireAuth, async (req, res, next) => {

    let error = {};

    try {
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
                where: { spotId: booking.Spot.id, preview: true },
                attributes: {
                    exclude: ['id', 'preview', 'spotId', 'createdAt', 'updatedAt']
                },
                raw: true
            })
            booking.Spot.previewImage = spotPreviewImg.url

        }
        return res
            .status(200)
            .json({
                "Bookings": getCurrentBookings
            })

    } catch (err) {
        error.error = err
        return res.json(error);
    }
});


/*************************************** error handler ****************************************/

router.use((err, req, res, next) => {
    return res.json(error)
})


/****************************************** export ********************************************/

module.exports = router;
