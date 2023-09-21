const router = require('express').Router();
const { createUser, login, logout } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const loginValidation = require('../utils/validation/loginValidation');
const registerValidation = require('../utils/validation/registerValidation');
const errorRouter = require('./error');
const movieRouter = require('./movies');
const userRouter = require('./users');

router.post('/signup', registerValidation, createUser);
router.post('/signin', loginValidation, login);
router.post('/signout', logout);
router.use(auth);
router.use('/', userRouter);
router.use('/', movieRouter);
router.use('*', errorRouter);

module.exports = router;
