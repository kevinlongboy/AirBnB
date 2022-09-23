const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


/************************************* global variables *************************************/

// const validateSignup = [
//     check('firstName')
//         .exists({ checkFalsy: true })
//         .isLength({ min: 2 })
//         .withMessage('First name must be 2 characters or more.'),
//     check('lastName')
//         .exists({ checkFalsy: true })
//         .isLength({ min: 2 })
//         .withMessage('Last name must be 2 characters or more.'),
//     check('email')
//         .exists({ checkFalsy: true })
//         .isEmail()
//         .withMessage('Please provide a valid email.'),
//     check('username')
//         .exists({ checkFalsy: true })
//         .isLength({ min: 4 })
//         .withMessage('Please provide a username with at least 4 characters.'),
//     check('username')
//         .not()
//         .isEmail()
//         .withMessage('Username cannot be an email.'),
//     check('password')
//         .exists({ checkFalsy: true })
//         .isLength({ min: 6 })
//         .withMessage('Password must be 6 characters or more.'),
//     handleValidationErrors
// ];


/****************************************** /users ******************************************/

// Postman 2: "Sign up"
// README, line 141
router.post('/', async (req, res) => {

    const { firstName, lastName, email, username, password } = req.body;
    let error = {};

    try {
        let emailExists = await User.findOne({
            where: { email: email },
            raw: true
        })
        let usernameExists = await User.findOne({
            where: { username: username },
            raw: true
        })

        if (emailExists) {
            error.message = "User already exists";
            error.statusCode = 403;
            error.errors = { email: "User with that email already exists" };
            res.json(error)
        }
        if (usernameExists) {
            error.message = "User already exists";
            error.statusCode = 403;
            error.errors = { username: "User with that username already exists" };
            res.json(error)
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
        error.error = error
        return res.json(error);
    }
});


/****************************************** export ********************************************/

module.exports = router;
