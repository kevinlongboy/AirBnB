const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');


/************************************* global variables *************************************/

let error = {};


/************************************* /spot-images/:imageId *************************************/

// Postman 33: "Delete a Spot Image - Send Twice to Error Check Invalid Id On Second Request"
// README, line 1331
router.delete('/:imageId', requireAuth, async (req, res) => {

    let deleteImageId = req.params.imageId;
    let deleteSpotImage = await SpotImage.findByPk(deleteImageId);

    if (!deleteSpotImage) {
        error.message = "Spot Image couldn't be found";
        error.status = 404;
        res
            // .status(404)
            .json(error);

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
