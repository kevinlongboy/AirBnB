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


/************************************* /bookings/current **************************************/

// Get all Reservations for all Current User's Spots
router.get('/', requireAuth, async (req, res, next) => {

    // get current user's id
    // use Id to query spots that match userId
    // use spot Id to query all Bookings

    let error = {};

    try {

        let allUserSpots = await Spot.findAll({
            where: { ownerId: req.user.id},
            raw: true
        })

        /*************** Error Handler: User has no spots ***************/
        if (!allUserSpots) {
            error.message = "User has no spots";
            error.status = 404;
            return res
                .status(404)
                .json(error);
        }


        for (let i = 0; i < allUserSpots.length; i++) {

            let currSpot = allUserSpots[i];

            // Add keys
            // previewImage-key
            let spotPreviewImg = await SpotImage.findOne({
                where: { spotId: currSpot.id, preview: true },
                attributes: {
                    exclude: ['id', 'preview', 'spotId', 'createdAt', 'updatedAt']
                },
                raw: true
            })

            currSpot.previewImage = spotPreviewImg.url

            // Reservations-key (pointing to a value with an array of bookings)
            let allSpotReservations = await Booking.findAll({
                where: { spotId: currSpot.id },
                raw: true
            })

            for (let j = 0; j < allSpotReservations.length; j++) {
                let currReservation = allSpotReservations[j];

                // Add User info key
                let userInfo = await User.findByPk(currReservation.userId, {
                    raw: true
                })


                currReservation.User = userInfo;
            }

            currSpot.Reservations = allSpotReservations;
        }

        console.log("allUserSpots", allUserSpots)
        return res
            .status(200)
            .json({
                "Reservations": allUserSpots
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
