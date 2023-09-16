const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createMovie,
  deleteMovie,
  getAllMovies,
} = require('../controllers/movies');
const { URL_REGEXP_PATTERN } = require('../utils/constants');

router.get('/movies', getAllMovies);
router.post('/movies', celebrate({
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
}), createMovie);
router.delete('/movies/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex(),
  }),
}), deleteMovie);

module.exports = router;
