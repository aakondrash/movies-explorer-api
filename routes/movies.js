const moviesRouter = require('express').Router();
const {
  createMovie,
  deleteMovie,
  getAllMovies,
} = require('../controllers/movies');
const createMovieValidation = require('../utils/validation/createMovieValidation');
const deleteMovieValidation = require('../utils/validation/deleteMovieValidation');

moviesRouter.get('/movies', getAllMovies);
moviesRouter.post('/movies', createMovieValidation, createMovie);
moviesRouter.delete('/movies/:_id', deleteMovieValidation, deleteMovie);

module.exports = moviesRouter;
