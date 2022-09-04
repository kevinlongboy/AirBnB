const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');


/************************************* global variables *************************************/

let error = {};


/************************************* /spot-images/:imageId *************************************/

// Postman 34: "Delete a Review Image - Send Twice to Error Check Invalid Id On Second Request Copy"
// README, line 1368
router.delete('/:imageId', requireAuth, async (req, res) => {

    let deleteImageId = req.params.imageId;
    let deleteReviewImage = await SpotImage.findByPk(deleteImageId);

    try {
        if (!deleteReviewImage) {
            error.message = "Review Image couldn't be found";
            error.status = 404;
            res
                // .status(404)
                .json(error);

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

    } catch (err) {
        error.message = err;
        res
            .json(error)
    }
});


/*************************************** error handler ****************************************/

router.use((err, req, res, next) => {
    res.json(err)
})


/****************************************** export ********************************************/

module.exports = router;
