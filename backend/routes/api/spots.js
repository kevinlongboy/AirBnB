const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');


/************************************* global variables *************************************/

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

// const validateBooking = [
//     check('startDate')
//         .exists({ checkFalsy: true })
//         .withMessage("startDate cannot be on or after startDate"),
//     check('endDate')
//         .exists({ checkFalsy: true })
//         .withMessage("endDate cannot be on or before startDate"),
//     handleValidationErrors
// ]

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

// Postman 29, 30: "Get All Bookings for a Spot By Id"
// README, line 1031
// *NOTE*
// first test should return error, since no bookings were created for Spot (id #6) during testing
// and User (id #10) that was created during testing owns Spot (id #6), and cannot book their own spot
router.get('/:spotId/bookings', async (req, res) => {

    let currentUser = req.user;

    let currentUserId = req.user.id;
    // currentUserId = 5 // Uncomment to test if spot belongs to current user (1/2)

    let getSpotId = parseInt(req.params.spotId)
    // getSpotId = 5 // Uncomment to test if spot belongs to current user (2/2)

    let error = {};

    try {
        let spotExists = await Spot.findByPk(getSpotId)
        if (!spotExists) {
            return res.json({
                message: "Spot couldn't be found",
                statusCode: 404
            })

        }

        let getAllBookings = await Booking.findAll({
            where: { spotId: getSpotId },
            raw: true
        });

        if (getAllBookings.length === 0) {
            error.message = "Booking couldn't be found"
            error.statusCode = 404
            return res
                .json(error)
        }

        let bookingOwnerId = await Spot.findOne({
            where: { id: getAllBookings[0].spotId },
            attributes: {
                exclude: ['id', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt']
            },
            raw: true
        })

        /*************** Successful Response: If you ARE NOT the owner of the spot. ***************/
        if (currentUserId != bookingOwnerId.ownerId) {
            let publiclyViewBookings = await Booking.findAll({
                attributes: {
                    exclude: ['id', 'createdAt', 'updatedAt', 'userId']
                },
                order: [['spotId'], ['startDate'], ['endDate']]
            })
            return res
                .status(200)
                .json({
                    "Bookings": publiclyViewBookings
                })
        }


        /*************** Successful Response: If you ARE the owner of the spot. ***************/
        for (let i = 0; i < getAllBookings.length; i++) {
            let booking = getAllBookings[i];

            let bookingUserData = await User.findByPk(booking.userId, {
                attributes: {
                    exclude: ['username', 'hashedPassword', 'email', 'createdAt', 'updatedAt']
                },
                raw: true
            })
            booking.User = bookingUserData
        }

        return res
            .status(200)
            .json({
                "Bookings": getAllBookings
            })

    } catch (err) {
        error.error = err
        return res.json(error);
    }
});

// Postman 25, 26, 27: "Create a Booking Based on a Spot Id"
// README, line 1099
router.post('/:spotId/bookings', requireAuth, async (req, res) => {

    let currentUser = req.user;
    let currentUserId = req.user.id;
    let currSpotId = parseInt(req.params.spotId);
    let error = {};

    try {
        let findSpot = await Spot.findByPk(currSpotId, { raw: true });

        if (!findSpot) {
            error.message = "Spot couldn't be found"
            error.statusCode = 404
            return res.json(error)
        }

        let findSpotOwnerId = findSpot.ownerId
        let { startDate, endDate } = req.body;

        if (currentUserId === findSpotOwnerId) {
            error.message = "Sorry, cannot book your own spot"
            error.statusCode = 400
            return res.json(error)
        }

        if (startDate >= endDate) {
            error.message = "Validation error"
            error.statusCode = 400
            error.errors = { endDate: "endDate cannot be on or before startDate" }
            return res.json(error)
        }

        let allExistingBookings = await Booking.findAll({
            where: { spotId: currSpotId },
            attributes: {
                exclude: ['id', 'createdAt', 'updatedAt', 'userId', 'spotId']
            },
            raw: true
        });

        for (let i = 0; i < allExistingBookings.length; i++) {
            let existingBooking = allExistingBookings[i]
            let existingStartDate = existingBooking.startDate
            let existingEndDate = existingBooking.endDate

            if ((startDate === existingStartDate) && (endDate === existingEndDate)) {
                error.message = "Sorry, this spot is already booked for the specified dates";
                error.statusCode = 403;
                error.errors = {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflict with an existing booking",
                }
                return res.json(error)

            } else if ((endDate >= existingStartDate) && (endDate <= existingEndDate)) {
                error.message = "Sorry, this spot is already booked for the specified dates";
                error.statusCode = 403;
                error.errors = { endDate: "End date conflicts with an existing booking" }
                return res.json(error)

            } else if ((startDate >= existingStartDate) && (startDate <= existingEndDate)) {
                error.message = "Sorry, this spot is already booked for the specified dates";
                error.statusCode = 403;
                error.errors = { startDate: "Start date conflicts with an existing booking" }
                return res.json(error)
            }
        }

        if (currentUserId !== findSpotOwnerId) {
            let postSpotBooking = await findSpot.createBooking({
                spotId: parseInt(currSpotId),
                userId: currentUserId,
                startDate: startDate,
                endDate: endDate,
            })

            return res
                .status(200)
                .json(postSpotBooking)
        }

    } catch (err) {
        error.error = err
        return res.json(error);
    }
});


/*********************************** spots/:spotId/reviews ***********************************/

// Postman 21, 22: "Get Reviews by Spot Id"
// README, line 684
router.get('/:spotId/reviews', async (req, res) => {

    let currSpotId = req.params.spotId;
    let error = {};

    try {
        let findSpot = await Spot.findByPk(currSpotId);

        if (!findSpot) {
            error.message = "Spot couldn't be found"
            error.statusCode = 404
            return res.json(error)

        } else {
            let findAllSpotReviews = await Review.findAll({
                where: { spotId: currSpotId },
                raw: true
            })

            let currentUserId = req.user.id;
            let currentUserData = await User.findByPk(currentUserId, {
                attributes: {
                    exclude: ['username', 'hashedPassword', 'email', 'createdAt', 'updatedAt']
                },
                raw: true,
            })

            for (let i = 0; i < findAllSpotReviews.length; i++) {
                let currReview = findAllSpotReviews[i];

                /******************** add User-key ********************/
                currReview.User = currentUserData

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
                    "Reviews": findAllSpotReviews
                })
        }

    } catch (err) {
        error.error = err
        return res.json(error);
    }
});

