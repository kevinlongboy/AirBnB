const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models');


/************************************** /SPOTS **************************************/
router.get('/', async (req, res) => {

    let spots = await Spot.findAll();

    return res.json(spots)
});


router.post('/', async (req, res) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    let spots = await Spot.findAll();

    return res.json(spots)
});



/************************************** /SPOTS? **************************************/


module.exports = router;
