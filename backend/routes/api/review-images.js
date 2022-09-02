const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');


/************************************* global variables *************************************/

let error = {};


/************************************* /spot-images/:imageId *************************************/

// README, line 1368
router.delete('/:imageId', requireAuth, async (req, res) => {

    let imageId = req.params.bookingId;
    let deleteReviewImage = await SpotImage.findByPk(imageId);

    if (!deleteReviewImage) {
        error.message = "Review Image couldn't be found";
        error.status = 404;
        next(err);

    } else {
        deleteReviewImage.destroy();
        deleteReviewImage.save();
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
