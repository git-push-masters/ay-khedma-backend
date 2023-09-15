const { query, param, check } = require("express-validator");
const requireValidation = require("..");

exports.getUsers = [
    query("sectionId").optional().isInt().withMessage("القسم غير صالح"),
    query("locationLat").optional().isFloat().withMessage("الموقع غير صالح"),
    query("locationLong").optional().isFloat().withMessage("الموقع غير صالح"),
    query("page").optional().isInt().withMessage("رقم الصفحة غير صالح"),
    query("limit").optional().isInt().withMessage("عدد العناصر غير صالح"),
    requireValidation,
];

exports.getUser = [
    param("userId").isInt().withMessage("المستخدم غير صالح"),
    requireValidation,
];

exports.patchUser = [
    ...this.getUser,
    check("phone")
        .optional()
        .isLength({ min: 11, max: 11 })
        .withMessage("يجب أن يتكون رقم الهاتف من 11 رقم"),
    check("email")
        .optional()
        .isEmail()
        .withMessage("البريد الإلكتروني غير صالح"),
    check("locationLat").optional().isFloat().withMessage("الموقع غير صالح"),
    check("locationLong").optional().isFloat().withMessage("الموقع غير صالح"),
    check("isPhoneVisible")
        .optional()
        .isBoolean()
        .withMessage("تأكد من اختيار اذا كنت تريد أن يظهر رقمك للعامة"),
    check("isEmailVisible")
        .optional()
        .isBoolean()
        .withMessage(
            "تأكد من اختيار اذا كنت تريد أن يظهر بريدك الإلكتروني للعامة"
        ),
    check("isLocationVisible")
        .optional()
        .isBoolean()
        .withMessage("تأكد من اختيار اذا كنت تريد أن يظهر موقعك للعامة"),
    check("avatar").optional(),
    check("identity").optional(),
    check("sectionId")
        .optional()
        .isInt()
        .withMessage("القسم غير صالح")
        .bail()
        .custom(async sectionId => {
            let section = await sectionsModel.getSectionById(sectionId);
            if (!section) return Promise.reject("القسم غير موجود");
            Promise.resolve();
        }),
    requireValidation,
];

exports.deleteUser = [...this.getUser, requireValidation];

exports.getUserOffers = [
    ...this.getUser,
    query("status")
        .optional()
        .isInt({ min: 0, max: 2 })
        .withMessage("حالة العرض غير صالحة"),
    query("lastOffered")
        .optional()
        .isBoolean()
        .withMessage("حالة العرض غير صالحة"),
    query("isPaid").optional().isBoolean().withMessage("حالة العرض غير صالحة"),
    query("page").optional().isInt().withMessage("رقم الصفحة غير صالح"),
    query("limit").optional().isInt().withMessage("عدد العناصر غير صالح"),
    requireValidation,
];

exports.getUserReviews = [
    ...this.getUser,
    query("page").optional().isInt().withMessage("رقم الصفحة غير صالح"),
    query("limit").optional().isInt().withMessage("عدد العناصر غير صالح"),
    requireValidation,
];

exports.postUserReport = [
    ...this.getUser,
    check("details").notEmpty().withMessage("رجاء توفير تفاصيل حول الإبلاغ"),
    requireValidation,
];
