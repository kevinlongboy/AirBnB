const express = require('express');
const { check } = require('express-validator');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');

const router = express.Router();


/************************************* global variables *************************************/

const validateSignup = [
    check('firstName')
        // .exists({ checkFalsy: true }) // return "invalid value" message if falsy
        .isLength({ min: 2 })
        .withMessage('Please enter your your first name.'),
        // .withMessage('Are you sure you entered your first name correctly?'),
    check('lastName')
        // .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Please enter your your last name.'),
        // .withMessage('Are you sure you entered your last name correctly?'),
    check('email')
        // .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        // .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please create a username with 4 or more characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email. Please try again.'),
    check('password')
        // .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Please use 6 or more characters for your password.'),
    handleValidationErrors
];


/****************************************** /users ******************************************/

// Postman 2: "Sign up"
// README, line 141
router.post('/', validateSignup, async (req, res) => {

    const { firstName, lastName, email, username, password } = req.body;
    let error = {};

    // validate signup will run before try-code block; will return rejected promise if errors
    try {

        // validate unique user credentials
        const validationErrorMessages = []

        // handle error: credentials exist for another user
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
            return res.status(403).json(error)
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
