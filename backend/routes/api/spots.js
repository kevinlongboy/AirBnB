const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');
const review = require('../../db/models/review');



/************************************* global variables *************************************/

// declare spotId here? >> DRY
let error = {};

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 5 })
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage("Price per day is required"),
    handleValidationErrors
];

const validateQuery = [
    check('page')
        .exists({ checkFalsy: true })
        .withMessage("Page must be greater than or equal to 0"),
    check('size')
        .exists({ checkFalsy: true })
        .withMessage("Size must be greater than or equal to 0"),
    check('maxLat')
        .exists({ checkFalsy: true })
        .withMessage("Maximum latitude is invalid"),
    check('minLat')
        .exists({ checkFalsy: true })
        .withMessage("Minimum latitude is invalid"),
    check('maxLng')
        .exists({ checkFalsy: true })
        .withMessage("Maximum longitude is invalid"),
    check('minLng')
        .exists({ checkFalsy: true })
        .withMessage("Minimum longitude is invalid"),
    check('maxPrice')
        .exists({ checkFalsy: true })
        .withMessage("Maximum price must be greater than or equal to 0"),
    check('minPrice')
        .exists({ checkFalsy: true })
        .withMessage("Minimum price must be greater than or equal to 0"),
    handleValidationErrors
]

const validateBooking = [
    check('startDate')
        .exists({ checkFalsy: true }),
    check('endDate')
        .exists({ checkFalsy: true })
        .isAfter(this.startDate)
        .withMessage("endDate cannot be on or before startDate"),
    handleValidationErrors
]

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]


/********************************** spots/:spotId/bookings ***********************************/

// router.get('/', async (req, res, next) => {

//     // console.log("hit spots router")
//     // res.send("okay")

//     // try {
//     // let getSpots = await Spot.findByPk(1);
//     // console.log(getSpots)
//     // res.status(200)
//     res.json({ "Spots": "get spots" });
//     // } catch (err) {
//     //     error.message = "Spot couldn't be found"
//     //     error.status = 404
//     //     next(err);
//     // }
// });


// README, line 1031
// router.get('/:spotId/bookings', async (req, res) => {

//     let spotId = req.params.spotId;
//     let getSpotBookings = await Spot.findByPk(spotId);

//     if (!getSpotBookings) {
//         error.message = "Spot couldn't be found"
//         error.status = 404
//         next(err)

//     } else {
//         let getSpotBookings = await Spot.findAll({
//             where: { id: spotId },
//             include: [{
//                 model: Booking,
//             }]
//         });
//         res
//             .status(200)
//             .json({
//                 "Bookings": getSpotBookings
//             })
//     }
// });

// README, line 1099
// router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res) => {

//     let spotId = req.params.spotId;
//     let findSpot = await Spot.findByPk(spotId);

//     if (!findSpot) {
//         error.message = "Spot couldn't be found"
//         error.status = 404
//         next(err)
//     }

//     let { startDate, endDate } = req.body;

//     let startDateExists = await Booking.findAll({
//         where: { startDate: startDate },
//     });
//     let endDateExists = await Booking.findAll({
//         where: { endDate: endDate },
//     });

//     if (startDateExists) {
//         error.message = "Start date conflicts with an existing booking";
//         statusCode = 403;
//         next(err)
//     }
//     if (endDateExists) {
//         error.message = "End date conflicts with an existing booking";
//         statusCode = 403;
//         next(err)
//     }

//     try {
//         let postSpotBooking = await Booking.create({
//             startDate: startDate,
//             endDate: endDate,
//         })
//         res.status(200).json(postSpotBooking)

//     } catch (err) {
//         error.message = "Validation Error";
//         error.statusCode = 400;
//         next(err);
//     }
// });


/*********************************** spots/:spotId/reviews ***********************************/

// README, line 684
// router.get('/:spotId/reviews', async (req, res) => {

//     let spotId = req.params.spotId;
//     let getSpotReviews = await Spot.findByPk(spotId);

//     if (!getSpotReviews) {
//         error.message = "Spot couldn't be found"
//         error.status = 404
//         next(err)

//     } else {
//         let getSpotReviews = await Spot.findAll({
//             where: { id: spotId },
//             include: [{
//                 model: Review,
//             }]
//         });
//         res
//             .status(200)
//             .json({
//                 "Reviews": getSpotReviews
//             })
//     }
// });

// Postman 15: "Create a Review for a Spot"
// README, line 740
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {

    let currentUser = req.user;
    let currentUserId = req.user.id;
    let postSpotId = req.params.spotId;

    try {
        let findSpot = await Spot.findByPk(postSpotId);
        if (!findSpot) {
            error.message = "Spot couldn't be found"
            error.statusCode = 404
            res.json(error)
        }

        let findAllSpotReviews = await Review.findAll({ // returns array of review for req. spot
            where: { userId: currentUserId, spotId: postSpotId }
        });
        if (findAllSpotReviews.length > 0) {
            console.log("this")
            error.message = "User already has a review for this spot";
            error.statusCode = 403;
            res.json(error)
        }

        let { review, stars } = req.body;
        let postSpotReview = await currentUser.createReview({
            spotId: postSpotId,
            userId: currentUserId,
            review: review,
            stars: stars,
        })
        postSpotReview.save();
        res
            .status(200)
            .json(postSpotReview)

    } catch (err) {
        error.message = "Validation Error";
        error.statusCode = 400;
        res.json(error)
    }
});


