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
        .isLength({ min: 2 })
        .withMessage("Address is required."),
    check('city')
        .isLength({ min: 2 })
        .withMessage("City is required."),
    check('state')
        .isLength({ min: 2 })
        .withMessage("State is required."),
    check('country')
        .isLength({ min: 2 })
        .withMessage("Country is required."),
    // check('lat')
    //     .isLatLong()
    //     .withMessage("Latitude is not valid"),
    // check('lng')
    //     .isLatLong()
    //     .isDecimal()
    //     .withMessage("Longitude is not valid"),
    check('name')
        .isLength({ min: 2 })
        .withMessage("Title is required."),
    check('name')
        .isLength({ max: 50 })
        .withMessage("Please create a shorter title."),

    check('description')
        .isLength({ min: 5 })
        .withMessage("Please write a longer description."),
    check('description')
        .isLength({ max: 50 })
        .withMessage("Please write a shorter description."),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage("Price per night is required."),
    handleValidationErrors
];

const validateQuery = [
    check('page')
        .exists({ checkFalsy: true })
        .withMessage("Page must be greater than or equal to 0"),
    check('size')
        .exists({ checkFalsy: true })
        .withMessage("Size must be greater than or equal to 0"),
    // check('maxLat')
    //     .exists({ checkFalsy: true })
    //     .withMessage("Maximum latitude is invalid"),
    // check('minLat')
    //     .exists({ checkFalsy: true })
    //     .withMessage("Minimum latitude is invalid"),
    // check('maxLng')
    //     .exists({ checkFalsy: true })
    //     .withMessage("Maximum longitude is invalid"),
    // check('minLng')
    //     .exists({ checkFalsy: true })
    //     .withMessage("Minimum longitude is invalid"),
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
        // .exists({ checkFalsy: true })
        .isLength({ min: 5 })
        .withMessage("Please write a longer review."),
    check('review')
        // .exists({ checkFalsy: true })
        .isLength({ max: 500 })
        .withMessage("Please write a shorter review."),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage("Stars must be an integer from 1 to 5."),
    handleValidationErrors
]

