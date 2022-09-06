const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Password must be 2 characters or more.'),
    check('lastName')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Password must be 2 characters or more.'),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Postman 2: "Sign up"
// README, line 141
router.post('/', validateSignup, async (req, res) => {

    const { firstName, lastName, email, password, username } = req.body;

    try {

        let emailExists = await User.findOne({
            where: { email: email },
            raw: true
        })
        let usernameExists = await User.findOne({
            where: { username: username },
            raw: true
        })

        let err = {}
        if (emailExists) {
            err.message = "User already exists";
            err.statusCode = 403;
            err.errors = { email: "User with that email already exists" };
            res.json(err)
        }
        if (usernameExists) {
            err.message = "User already exists";
            err.statusCode = 403;
            err.errors = { username: "User with that username already exists" };
            res.json(err)
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
        return res.json(returnUser)
        
    } catch (err) {
        err.error = err;
        res.json(err);
    }
});

module.exports = router;
