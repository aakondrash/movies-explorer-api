const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const isUrl = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (image) => isUrl(image),
        message: 'Ошибка валидации ссылки на постер к фильму',
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (trailerLink) => isUrl(trailerLink),
        message: 'Ошибка валидации ссылки на трейлер фильма',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (thumbnail) => isUrl(thumbnail),
        message: 'Ошибка валидации ссылки миниатюрное изображение постера к фильму',
      },
    },
    owner: {
      type: ObjectId,
      required: true,
      ref: 'user',
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model('movie', movieSchema);
