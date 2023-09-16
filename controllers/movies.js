const Movie = require('../models/movie');
const BadRequestError = require('../error_templates/BadRequestError');
const NotFoundError = require('../error_templates/NotFoundError');
const ForbiddenError = require('../error_templates/ForbiddenError');

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new BadRequestError('Переданы некорректные данные при создании фильма.'));
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findOne({ _id: req.params._id })
    .orFail(() => next(new NotFoundError('Фильм с указанным _id не найден.')))
    .then((movie) => {
      if (movie.owner._id.toString() !== req.user._id) {
        return next(new ForbiddenError('Фильм вам не принадлежит - вы не можете удалить его.'));
      }
      Movie.deleteOne(movie).then(() => res.status(200).send({ data: movie }));
      return next;
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') return next(new NotFoundError('Фильм с указанным _id не найден.'));
      if (err.name === 'ValidationError' || req.params._id.length !== 24) return next(new BadRequestError('Переданы некорректные данные при удалении фильма.'));
      return next(err);
    });
};

module.exports.getAllMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.status(200).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError' || req.params._id.length !== 24) return next(new BadRequestError('Переданы некорректные данные при получении фильма.'));
      return next(err);
    });
};