// Postman 15, 16, 17: "Create a Review for a Spot"
// README, line 740
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {

    let currentUser = req.user;
    let currentUserId = req.user.id;
    let postSpotId = req.params.spotId;
    let error = {};

    try {
        let findSpot = await Spot.findByPk(postSpotId);

        if (!findSpot) {
            error.message = "Spot couldn't be found"
            error.statusCode = 404
            return res.json(error)
        }

        let spotReviewExists = await Review.findAll({ // returns array of review for req. spot
            where: { userId: currentUserId, spotId: postSpotId }
        });
        if (spotReviewExists.length > 0) {
            error.message = "User already has a review for this spot";
            error.statusCode = 403;
            return res.json(error)

        } else {
            let { review, stars } = req.body;
            let postSpotReview = await currentUser.createReview({
                spotId: parseInt(postSpotId),
                userId: currentUserId,
                review: review,
                stars: stars,
            })
            postSpotReview.save();
            return res
                .status(201)
                .json(postSpotReview)
        }

    } catch (err) {
        error.error = err
        return res.json(error);
    }
});


/*********************************** spots/:spotId/images ***********************************/

// Postman 8: "Create an Image for a Spot"
// README, line 454
router.post('/:spotId/images', requireAuth, async (req, res, next) => {

    let spotId = parseInt(req.params.spotId);
    let error = {};

    try {
        let findSpot = await Spot.findByPk(spotId);

        if (!findSpot) {
            error.message = "Spot couldn't be found"
            error.status = 404
            return res
                .json(error)
        }

        let { url, preview } = req.body;
        let postSpotImage = await findSpot.createSpotImage({
            url: url,
            preview: preview,
        });

        let printSpotImage = await SpotImage.findByPk(postSpotImage.dataValues.id, {
            attributes: {
                exclude: ['spotId', 'updatedAt', 'createdAt']
            },
        })
        return res
            .status(200)
            .json(printSpotImage)

    } catch (err) {
        error.error = err
        return res.json(error);
    }
});


