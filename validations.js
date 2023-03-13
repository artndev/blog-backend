import { body } from 'express-validator';


export const loginValidation = [
    body('email', 'Неверный формат почты')
        .isEmail()
        .isString(),
    body('password', 'Пароль должен быть как минимум 5 символов')
        .isLength({ min: 5 })
        .isString(),
];

export const registerValidation = [
    body('email', 'Неверный формат почты')
        .isEmail()
        .isString(),
    body('password', 'Пароль должен быть как минимум 5 символов')
        .isLength({ min: 5 })
        .isString(),
    body('fullName', 'Укажите имя')
        .isLength({ min: 3 })
        .isString(),
    body('avatarUrl', 'Неверная ссылка на аватар')
        .optional()
        .isString()
        .isURL(),
];

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи')
        .isLength({ min: 5 })
        .isString(),
    body('text', 'Введите текст статьи')
        .isLength({ min: 10 })
        .isString(),
    body('tags', 'Неверный формат тэгов')
        .optional()
        .isString(),
    body('imageUrl', 'Неверная ссылка на изображение')
        .optional()
        .isString()
        .isURL(),
];