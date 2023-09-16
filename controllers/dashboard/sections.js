const sectionsModel = require("../../models").Section;

/** @type {import("express").RequestHandler} */
exports.getSections = async (req, res, next) => {
    try {
        const sections = await sectionsModel.getSections();
        res.status(200).json({
            status: 200,
            data: sections,
            msgs: [],
        });
    } catch (err) {
        next({});
    }
};

/** @type {import("express").RequestHandler} */
exports.postSection = async (req, res, next) => {
    try {
        const section = await sectionsModel.createSection(req.body);
        res.status(200).json({
            status: 200,
            data: section,
            msgs: ["تم إضافة التخصص بنجاح"],
        });
    } catch (err) {
        next({});
    }
};

/** @type {import("express").RequestHandler} */
exports.patchSection = async (req, res, next) => {
    try {
        const section = await sectionsModel.updateSection(
            req.params.sectionId,
            req.body
        );
        res.status(200).json({
            status: 200,
            data: [],
            msgs: ["تم تعديل البيانات بنجاح"],
        });
    } catch (err) {
        next({});
    }
};

/** @type {import("express").RequestHandler} */
exports.deleteSection = async (req, res, next) => {
    try {
        await sectionsModel.deleteSection(req.params.sectionId);
        res.status(200).json({
            status: 200,
            data: [],
            msgs: ["تم حذف التخصص بنجاح"],
        });
    } catch (err) {
        console.error(err);
        next({});
    }
};
