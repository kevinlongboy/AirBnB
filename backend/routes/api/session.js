const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

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

// Postman 3, 4: "Log in"
// README, line 74
router.post('/', validateLogin, async (req, res, next) => {

    const { credential, password } = req.body;
    let err = new Error()

    const user = await User.login({ credential, password });

    if (!user) {
        // const err = new Error('Login failed');
        // err.title = 'Login failed';
        // err.errors = ['The provided credentials were invalid.'];
        err.message = "Invalid credentials"
        err.statusCode = 401;
        return res.json(err);
    }

    let token = await setTokenCookie(res, user);

    let printUser = await User.findByPk(user.id, { raw: true });
    printUser.email = credential;
    printUser.token = token;

    return res.json(printUser)
});

// Log out
router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

// Restore session user
router.get(
    '/',
    restoreUser,
    (req, res) => {
        const { user } = req;
        if (user) {
            return res.json({
                user: user.toSafeObject()
            });
        } else return res.json({});
    }
);



module.exports = router;
