const { check } = require("express-validator");
const requireValidation = require('..');

exports.login = [
    check('phone')
        .notEmpty().withMessage('يجب عليك إدخال رقم الهاتف'),
    check('password')
        .notEmpty().withMessage('يجب إدخال كلمة المرور'),
    requireValidation
]

exports.register = [
    check('name')
        .notEmpty().withMessage('الإسم مطلوب'),
    check('phone')
        .notEmpty().withMessage('رقم الهاتف مطلوب')
        .bail()
        .isLength({ min: 11, max: 11 }).withMessage('يجب أن يتكون رقم الهاتف من 11 رقم'),
    check('email')
        .optional()
        .isEmail().withMessage("البريد الإلكتروني غير صالح"),
    check('locationLat')
        .optional()
        .isFloat().withMessage('الموقع غير صالح'),
    check('locationLong')
        .optional()
        .isFloat().withMessage('الموقع غير صالح'),
    check('isPhoneVisible')
        .optional()
        .isBoolean().withMessage('تأكد من اختيار اذا كنت تريد أن يظهر رقمك للعامة'),
    check('isEmailVisible')
        .optional()
        .isBoolean().withMessage('تأكد من اختيار اذا كنت تريد أن يظهر بريدك الإلكتروني للعامة'),
    check('isLocationVisible')
        .optional()
        .isBoolean().withMessage('تأكد من اختيار اذا كنت تريد أن يظهر موقعك للعامة'),
]