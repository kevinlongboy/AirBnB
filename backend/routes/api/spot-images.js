const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');


/************************************* global variables *************************************/

let error = {};


/************************************* /spot-images/:imageId *************************************/

// README, line 1331
router.delete('/:imageId', requireAuth, async (req, res) => {

    let imageId = req.params.bookingId;
    let deleteSpotImage = await SpotImage.findByPk(imageId);

    if (!deleteBooking) {
        error.message = "Spot Image couldn't be found";
        error.status = 404;
        next(err);

    } else {
        deleteSpotImage.destroy();
        deleteSpotImage.save();
        res
            .status(200)
            .json({
                "message": "Successfully deleted",
                "statusCode": 200
            })
    };
});


/*************************************** error handler ****************************************/

router.use((err, req, res, next) => {
    res.json(err)
})


/****************************************** export ********************************************/

module.exports = router;