/*********************************** spots/:spotId/images ***********************************/

// Postman 8: "Create an Image for a Spot"
// README, line 454
router.post('/:spotId/images', requireAuth, async (req, res, next) => {

    let spotId = req.params.spotId;
    let findSpot = await Spot.findByPk(spotId);

    try {
        let { url, preview } = req.body;
        let postSpotImage = await findSpot.createSpotImage({
            url: url,
            preview: preview,
        });
        res.status(200).json(postSpotImage)

    } catch (err) {
        error.message = "Spot couldn't be found"
        error.status = 404
        next(error)
    }
});


/************************************** /spots/current **************************************/

// Postman 10: "Get Spots of Current User"
// README, line 274
router.get('/current', requireAuth, async (req, res, next) => {

    let currentUser = req.user
    let currentUserId = req.user.id

    try {
        let getCurrentSpots = await Spot.findAll({
            where: { ownerId: currentUserId },
        });

        let spotHasBeenReviewed = []

        for (let i = 0; i < getCurrentSpots.length; i++) {
            let currSpot = getCurrentSpots[i]

            if (!spotHasBeenReviewed.includes(currSpot.id)) {

                /******************** add avgRating-key ********************/
                let currSpotReviews = await Review.findAll({ // returns array of current spot's reviews
                    where: { spotId: currSpot.id },
                })

                let sumStars = 0
                for (let j = 0; j < currSpotReviews.length; j++) {
                    let currReview = currSpotReviews[j];
                    sumStars += currReview.stars
                }
                let aveStars = sumStars / currSpotReviews.length
                currSpot.dataValues.avgRatings = aveStars

                /******************** add avgRating-key ********************/
                let currSpotImages = await SpotImage.findAll({ // returns array of current spot's images
                    where: { spotId: currSpot.id },
                })

                let prevImg = ""
                for (let k = 0; k < currSpotImages.length; k++) {
                    let currImage = currSpotImages[k];
                    if (currImage.preview === "1") {
                        prevImg = currImage.url
                    }

                }
                currSpot.dataValues.previewImage = prevImg

            }
            spotHasBeenReviewed.push(currSpot.id)

        }
        res
            .status(200)
            .json({
                "Spots": getCurrentSpots
            })

    } catch (err) {
        error.message = "Spot couldn't be found"
        error.status = 404
        next(error);
    }
});


/************************************** /spots/:spotId **************************************/

// Postman 11: "Get Details of a Spot by Id"
// README, line 314
router.get('/:spotId', async (req, res, next) => {

    let currentSpotId = req.params.spotId;

    try {
        let getSpot = await Spot.findByPk(currentSpotId)
        console.log(getSpot.ownerId)

        /******************** add numReviews-key ********************/
        let reviewCount = await Review.count({
            where: { spotId: currentSpotId }
        });
        getSpot.dataValues.numReviews = reviewCount;

        /******************** add avgStarRating-key ********************/
        let starSum = await Review.sum('stars',
            {
                where: {
                    spotId: currentSpotId
                }
            })

        let starAvg = starSum / reviewCount;
        if (!starAvg) starAvg = 0
        getSpot.dataValues.avgStarRating = starAvg;

        /******************** add SpotImages-key ********************/
        let spotImgs = await SpotImage.findAll({
            where: { spotId: currentSpotId },
            attributes: {
                include: ["id", "url", "preview"],
                exclude: ["spotId", "createdAt", "updatedAt"]
            },
        })
        getSpot.dataValues.SpotImages = spotImgs;

        /******************** add Owner-key ********************/
        let ownerData = await User.findByPk(getSpot.ownerId, {
            attributes: {
                include: ["id", "firstName", "lastName"],
                exclude: ["username", "hashedPassword", "email", "createdAt", "updatedAt"]
            },
        })
        getSpot.dataValues.Owner = ownerData;

        res
            .status(200)
            .json(getSpot)

    } catch (err) {
        error.message = "Spot couldn't be found";
        error.statusCode = 404;
        next(error);
    }
});

