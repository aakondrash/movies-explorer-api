const { celebrate, Joi } = require('celebrate');
const { URL_REGEXP_PATTERN } = require('../constants');

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(URL_REGEXP_PATTERN),
    trailerLink: Joi.string().required().pattern(URL_REGEXP_PATTERN),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(URL_REGEXP_PATTERN),
    movieId: Joi.number().required(),
  }),
});

module.exports = createMovieValidation;
