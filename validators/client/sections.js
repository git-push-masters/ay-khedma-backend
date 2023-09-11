const { param, query } = require('express-validator');
const requireValidation = require('..');

exports.getSection = [
    param('sectionId')
        .isInt().withMessage('القسم غير صالح'),
    requireValidation
]

exports.getSectionRequests = [
    ...this.getSection,
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