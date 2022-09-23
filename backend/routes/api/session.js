const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


/************************************* global variables *************************************/

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];


/********************************** /session ***********************************/

// Postman 3, 4: "Log in"
// README, line 74
router.post('/', validateLogin, async (req, res, next) => {

    const { credential, password } = req.body;
    let error = {};

    try {
        const user = await User.login({ credential, password });

        if (!user) {
            // const err = new Error('Login failed');
            // err.title = 'Login failed';
            // err.errors = ['The provided credentials were invalid.'];
            error.message = "Invalid credentials"
            error.statusCode = 401;
            return res.json(error);
        }

        let token = await setTokenCookie(res, user);

        let printUser = await User.findByPk(user.id, { raw: true });
        printUser.email = credential;
        printUser.token = token;

        return res.json(printUser)

    } catch (err) {
        error.error = err;
        return res.json(error);
    }
});


// Log out
router.delete('/', (_req, res) => {

    res.clearCookie('token');
    return res.json({ message: 'success' });
});


// Postman 5: "Get Current User"
// README, line 48
router.get('/', restoreUser, (req, res) => {

    const { user } = req;
    let error = {};

    try {

        if (user) {
            let printUser = {};
            printUser.id = user.id;
            printUser.firstName = user.firstName;
            printUser.lastName = user.lastName;
            printUser.email = user.email;
            printUser.username = user.username;

            return res
                .status(200)
                .json(printUser)

        } else return res.json({});

    } catch (err) {
        error.err = err;
        res.json(error)
    }
});


/****************************************** export ********************************************/

module.exports = router;
