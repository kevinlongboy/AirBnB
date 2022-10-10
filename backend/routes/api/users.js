const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


/************************************* global variables *************************************/

const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true }) // return "invalid value" message if falsy
        .isLength({ min: 2 })
        .withMessage('First name must be 2 characters or more.'),
    check('lastName')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Last name must be 2 characters or more.'),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .exists({ checkFalsy: true })
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];


/****************************************** /users ******************************************/

// Postman 2: "Sign up"
// README, line 141
router.post('/', validateSignup, async (req, res) => {

    const { firstName, lastName, email, username, password } = req.body;
    let error = {};

    // validate signup will rin before try-code block; will return rejected promise if errors
    try {

        // validate unique user credentials
        const validationErrorMessages = []

        let emailExists = await User.findOne({
            where: { email: email },
            raw: true
        })
        if (emailExists) {
            error.message = "User already exists";
            error.statusCode = 403;
            validationErrorMessages.push("That email is already taken. Please try another." );
        }

        let usernameExists = await User.findOne({
            where: { username: username },
            raw: true
        })
        if (usernameExists) {
            error.message = "User already exists";
            error.statusCode = 403;
            validationErrorMessages.push("That username is already taken. Please try another.");
        }

        // consolidate rejected promise to one response
        if (error.message) {
            error.errors = validationErrorMessages;
            res.status(403).json(error)
        }


        let user = await User.signup({ firstName, lastName, email, username, password });
        let token = await setTokenCookie(res, user);

        returnUser = await User.findByPk(user.id, {
            attributes: {
                exclude: ['username']
            },
            raw: true
        })
        returnUser.email = email
        returnUser.username = username
        returnUser.token = token
        return res
            .status(200)
            .json(returnUser)

    } catch (err) {
        error.error = err
        return res.json(error);
    }
});


/****************************************** export ********************************************/

module.exports = router;
