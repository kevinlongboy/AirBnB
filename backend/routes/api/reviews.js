const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');
const review = require('../../db/models/review');

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

// Postman 18: "Create an Image for a Review"
// README, line 820
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {

    let reviewId = req.params.reviewId;
    let findReview = await Review.findByPk(reviewId);

    try {

        if (!findReview) {
            error.message = "Review couldn't be found";
            error.statusCode = 404;
            return res
                .json(error);
        }

        let reviewImgCount = await ReviewImage.count()
        if (reviewImgCount === 10) {
            error.message = "Maximum number of images for this resource was reached";
            error.statusCode = 403;
            return res
                .json(error);
        }

        let { url } = req.body;
        let postReviewImage = await findReview.createReviewImage({
            url: url,
        });
        let printPostReviewImage = await ReviewImage.findByPk(postReviewImage.id, {
            attributes: {
                include: ["id", "url"],
                exclude: ["createdAt", "updatedAt", "reviewId"]
            },
        })
        return res
            .status(200)
            .json(printPostReviewImage)

    } catch (err) {
        error.message = "Could not add image";
        error.statusCode = 404;
        return res
            .json(err);
    }
});


/************************************* /reviews/current **************************************/

// Postman 20: "Get Reviews of Current User"
// README, line 628
router.get('/current', requireAuth, async (req, res, next) => {

    let currentUser = req.user;
    let currentUserId = req.user.id;

    try {
        let getCurrentUserReviews = await Review.findAll({ // returns array of review-objects
            where: { userId: currentUserId },
            order: [['id']],
            raw: true,
        });

        let currentUserData = await User.findByPk(currentUserId, {
            attributes: {
                exclude: ['username', 'hashedPassword', 'email', 'createdAt', 'updatedAt']
            },
            raw: true
        })

        for (let i = 0; i < getCurrentUserReviews.length; i++) {
            let currReview = getCurrentUserReviews[i];

            /******************** add User-key ********************/
            currReview.User = currentUserData

            /******************** add Spot-key ********************/
            let currSpotData = await Spot.findByPk(currReview.spotId, {
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt']
                },
                raw: true,
            })
            currReview.Spot = currSpotData

            let currSpotPreviewImg = await SpotImage.findOne({
                where: { spotId: currReview.spotId, preview: true },
                attributes: {
                    exclude: ['id', 'spotId', 'createdAt', 'updatedAt']
                },
                raw: true,
            })
            currReview.Spot.previewImage = currSpotPreviewImg.url

            /******************** add ReviewImages-key ********************/
            let currReviewImgs = await ReviewImage.findAll({
                where: { reviewId: currReview.spotId },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'reviewId']
                },
                raw: true,
            })
            currReview.ReviewImages = currReviewImgs
        }

        return res
            .status(200)
            .json({
                "Reviews": getCurrentUserReviews
            })

    } catch (err) {
        error.message = "Spot couldn't be found"
        error.statusCode = 404
        return res
            .json(error);
    }
});


/************************************ /reviews/:reviewId *************************************/

// Postman 23: "Edit a Review"
// README, line 879
router.put('/:reviewId', requireAuth, async (req, res) => {

    let reviewId = req.params.reviewId;
    let putReview = await Review.findByPk(reviewId);

    try {
        if (!putReview) {
            error.message = "Review couldn't be found";
            error.statusCode = 404;
            return res
                .json(error);
        }

        let { review, stars } = req.body;
        if (review) await putReview.update({ review: review });
        if (stars) putReview.set({ stars: stars });
        await putReview.save();

        return res
            .status(200)
            .json(putReview)

    } catch (err) {
        error.message = "Validation Error";
        error.statusCode = 400;
        return res
            .json(error);
    }
});

// Postman 36: "Delete a Review - Send Twice to Error Check Invalid Id On Second Request"
// README, line 947
router.delete('/:reviewId', requireAuth, async (req, res) => {

    let reviewId = req.params.reviewId;
    let deleteReview = await Review.findByPk(reviewId); // BUG: postman crashes upon second test

    try {
        deleteReview.destroy();
        deleteReview.save();
        return res
            .status(200)
            .json({
                "message": "Successfully deleted",
                "statusCode": 200
            })

    } catch (err) {
        error.message = "Review couldn't be found";
        error.status = 404;
        return res
            .json(error);
    }
});






/*************************************** error handler ****************************************/

router.use((err, req, res, next) => {
    return res.json(err)
})



/****************************************** export ********************************************/

module.exports = router;
