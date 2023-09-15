const { param, check } = require("express-validator");
const sectionsModel = require("../../models").Section;
const requireValidation = require("..");

exports.getUsers = [requireValidation];

exports.getUser = [
    param("userId").notEmpty().withMessage("يجب إدخال رقم المستخدم"),
    requireValidation,
];

exports.patchUser = [
    param("userId").notEmpty().withMessage("يجب إدخال رقم المستخدم"),
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

exports.deleteUser = [
    param("userId").notEmpty().withMessage("يجب إدخال رقم المستخدم"),
    requireValidation,
];
