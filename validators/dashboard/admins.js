const { check, param } = require("express-validator")
const requireValidation = require("..")

exports.createAdmin = [
    check("name").notEmpty().withMessage("الاسم مطلوب"),
    check("username").notEmpty().withMessage("اسم المستخدم مطلوب"),
    check("password")
        .notEmpty().withMessage("كلمة المرور مطلوبة")
        .bail()
        .isLength({ min: 6, max: 64 }).withMessage("يجب أن تكون كلمة المرور بين 6 حروف و 64 حرف"),
    check("passwordConfirm").custom((value, { req }) => {
        if (value !== req.body.password) throw new Error("كلمة المرور غير متطابقة")
        return true
    }),
    requireValidation,
]

exports.updateAdmin = [
    param("adminId")
        .notEmpty().withMessage("يجب تحديد المدير المطلوب")
        .bail()
        .isInt().withMessage("العنصر غير صالح"),
    requireValidation,
]

exports.deleteAdmin = [
    param("adminId")
        .notEmpty().withMessage("يجب تحديد المدير المطلوب")
        .bail()
        .isInt().withMessage("العنصر غير صالح"),
    requireValidation,
]
