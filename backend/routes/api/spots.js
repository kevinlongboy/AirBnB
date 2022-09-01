const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User } = require('../../db/models');



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


/*********************************** spots/:spotId/images ***********************************/

// README, line 454
router.post('/:spotId/images', requireAuth, async (req, res, next) => {

    let spotId = req.params.spotId;
    let postSpot = await Spot.findByPk(spotId);

    if (!postSpot) {
        error.message = "Spot couldn't be found"
        error.status = 404
        next(err)
    }

    try {
        let { url, preview } = req.body;
        let postSpotImage = await Spot.create({
            url: url,
            preview: preview,
        });
        res.status(200).json(postSpotImage)

    } catch (err) {
        error.message = "Could not add image";
        error.statusCode = 404;
        next(err);
    }
});


/************************************** /spots/:spotId **************************************/

// README, line 314
router.get('/:spotId', async (req, res, next) => {

    let spotId = req.params.spotId;

    try {
        let getSpot = await Spot.findByPk(spotId)
        res
            .status(200)
            .json(getSpot)

    } catch (err) {
        error.message = "Spot couldn't be found";
        error.statusCode = 404;
        next(err);
    }
});

// README, line 501
router.put('/:spotId', requireAuth, async (req, res, next) => {

    let spotId = req.params.spotId;
    let putSpot = await Spot.findByPk(spotId);

    if (!putSpot) {
        error.message = "Spot couldn't be found";
        error.statusCode = 404;
        next(err);
    }

    try {

        error.errors = {};
        let { address, city, state, country, lat, lng, name, description, price } = req.body;

        if (address) putSpot.set({ address: address });
        else if (err) error.errors.address = "Street address is required";

        if (city) putSpot.set({ city: city });
        else if (err) error.errors.city = "City is required";

        if (state) putSpot.set({ state: state });
        else if (err) error.errors.state = "State is required";

        if (country) putSpot.set({ country: country });
        else if (err) error.errors.country = "Country is required";

        if (lat) putSpot.set({ lat: lat });
        else if (err) error.errors.lat = "Latitude is not valid";

        if (lng) putSpot.set({ lng: lng });
        else if (err) error.errors.lng = "Longitude is not valid";

        if (name) putSpot.set({ name: name });
        else if (err) error.errors.name = "Name must be less than 50 characters";

        if (description) putSpot.set({ description: description });
        else if (err) error.errors.description = "Description is required";

        if (price) putSpot.set({ price: price });
        else if (err) error.errors.price = "Price per day is required";

        await putSpot.save();

        res.status(200).json(putSpot)

    } catch (err) {
        err.message = "Validation Error";
        err.statusCode = 404;
        next(err);
    }
});

// README, line 589
router.delete('/:spotId', requireAuth, async (req, res, next) => {

    let spotId = req.params.spotId;
    let deleteSpot = await Spot.findByPk(spotId);

    if (!deleteSpot) {
        error.message = "Spot couldn't be found";
        error.statusCode = 404;
        next(err);

    } else {
        deleteSpot.destroy();
        deleteSpot.save();
        res
            .status(200)
            .json({
                "message": "Successfully deleted",
                "statusCode": 200
            })
    }
});


/************************************** /spots/current **************************************/

// README, line 274
router.get('/current', requireAuth, async (req, res, next) => {

    try {
        let getCurrentSpots = await User.findAll({
            where: { id: req.user.id },
            include: { model: Spot },
        });
        res
            .status(200)
            .json({
                "Spots": getCurrentSpots
            })
    } catch (err) {
        error.message = "Spot couldn't be found"
        error.status = 404
        next(err);
    }
});


/****************************************** /spots ******************************************/

// README, line 234
router.get('/', async (req, res) => {

    try {
        let getSpots = await Spot.findAll();
        res
            .status(200)
            .json(getSpots);
    } catch (err) {
        error.message = "Spot couldn't be found"
        error.status = 404
        next(err);
    }
});

// README, line 380
router.post('/', requireAuth, validateSpot, async (req, res) => {

    try {
        let { address, city, state, country, lat, lng, name, description, price } = req.body;
        let postSpot = await Spot.create({
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
        res.status(200).json(postSpot)

    } catch (err) {
        error.message = "Validation Error";
        error.statusCode = 400;
        next(err);
    }
});


/***************************************** /spots? ******************************************/

// README, line 1405
router.get('/', async (req, res) => {

    let query = {
        where: {},
        include: []
    }

    let page = req.query.page === undefined ? 0 : parseInt(req.query.page);
    if (page > 10) page = 10;

    let size = req.query.size === undefined ? 20 : parseInt(req.query.size);
    if (size > 20) size = 20;

    if (page >= 1 && size >= 1) {
        query.limit = size;
        query.offset = size * (page - 1);
    }

    try {
        if (req.query.minLat) query.where.lat = { [Op.gte]: req.query.minLat };
        if (req.query.maxLat) query.where.lat = { [Op.lte]: req.query.maxLat };
        if (req.query.minLng) query.where.lng = { [Op.gte]: req.query.minLng };
        if (req.query.maxLng) query.where.lng = { [Op.lte]: req.query.maxLng };
        if (req.query.minPrice) query.where.price = { [Op.gte]: req.query.minPrice };
        if (req.query.maxPrice) query.where.price = { [Op.lte]: req.query.maxPrice };

        let querySpots = await Spot.findAll(query);
        res.status(200).json({
            querySpots,
            page,
            size
        });

    } catch (err) {
        error.message = "Validation Error";
        error.statusCode = 400;
        next(err);
    }
});



/*************************************** error handler ****************************************/

router.use((err, req, res, next) => {
    res.json(err)
})

module.exports = router;
