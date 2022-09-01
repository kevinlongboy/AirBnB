const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Review, ReviewImage, Spot, User } = require('../../db/models');

/************************************* global variables *************************************/

let error = {};

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]

/******************************** /reviews/:reviewId/images **********************************/

// README, line 840
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {

    let reviewId = req.params.reviewId;
    let findReview = await Review.findByPk(reviewId);

    if (!findReview) {
        error.message = "Review couldn't be found";
        error.status = 404;
        next(err);
    }

    let maxReviewImagesReached = await ReviewImage.findByPk(reviewId, {
        include: {
            model: Review,
            attributes: []
        },
        attributes: [
            [sequelize.fn('COUNT', sequelize.col("id")), "imageCount"]
        ]
    })
    if (maxReviewImagesReached.length === 10) {
        error.message = "Maximum number of images for this resource was reached";
        error.statusCode = 403;
        next(err);
    }

    try {
        let { url } = req.body;
        let postReviewImage = await ReviewImage.create({
            url: url,
        });
        res.status(200).json(postReviewImage)

    } catch (err) {
        error.message = "Could not add image";
        error.statusCode = 404;
        next(err);
    }
});


/************************************ /reviews/:reviewId *************************************/

// README, line 879
router.put('/:reviewId', requireAuth, async (req, res) => {

    let reviewId = req.params.reviewId;
    let putReview = await Review.findByPk(reviewId);

    if (!putReview) {
        error.message = "Review couldn't be found";
        error.status = 404;
        next(err);
    }

    try {
        let { review, stars } = req.body;
        if (review) putReview, set({ review: review });
        if (stars) putReview, set({ stars: stars });
        await putReview.save();
        res.status(200).json(putReview)

    } catch (err) {
        error.message = "Validation Error";
        error.statusCode = 400;
        next(err);
    }
});

// README, line 947
router.delete('/:reviewId', requireAuth, async (req, res) => {

    let reviewId = req.params.reviewId;
    let deleteReview = await Review.findByPk(reviewId);

    if (!deleteReview) {
        error.message = "Review couldn't be found";
        error.status = 404;
        next(err);

    } else {
        deleteReview.destroy();
        deleteReview.save();
        res
            .status(200)
            .json({
                "message": "Successfully deleted",
                "statusCode": 200
            })
    };
});


/************************************* /reviews/current **************************************/

// README, line 628
router.get('/current', requireAuth, async (req, res, next) => {

    try {
        let getCurrentReviews = await User.findAll({
            where: { id: req.user.id },
            include: { model: Review },
        });
        res
            .status(200)
            .json({
                "Reviews": getCurrentReviews
            })

    } catch (err) {
        error.message = "Spot couldn't be found"
        error.status = 404
        next(err);
    }
});



/*************************************** error handler ****************************************/

router.use((err, req, res, next) => {
    res.json(err)
})



/****************************************** export ********************************************/

module.exports = router;
