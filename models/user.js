const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      minlength: 2, // минимальная длина имени — 2 символа
      maxlength: 30, // а максимальная — 30 символов
    },
    email: {
      type: String,
      required: [true, 'Пожалуйста, введите Ваш e-mail'],
      minlength: 2,
      validate: {
        validator: (email) => isEmail(email),
        message: 'Ошибка валидации формата почты',
      },
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
);

module.exports = mongoose.model('user', userSchema);
