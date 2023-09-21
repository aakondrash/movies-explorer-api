const errorRouter = require('express').Router();
const NotFoundError = require('../error_templates/NotFoundError');

errorRouter.all('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует.'));
});

module.exports = errorRouter;
