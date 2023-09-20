const { celebrate, Joi } = require('celebrate');
const { EMAIL_REGEXP_PATTERN } = require('../constants');

const updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(EMAIL_REGEXP_PATTERN),
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports = updateUserInfoValidation;
