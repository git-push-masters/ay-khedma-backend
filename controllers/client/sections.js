const sectionsModel = require('../../models').Section;
const requestsModel = require('../../models').Request;

/** @type {import("express").RequestHandler} */
exports.getSections = async (req, res, next) => {
    try {
        let sections = await sectionsModel.getAllSections();
        res.status(200).json({
            success: true,
            status: 200,
            msgs: [],
            count: sections.length,
            body: sections
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/** @type {import("express").RequestHandler} */
exports.getSection = async (req, res, next) => {
    try {
        let section = await sectionsModel.getSectionById(req.params.sectionId);
        if (!section) return next({ status: 404, msgs: ['القسم غير موجود'] });
        res.status(200).json({
            success: true,
            status: 200,
            msgs: [],
            body: section
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/** @type {import("express").RequestHandler} */
exports.getSectionRequests = async (req, res, next) => {
    try {
        let requests = await requestsModel.getRequests({ ...req.query, sectiodId: req.params.sectiodId });
        res.status(200).json({
            success: true,
            status: 200,
            msgs: [],
            count: requests.length,
            page: req.query.page || 1,
            body: requests
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
}