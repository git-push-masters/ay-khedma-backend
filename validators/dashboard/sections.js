const { param, check } = require("express-validator");
const requireValidation = require("..");

exports.getSections = [requireValidation];

exports.getSection = [
    param("sectionId").notEmpty().withMessage("يجب إدخال رقم القسم"),
    requireValidation,
];

exports.postSection = [
    check("name").notEmpty().withMessage("يجب إدخال اسم التخصص"),
    check("icon").optional(),
    requireValidation,
];

exports.patchSection = [
    param("sectionId").notEmpty().withMessage("يجب إدخال رقم القسم"),
    check("name").optional().notEmpty().withMessage("يجب إدخال اسم التخصص"),
    check("icon").optional(),
    requireValidation,
];

exports.deleteSection = [
    param("sectionId").notEmpty().withMessage("يجب إدخال رقم القسم"),
    requireValidation,
];
