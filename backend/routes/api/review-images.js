const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');


/************************************* /spot-images/:imageId *************************************/

// Postman 34: "Delete a Review Image - Send Twice to Error Check Invalid Id On Second Request Copy"
// README, line 1368
router.delete('/:imageId', requireAuth, async (req, res) => {


    let deleteImageId = req.params.imageId;
    let error = {};


    try {
        let deleteReviewImage = await SpotImage.findByPk(deleteImageId);

        if (!deleteReviewImage) {
            error.message = "Review Image couldn't be found";
            error.status = 404;
            return res.json(error);

        } else {
            deleteReviewImage.destroy();
            deleteReviewImage.save();
            return res
                .status(200)
                .json({
                    "message": "Successfully deleted",
                    "statusCode": 200
                })
        };

    } catch (err) {
        error.error = err
        return res.json(error);
    }
});


/*************************************** error handler ****************************************/

router.use((err, req, res, next) => {
    return res.json(err)
})


/****************************************** export ********************************************/

module.exports = router;
