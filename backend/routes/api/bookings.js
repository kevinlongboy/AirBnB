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
router.put('/:bookingId', requireAuth, async (req, res) => {

    let bookingId = req.params.bookingId;
    let error = {};

    try {
        let putBooking = await Booking.findByPk(bookingId, {
            raw: true,
        });
        console.log("putBooking", putBooking)

        /*************** Error Handler: Spot couldn't be found ***************/
        if (!putBooking) {
            error.message = "Booking couldn't be found";
            error.status = 404;
            return res
                .status(404).json(error);
        }

        let { startDate, endDate, guests, total } = req.body;

        /*************** Error Handler: endDate cannot be on or before startDate ***************/
        if (startDate >= endDate) {
            error.message = "Validation error"
            error.statusCode = 400
            error.errors = { endDate: "endDate cannot be on or before startDate" }
            return res.status(404).json(error)
        }

        let allExistingBookings = await Booking.findAll({
            where: { spotId: putBooking.spotId },
            attributes: {
                exclude: ['id', 'createdAt', 'updatedAt', 'spotId']
            },
            raw: true,
        });

        /*************** Error Handler: Sorry, this spot is already booked for the specified dates ***************/
        for (let i = 0; i < allExistingBookings.length; i++) {
            let existingBooking = allExistingBookings[i]
            let existingStartDate = existingBooking.startDate
            let existingEndDate = existingBooking.endDate


            // iterate through existing bookings that user does not own,
            // to prevent collisions with reserved dates
            // this will allow user to change their own booking's startDate or endDate exclusively
            if (existingBooking.userId != req.user.id) {

                if ((startDate === existingStartDate) && (endDate === existingEndDate)) {
                    error.message = "Sorry, this spot is already booked for the specified dates";
                    error.statusCode = 403;
                    error.errors = {
                        startDate: "Start date conflicts with an existing booking",
                        endDate: "End date conflict with an existing booking",
                    }
                    return res.status(404).json(error)

                } else if ((endDate >= existingStartDate) && (endDate <= existingEndDate)) {
                    error.message = "Sorry, this spot is already booked for the specified dates";
                    error.statusCode = 403;
                    error.errors = { endDate: "End date conflicts with an existing booking" }
                    return res.status(404).json(error)

                } else if ((startDate >= existingStartDate) && (startDate <= existingEndDate)) {
                    error.message = "Sorry, this spot is already booked for the specified dates";
                    error.statusCode = 403;
                    error.errors = { startDate: "Start date conflicts with an existing booking" }
                    return res.status(404).json(error)
                }
            }
        }

        /*************** Booking must belong to the current user ***************/
        console.log("putBooking.userId", putBooking.userId)
        console.log("req.user.id", req.user.id)
        if (putBooking.userId == req.user.id) {
            console.log("reach")
            if (startDate) putBooking.startDate = startDate;
            console.log("if (startDate) putBooking.update({ startDate: startDate });")

            if (endDate) putBooking.endDate = endDate
            console.log("if (endDate) putBooking.update({ endDate: endDate });")

            if (guests) putBooking.guests = guests
            console.log("if (guests) putBooking.update({ guests: guests });")

            if (total) putBooking.total = total
            console.log("if (total) putBooking.update({ total: total });")

            // await putBooking.save();
            // console.log("await putBooking.save();")
        }

        console.log("putBooking", putBooking)

        /********** Modify keys **********/
        // Add spot info -key
        let spotInfo = await Spot.findByPk(putBooking.spotId, {
            raw: true,
        })
        putBooking.Spot = spotInfo
        console.log("putBooking.Spot", putBooking.Spot)

        // Add spot owner info -key
        let owner = await User.findOne({
            where: { id: spotInfo.ownerId},
            raw: true
        })
        putBooking.Spot.ownerName = `${owner.firstName}`

        console.log("putBooking", putBooking)

        return res
            .status(200)
            .json(putBooking)


    } catch (err) {
        error.message = err;
        return res.status(400).json(error);
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

            // add keys
            // previewImage-key
            let spotPreviewImg = await SpotImage.findOne({
                where: { spotId: booking.Spot.id, preview: true },
                attributes: {
                    exclude: ['id', 'preview', 'spotId', 'createdAt', 'updatedAt']
                },
                raw: true
            })
            booking.Spot.previewImage = spotPreviewImg.url

            // owner's firstName and lastName -keys
            let owner = await User.findOne({
                where: { id: bookingSpotInfo.ownerId},
                raw: true
            })
            booking.Spot.ownerName = `${owner.firstName}`

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
