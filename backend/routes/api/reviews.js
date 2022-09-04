const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');

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
    console.log(reviewId)
    let findReview = await Review.findByPk(reviewId);
    console.log(findReview)

    try {

        if (!findReview) {
            error.message = "Review couldn't be found";
            error.statusCode = 404;
            res
                // .status(400)
                .json(error);
        }

        let reviewImgCount = await ReviewImage.count()
        if (reviewImgCount === 10) {
            error.message = "Maximum number of images for this resource was reached";
            error.statusCode = 403;
            res
                // .status(403)
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
        res
            .status(200)
            .json(printPostReviewImage)

    } catch (err) {
        error.message = "Could not add image";
        error.statusCode = 404;
        res
            // .status(404)
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
            order: [['id']]
        });

        let currentUserData = await User.findByPk(currentUserId, {
            attributes: {
                exclude: ['username', 'hashedPassword', 'email', 'createdAt', 'updatedAt']
            }
        })

        for (let i = 0; i < getCurrentUserReviews.length; i++) {
            let currReview = getCurrentUserReviews[i];

            /******************** add User-key ********************/
            currReview.dataValues.User = currentUserData.dataValues
            // res.send(currReview)


            /******************** add Spot-key ********************/
            let currSpotData = await Spot.findByPk(currReview.spotId, {
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt']
                }
            })
            currReview.dataValues.Spot = currSpotData.dataValues
            // res.json(currReview.spotId)

            let currSpotPreviewImg = await SpotImage.findOne({
                where: { spotId: currReview.spotId, preview: 1 },
                exclude: ['id', 'spotId', 'createdAt', 'updatedAt']
            })
            currReview.dataValues.Spot.previewImage = currSpotPreviewImg.url
            // res.json(currReview)


            /******************** add ReviewImages-key ********************/
            let currReviewImgs = await ReviewImage.findAll({
                where: { reviewId: currReview.spotId },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'reviewId']
                }
            })
            currReview.dataValues.ReviewImages = currReviewImgs
            // res.json(currReview)
        }

        res
            .status(200)
            .json({
                "Reviews": getCurrentUserReviews
            })

    } catch (err) {
        error.message = "Spot couldn't be found"
        error.statusCode = 404
        res
            // .status(404)
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
            res
                .status(404)
                .json(error);
        }

        let { review, stars } = req.body;
        if (review) await putReview.update({ review: review });
        if (stars) putReview.set({ stars: stars });
        await putReview.save();

        res
            .status(200)
            .json(putReview)

    } catch (err) {
        error.message = "Validation Error";
        error.statusCode = 400;
        next(error);
    }
});

// Postman 36: "Delete a Review - Send Twice to Error Check Invalid Id On Second Request"
// README, line 947
router.delete('/:reviewId', requireAuth, async (req, res) => {

    let reviewId = req.params.reviewId;
    let deleteReview = await Review.findByPk(reviewId);

    try {
        if (!deleteReview) {
            error.message = "Review couldn't be found";
            error.status = 404;
            res
                // .status(404)
                .json(error);
        }


        deleteReview.destroy();
        deleteReview.save();
        res
            .status(200)
            .json({
                "message": "Successfully deleted",
                "statusCode": 200
            })

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
