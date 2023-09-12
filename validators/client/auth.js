const { check } = require("express-validator");
const requireValidation = require('..');
const sectionsModel = require('../../models').Section;

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
    check('password')
        .notEmpty().withMessage('كلمة المرور مطلوبة')
        .bail()
        .isLength({ min: 6, max: 64 }).withMessage("يجب أن تكون كلمة المرور بين 6 حروف و 64 حرف"),
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
    check('sectionId')
        .optional()
        .isInt().withMessage('القسم غير صالح')
        .bail()
        .custom(async (sectionId) => {
            let section = await sectionsModel.getSectionById(sectionId);
            if (!section) return Promise.reject('القسم غير موجود');
            Promise.resolve();
        }),
    requireValidation
]

exports.verify = [
    ...this.login,
    check('code')
        .notEmpty().withMessage('يجب إدخال كود التفعيل')
        .bail()
        .isLength({ min: 6, max: 6 }).withMessage('كود التفعيل يتكون من 6 أرقام'),
    requireValidation
]