// Postman 13: "Edit a Spot"
// README, line 501
router.put('/:spotId', requireAuth, async (req, res, next) => {

    let spotId = req.params.spotId;
    let putSpot = await Spot.findByPk(spotId);

    try {
        if (!putSpot) {
            error.message = "Spot couldn't be found";
            error.statusCode = 404;
            next(error);
        }

        let { address, city, state, country, lat, lng, name, description, price } = req.body;

        if (address) putSpot.set({ address: address });
        if (city) putSpot.set({ city: city });
        if (state) putSpot.set({ state: state });
        if (country) putSpot.set({ country: country });
        if (lat) putSpot.set({ lat: lat });
        if (lng) putSpot.set({ lng: lng });
        if (name) putSpot.set({ name: name });
        if (description) putSpot.set({ description: description });
        if (price) putSpot.set({ price: price });
        await putSpot.save();

        res
            .status(200)
            .json(putSpot)

    } catch (err) {
        error.message = "Validation Error";
        error.statusCode = 404;
        next(error);
    }
});

// README, line 589
// router.delete('/:spotId', requireAuth, async (req, res, next) => {

//     let spotId = req.params.spotId;
//     let deleteSpot = await Spot.findByPk(spotId);

//     if (!deleteSpot) {
//         error.message = "Spot couldn't be found";
//         error.statusCode = 404;
//         next(err);

//     } else {
//         deleteSpot.destroy();
//         deleteSpot.save();
//         res
//             .status(200)
//             .json({
//                 "message": "Successfully deleted",
//                 "statusCode": 200
//             })
//     }
// });


/****************************************** /spots ******************************************/

// Postman 6: "Get All Spots"
// README, line 234
router.get('/', async (req, res, next) => {

    // get array of all spot objects
    // iterate through array
    // for each item in array, aggregate average rating
    // add average rating to spot object

    try {
        let getSpots = await Spot.findAll(); // array of all spots

        let spotHasBeenReviewed = []

        for (let i = 0; i < getSpots.length; i++) {
            let currSpot = getSpots[i]

            if (!spotHasBeenReviewed.includes(currSpot.id)) {

                /******************** add avgRating-key ********************/
                let currSpotReviews = await Review.findAll({ // returns array of current spot's reviews
                    where: { spotId: currSpot.id },
                })

                let sumStars = 0
                for (let j = 0; j < currSpotReviews.length; j++) {
                    let currReview = currSpotReviews[j];
                    sumStars += currReview.stars
                }
                let aveStars = sumStars / currSpotReviews.length
                currSpot.dataValues.avgRatings = aveStars

                /******************** add avgRating-key ********************/
                let currSpotImages = await SpotImage.findAll({ // returns array of current spot's images
                    where: { spotId: currSpot.id },
                })

                let prevImg = ""
                for (let k = 0; k < currSpotImages.length; k++) {
                    let currImage = currSpotImages[k];
                    if (currImage.preview === "1") {
                        prevImg = currImage.url
                    }
                }
                currSpot.dataValues.previewImage = prevImg
            }

            spotHasBeenReviewed.push(currSpot.id)
        }
        res.status(200)
        res.send({ "Spots": getSpots });

    } catch (err) {
        error.message = "Spot couldn't be found"
        error.status = 404
        next(error);
    }
});

// Postman 7: "Create a Spot"
// README, line 380
router.post('/', requireAuth, validateSpot, async (req, res) => {

    let currentUser = req.user
    let currentUserId = req.user.id

    try {
        let { address, city, state, country, lat, lng, name, description, price } = req.body;

        let postSpot = await currentUser.createSpot({
            ownerId: currentUserId,
            address: address,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lng: lng,
            name: name,
            description: description,
            price: price,
        });
        postSpot.save();
        console.log(postSpot)

        res.status(200).json(postSpot)

    } catch (err) {
        error.message = "Validation Error";
        error.statusCode = 400;
        next(error);
    }
});


/***************************************** /spots? ******************************************/

// README, line 1405
// router.get('/', async (req, res, next) => {

//     let query = {
//         where: {},
//         include: []
//     }

//     let page = req.query.page === undefined ? 0 : parseInt(req.query.page);
//     if (page > 10) page = 10;

//     let size = req.query.size === undefined ? 20 : parseInt(req.query.size);
//     if (size > 20) size = 20;

//     if (page >= 1 && size >= 1) {
//         query.limit = size;
//         query.offset = size * (page - 1);
//     }

//     try {
//         //     if (req.query.minLat) query.where.lat = { [Op.gte]: req.query.minLat };
//         //     if (req.query.maxLat) query.where.lat = { [Op.lte]: req.query.maxLat };
//         //     if (req.query.minLng) query.where.lng = { [Op.gte]: req.query.minLng };
//         //     if (req.query.maxLng) query.where.lng = { [Op.lte]: req.query.maxLng };
//         //     if (req.query.minPrice) query.where.price = { [Op.gte]: req.query.minPrice };
//         //     if (req.query.maxPrice) query.where.price = { [Op.lte]: req.query.maxPrice };

//         let querySpots = await Spot.findAll(query);
//         res.status(200).json({
//             "Spots": querySpots,
//             page,
//             size
//         });

//     } catch (err) {
//         error.message = "Validation Error";
//         error.statusCode = 400;
//         next(err);
//     }
// });



/*************************************** error handler ****************************************/

router.use((err, req, res, next) => {
    res.json(err)
})



/****************************************** export ********************************************/

module.exports = router;