const validateURL = [
    check('url')
        // .exists({ checkFalsy: true })
        .isURL()
        .withMessage("Please provide a valid URL."),
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
                where: {
                    spotId: getSpotId
                },
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
        let findSpot = await Spot.findByPk(currSpotId);

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

            if ((startDate == existingStartDate) && (endDate == existingEndDate)) {
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
                spotId: currSpotId,
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

            for (let i = 0; i < findAllSpotReviews.length; i++) {
                let currReview = findAllSpotReviews[i];

                /******************** add User-key ********************/
                let currentUserId = currReview.userId;

                let currentUserData = await User.findByPk(currentUserId, {
                    attributes: {
                        exclude: ['username', 'hashedPassword', 'email', 'createdAt', 'updatedAt']
                    },
                    raw: true,
                })

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
        let { review, stars } = req.body;

        const validationErrorMessages = []

        // handle error: missing spot
        let findSpot = await Spot.findByPk(postSpotId);
        if (!findSpot) {
            error.message = "Spot couldn't be found";
            error.statusCode = 404;
            validationErrorMessages.push("Spot couldn't be found");
            error.errors = validationErrorMessages;
            return res.status(404).json(error)
        }

        // handle error: missing fields
        if (!review) {
            error.message = "Validation Error";
            error.status = 400;
            validationErrorMessages.push("Please write a longer review.")
        }
        if (!stars) {
            error.message = "Validation Error";
            error.status = 400;
            validationErrorMessages.push("Stars must be an integer from 1 to 5.")
        }
        if (error.message) {
            error.errors = validationErrorMessages;
            return res.status(400).json(error)
        }

        let spotReviewExists = await Review.findAll({ // returns array of review for req. spot
            where: { userId: currentUserId, spotId: postSpotId }
        });
        // handle error: review exits
        if (spotReviewExists.length > 0) {
            error.message = "User already has a review for this spot";
            error.statusCode = 403;
            validationErrorMessages.push("User already has a review for this spot");
            error.errors = validationErrorMessages;
            return res.status(403).json(error)

        } else {
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
        let { url, preview } = req.body;

        let findSpot = await Spot.findByPk(spotId);

        const validationErrorMessages = []

        // handle error: missing spot
        if (!findSpot) {
            error.message = "Spot couldn't be found";
            error.status = 404;
            validationErrorMessages.push("Spot couldn't be found");
            return res.status(404).json(error)
        }

        // handle error: missing fields
        if (!url) {
            error.message = "Validation Error";
            error.status = 400;
            validationErrorMessages.push("URL is required.")
        }
        if (error.message) {
            error.errors = validationErrorMessages;
            return res.status(400).json(error)
        }

        let postSpotImage = await findSpot.createSpotImage({
            url: url,
            // preview: preview,
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
                currSpot.dataValues.avgRatings = aveStars.toFixed(2)

                /******************* add previewImage-key *******************/
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

        // let reviewsArr = await Review.findAll({
        //     where: { spotId: currentSpotId }
        // });
        // let reviewCount = reviewsArr.length

        if (!reviewCount) getSpot.dataValues.numReviews = 0
        else getSpot.dataValues.numReviews = reviewCount;

        /******************** add avgStarRating-key ********************/
        let starSum = await Review.sum('stars', {
            where: {
                spotId: currentSpotId
            }
        })
        console.log("spot by Id starSum", starSum)


        let starAvg = starSum / reviewCount;
        if (!starAvg) starAvg = 0.0
        getSpot.dataValues.avgStarRating = starAvg.toFixed(2);

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

        let { address, city, state, country, lat, lng, name, description, price } = req.body;

        let putSpot = await Spot.findByPk(spotId);

        const validationErrorMessages = []

        // handle error: missing spot
        if (!putSpot) {
            error.message = "Spot couldn't be found";
            error.statusCode = 404;
            validationErrorMessages.push("Spot couldn't be found");
            error.errors = validationErrorMessages;
            return res.status(404).json(error);
        }

        // handle error: missing fields
        if (!address) {
            error.message = "Validation Error";
            error.status = 400;
            validationErrorMessages.push("Address is required.")
        }
        if (!city) {
            error.message = "Validation Error";
            error.status = 400;
            validationErrorMessages.push("City is required.")
        }
        if (!state) {
            error.message = "Validation Error";
            error.status = 400;
            validationErrorMessages.push("State is required.")
        }
        if (!country) {
            error.message = "Validation Error";
            error.status = 400;
            validationErrorMessages.push("Country is required.")
        }
        // if (!lat) {
        //     error.message = "Validation Error";
        //     error.status = 400;
        //     validationErrorMessages.push("Latitude is not valid")
        // }
        // if (!lng) {
        //     error.message = "Validation Error";
        //     error.status = 400;
        //     validationErrorMessages.push("Longitude is not valid")
        // }
        if (!name) {
            error.message = "Validation Error";
            error.status = 400;
            validationErrorMessages.push("Title is required.")
        }
        if (!description) {
            error.message = "Validation Error";
            error.status = 400;
            validationErrorMessages.push("Please write a longer description.")
        }
        if (!price) {
            error.message = "Validation Error";
            error.status = 400;
            validationErrorMessages.push("Price per night is required.")
        }
        if (error.message) {
            error.errors = validationErrorMessages;
            return res.status(400).json(error)
        }

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
            return res.status(404).json(error);

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
                if (!aveStars) aveStars = 0.0
                currSpot.dataValues.avgRatings = aveStars.toFixed(2)

                /*************************** add previewImage-key ***************************/
                let prevImg = await SpotImage.findOne({
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

                // temporary solution until spotImages feature is implemented:
                if (!prevImg) currSpot.dataValues.previewImage = "https://cdn1.vox-cdn.com/uploads/chorus_image/image/47552879/Pike_Place_Market_Entrance.0.0.jpg"
                else currSpot.dataValues.previewImage = prevImg.url
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
router.post('/', requireAuth, validateSpot, async (req, res) => { // removed validations
// router.post('/', requireAuth, async (req, res) => {

    let currentUser = req.user
    let currentUserId = req.user.id
    let error = {};

    try {

        let { address, city, state, country, name, description, price } = req.body;

        const validationErrorMessages = []

        // handle error: missing fields
        if (!address) {
            error.message = "Validation Error";
            error.status = 400;
            validationErrorMessages.push("Address is required.")
        }
        if (!city) {
            error.message = "Validation Error";
            error.status = 400;
            validationErrorMessages.push("City is required.")
        }
        if (!state) {
            error.message = "Validation Error";
            error.status = 400;
            validationErrorMessages.push("State is required.")
        }
        if (!country) {
            error.message = "Validation Error";
            error.status = 400;
            validationErrorMessages.push("Country is required.")
        }
        // if (!lat) {
        //     error.message = "Validation Error";
        //     error.status = 400;
        //     validationErrorMessages.push("Latitude is not valid")
        // }
        // if (!lng) {
        //     error.message = "Validation Error";
        //     error.status = 400;
        //     validationErrorMessages.push("Longitude is not valid")
        // }
        if (!name) {
            error.message = "Validation Error";
            error.status = 400;
            validationErrorMessages.push("Title is required.")
        }
        if (!description) {
            error.message = "Validation Error";
            error.status = 400;
            validationErrorMessages.push("Please write a longer description.")
        }
        if (!price) {
            error.message = "Validation Error";
            error.status = 400;
            validationErrorMessages.push("Price per night is required.")
        }
        if (error.message) {
            error.errors = validationErrorMessages;
            return res.status(400).json(error)
        }

        let postSpot = await currentUser.createSpot({
            ownerId: currentUserId,
            address: address,
            city: city,
            state: state,
            country: country,
            name: name,
            description: description,
            price: price,
        });
        postSpot.save();

        // add initial image to newly created spot:

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
