const { celebrate, Joi } = require('celebrate');

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required(),
  }),
});

module.exports = deleteMovieValidation;