/************************************** /spots/current **************************************/

// Postman 10: "Get Spots of Current User"
// README, line 274
router.get('/current', requireAuth, async (req, res, next) => {

    let currentUser = req.user;
    let currentUserId = req.user.id;
    let error = {};

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
                let prevImg = await SpotImage.findOne({ // returns array of current spot's images
                    where: { spotId: currSpot.id, preview: true },
                    attributes: {
                        exclude: ['id', 'spotId', 'preview', 'createdAt', 'updatedAt']
                    },
                    raw: true
                })

                currSpot.dataValues.previewImage = prevImg.url

            }
            spotHasBeenReviewed.push(currSpot.id)

        }
        return res
            .status(200)
            .json({
                "Spots": getCurrentSpots
            })

    } catch (err) {
        error.message = "Spot couldn't be found"
        error.status = 404
        return res
            .json(error);
    }
});


/************************************** /spots/:spotId **************************************/

// Postman 11: "Get Details of a Spot by Id"
// README, line 314
router.get('/:spotId', async (req, res, next) => {

    let currentSpotId = req.params.spotId;
    let error = {};

    try {
        let getSpot = await Spot.findByPk(currentSpotId)

        if (!getSpot) {
            error.message = "Spot couldn't be found";
            error.statusCode = 404;
            return res.json(error)
        }

        /******************** add numReviews-key ********************/
        let reviewCount = await Review.count({
            where: { spotId: currentSpotId }
        });
        getSpot.dataValues.numReviews = reviewCount;

        /******************** add avgStarRating-key ********************/
        let starSum = await Review.sum('stars', {
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

        return res
            .status(200)
            .json(getSpot)

    } catch (err) {
        error.error = err
        return res.json(error);
    }
});

// Postman 13: "Edit a Spot"
// README, line 501
router.put('/:spotId', requireAuth, async (req, res, next) => {

    let spotId = req.params.spotId;
    let error = {};

    try {
        let putSpot = await Spot.findByPk(spotId);
        if (!putSpot) {
            error.message = "Spot couldn't be found";
            error.statusCode = 404;
            return res.json(error);
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

        return res
            .status(200)
            .json(putSpot)

    } catch (err) {
        error.error = err
        return res.json(error);
    }
});

// Postman 37: "Send Twice to Error Check Invalid Id On Second Request"
// README, line 589
router.delete('/:spotId', requireAuth, async (req, res, next) => {

    let spotId = req.params.spotId;
    let error = {};

    try {
        let deleteSpot = await Spot.findByPk(spotId);

        if (!deleteSpot) {
            error.message = "Spot couldn't be found";
            error.status = 404;
            return res.json(error);

        }

        deleteSpot.destroy();
        deleteSpot.save();
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


/****************************************** /spots ******************************************/

// Postman 6: "Get All Spots"
// README, line 234
// &
// Postman 38: "Get All Spots - Page/Size Params"
// README, line 1405
router.get('/', async (req, res, next) => {

    let error = {};

    try {
        let query = {
            where: {},
            include: []
        }

        /**************************** add filter ****************************/
        if (req.query.minLat) query.where.lat = { [Op.gte]: req.query.minLat };
        if (req.query.maxLat) query.where.lat = { [Op.lte]: req.query.maxLat };
        if (req.query.minLng) query.where.lng = { [Op.gte]: req.query.minLng };
        if (req.query.maxLng) query.where.lng = { [Op.lte]: req.query.maxLng };
        if (req.query.minPrice) query.where.price = { [Op.gte]: req.query.minPrice };
        if (req.query.maxPrice) query.where.price = { [Op.lte]: req.query.maxPrice };

        /**************************** add pagination ****************************/
        let page = req.query.page === undefined ? 0 : parseInt(req.query.page);
        if (page > 10) page = 10;

        let size = req.query.size === undefined ? 20 : parseInt(req.query.size);
        if (size > 20) size = 20;

        if (page >= 1 && size >= 1) {
            query.limit = size;
            query.offset = size * (page - 1);
        }

        /**************************** query ****************************/
        let getSpots = await Spot.findAll(query); // array of all spots

        let spotHasBeenReviewed = []

        for (let i = 0; i < getSpots.length; i++) {
            let currSpot = getSpots[i]

            if (!spotHasBeenReviewed.includes(currSpot.id)) {

                /**************************** add avgRating-key ****************************/
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

                /**************************** add avgRating-key ****************************/
                let prevImg = await SpotImage.findOne({ // returns array of current spot's images
                    where: { spotId: currSpot.id, preview: true },
                    attributes: {
                        exclude: ['id', 'spotId', 'preview', 'createdAt', 'updatedAt']
                    },
                    raw: true
                })

                // let prevImg = ""
                // for (let k = 0; k < currSpotImages.length; k++) {
                //     let currImage = currSpotImages[k];
                //     if (currImage.preview === "1") {
                //         prevImg = currImage.url
                //     }
                // }
                currSpot.dataValues.previewImage = prevImg.url
            }

            spotHasBeenReviewed.push(currSpot.id)
        }
        return res
            .status(200)
            .json({
                "Spots": getSpots,
                page,
                size
            });

    } catch (err) {
        error.error = err
        return res.json(error);
    }
});


// Postman 7: "Create a Spot"
// README, line 380
router.post('/', requireAuth, validateSpot, async (req, res) => {

    let currentUser = req.user
    let currentUserId = req.user.id
    let error = {};

    try {
        let { address, city, state, country, lat, lng, name, description, price } = req.body;

        // if (!address) {
        //     err.message = "Validation Error";
        //     err.status = 400;
        //     err.errors = { address: "Street address is required" }
        //     return res.json(err);
        // }
        // if (!city) {
        //     err.message = "Validation Error";
        //     err.status = 400;
        //     err.errors = { city: "City is required" }
        //     return res.json(err);
        // }
        // if (!state) {
        //     err.message = "Validation Error";
        //     err.status = 400;
        //     err.errors = { state: "State is required" }
        //     return res.json(err);
        // }
        // if (!country) {
        //     err.message = "Validation Error";
        //     err.status = 400;
        //     err.errors = { country: "Country is required" }
        //     return res.json(err);
        // }
        // if (!lat) {
        //     err.message = "Validation Error";
        //     err.status = 400;
        //     err.errors = { lat: "Latitude is not valid" }
        //     return res.json(err);
        // }
        // if (!lng) {
        //     err.message = "Validation Error";
        //     err.status = 400;
        //     err.errors = { lng: "Longitude is not valid" }
        //     return res.json(err);
        // }
        // if (!name) {
        //     err.message = "Validation Error";
        //     err.status = 400;
        //     err.errors = { name: "Name must be less than 50 characters" }
        //     return res.json(err);
        // }
        // if (!description) {
        //     err.message = "Validation Error";
        //     err.status = 400;
        //     err.errors = { description: "Description is required" }
        //     return res.json(err);
        // }
        // if (!price) {
        //     err.message = "Validation Error";
        //     err.status = 400;
        //     err.errors = { price: "Price per day is required" }
        //     return res.json(err);
        // }

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

        return res
            .status(201)
            .json(postSpot)

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
