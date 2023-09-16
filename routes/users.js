const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserInfo,
  setUserInfo,
} = require('../controllers/users');
const { EMAIL_REGEXP_PATTERN } = require('../utils/constants');

router.get('/users/me', getUserInfo);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(EMAIL_REGEXP_PATTERN),
    name: Joi.string(),
  }),
}), setUserInfo);

module.exports = router;
