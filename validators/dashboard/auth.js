const { check } = require("express-validator");
const requireValidation = require('..');

exports.login = [
    check('username')
        .notEmpty().withMessage('يجب عليك إدخال اسم المستخدم'),
    check('password')
        .notEmpty().withMessage('يجب إدخال كلمة المرور'),
    requireValidation
]