const usersRouter = require('express').Router();
const {
  getUserInfo,
  setUserInfo,
} = require('../controllers/users');
const updateUserInfoValidation = require('../utils/validation/updateUserInfoValidation');

usersRouter.get('/users/me', getUserInfo);
usersRouter.patch('/users/me', updateUserInfoValidation, setUserInfo);

module.exports = usersRouter;
