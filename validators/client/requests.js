const { query, param, check } = require('express-validator');
const requireValidation = require('..');
const sectionsModel = require('../../models').Section;

exports.getRequests = [
    query('status')
        .optional()
        .isInt({ min: 1, max: 3 }).withMessage('حالة الطلب غير صالحة'),
    query('sectionId')
        .optional()
        .isInt().withMessage('القسم غير صالح'),
    query('locationLat')
        .optional()
        .isFloat().withMessage('الموقع غير صالح'),
    query('locationLong')
        .optional()
        .isFloat().withMessage('الموقع غير صالح'),
    query('page')
        .optional()
        .isInt().withMessage('رقم الصفحة غير صالح'),
    query('limit')
        .optional()
        .isInt().withMessage('عدد العناصر غير صالح'),
    requireValidation
]

exports.getRequest = [
    param('requestId')
        .isInt().withMessage('الطلب غير صالح'),
    requireValidation
]

exports.postRequest = [
    check('title')
        .notEmpty().withMessage('عنوان الطلب مطلوب'),
    check('sectionId')
        .notEmpty().withMessage('القسم مطلوب')
        .bail()
        .isInt().withMessage('القسم غير صالح')
        .custom(async (sectionId) => {
            let section = await sectionsModel.getSectionById(sectionId);
            if (!section) return Promise.reject('القسم غير موجود');
            Promise.resolve();
        }),
    check('minPrice')
        .optional()
        .isInt().withMessage('يجب أن يكون السعر رقمًا صحيحًا'),
    check('maxPrice')
        .notEmpty().withMessage('اقصى سعر للخدمة مطلوب')
        .bail()
        .isInt().withMessage('يجب أن يكون السعر رقمًا صحيحًا'),
    check('thumbnails')
        .optional()
        .isArray().withMessage('الصور غير صالحة'),
    check('locationLat')
        .notEmpty().withMessage('الموقع مطلوب')
        .bail()
        .isFloat().withMessage('الموقع غير صالح'),
    check('locationLong')
        .notEmpty().withMessage('الموقع مطلوب')
        .bail()
        .isFloat().withMessage('الموقع غير صالح'),
    requireValidation
]

exports.patchRequest = [
    ...this.getRequest,
    check('sectionId')
        .optional()
        .isInt().withMessage('القسم غير صالح')
        .bail()
        .custom(async (sectionId) => {
            let section = await sectionsModel.getSectionById(sectionId);
            if (!section) return Promise.reject('القسم غير موجود');
            Promise.resolve();
        }),
    check('minPrice')
        .optional()
        .isInt().withMessage('يجب أن يكون السعر رقمًا صحيحًا'),
    check('maxPrice')
        .optional()
        .isInt().withMessage('يجب أن يكون السعر رقمًا صحيحًا'),
    check('thumbnails')
        .optional()
        .isArray().withMessage('الصور غير صالحة'),
    check('locationLat')
        .optional()
        .isFloat().withMessage('الموقع غير صالح'),
    check('locationLong')
        .optional()
        .isFloat().withMessage('الموقع غير صالح'),
    requireValidation
]

exports.deleteRequest = [
    ...this.getRequest,
    requireValidation
]

exports.getRequestOffers = [
    ...this.getRequest,
    requireValidation
]

exports.getRequestOffer = [
    ...this.getRequest,
    param('offerId')
        .isInt().withMessage('العرض غير صالح'),
    requireValidation
]

exports.postRequestOffer = [
    ...this.getRequest,
    check('price')
        .notEmpty().withMessage("يجب تحديد السعر")
        .bail()
        .isInt().withMessage("يجب أن يكون السعر رقم صحيح"),
    check('scheduledAt')
        .notEmpty().withMessage("يجب تحديد الموعد")
        .bail()
        .isDate().withMessage("صيغة الموعد غير صحيحة"),
    requireValidation
]

exports.getRequestReview = [
    ...this.getRequest,
    requireValidation
]

exports.postRequestReview = [
    /** @TODO Insert Validators */
    requireValidation
]