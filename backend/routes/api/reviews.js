const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');
const review = require('../../db/models/review');


/************************************* global variables *************************************/

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

// Postman 18, 19: "Create an Image for a Review"
// README, line 820
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {

    let reviewId = req.params.reviewId;
    let error = {};

    try {
        let findReview = await Review.findByPk(reviewId);

        if (!findReview) {
            error.message = "Review couldn't be found";
            error.statusCode = 404;
            return res.json(error);
        }

        let reviewImgCount = await ReviewImage.count()
        if (reviewImgCount === 10) {
            error.message = "Maximum number of images for this resource was reached";
            error.statusCode = 403;
            return res.json(error);
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
        error.error = err
        return res.json(error);
    }
});


/************************************* /reviews/current **************************************/

// Postman 20: "Get Reviews of Current User"
// README, line 628
router.get('/current', requireAuth, async (req, res, next) => {

    let currentUser = req.user;
    let currentUserId = req.user.id;
    let error = {};

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

            let owner = await User.findByPk(currSpotData.ownerId, {
                raw: true,
            })
            currReview.Spot.ownerName = owner.firstName

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
        console.log("getCurrentUserReviews", getCurrentUserReviews)

        return res
            .status(200)
            .json({
                "Reviews": getCurrentUserReviews
            })

    } catch (err) {
        error.error = err
        return res.json(error);
    }
});


/************************************ /reviews/:reviewId *************************************/

// Postman 23: "Edit a Review"
// README, line 879
router.put('/:reviewId', requireAuth, async (req, res) => {

    let reviewId = parseInt(req.params.reviewId);
    let error = {};

    try {
        let putReview = await Review.findByPk(reviewId);

        const validationErrorMessages = []

        // handle error: missing review
        if (!putReview) {
            error.message = "Review couldn't be found";
            error.statusCode = 404;
            validationErrorMessages.push("Review couldn't be found");
            return res.status(404).json(error);
        }

        let { review, stars } = req.body;
        if (review) await putReview.update({ review: review });
        if (stars) putReview.set({ stars: stars });
        await putReview.save();

        return res
            .status(200)
            .json(putReview)

    } catch (err) {
        error.error = err
        return res.json(error);
    }
});

// Postman 36: "Delete a Review - Send Twice to Error Check Invalid Id On Second Request"
// README, line 947
router.delete('/:reviewId', requireAuth, async (req, res) => {

    let reviewId = req.params.reviewId;
    let error = {};

    try {
        let deleteReview = await Review.findByPk(reviewId);

        if (!deleteReview) {
            error.message = "Review couldn't be found";
            error.status = 404;
            return res.json(error);
        }

        deleteReview.destroy();
        deleteReview.save();
        return res
            .status(200)
            .json({
                "message": "Successfully deleted",
                "statusCode": 200
            })

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
