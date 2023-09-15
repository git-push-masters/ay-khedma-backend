const requestsModel = require("../../models").Request;

/** @type {import("express").RequestHandler} */
exports.getRequests = async (req, res, next) => {
    try {
        let { page = 1 } = req.query;
        let requests = await requestsModel.getRequests(req.query);
        res.status(200).json({
            success: true,
            status: 200,
            msgs: [],
            count: requests.length,
            page,
            body: requests,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

/** @type {import("express").RequestHandler} */
exports.getRequest = async (req, res, next) => {
    /** @TODO Implement Controller */
};

/** @type {import("express").RequestHandler} */
exports.deleteRequest = async (req, res, next) => {
    try {
        let request = await requestsModel.getRequestById(req.params.requestId);
        if (!request) return next({ status: 404, msgs: ["الطلب غير موجود"] });

        await requestsModel.deleteRequest(req.params.requestId);

        res.status(200).json({
            success: true,
            status: 200,
            msgs: [],
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

/** @type {import("express").RequestHandler} */
exports.getRequestOffers = async (req, res, next) => {
    /** @TODO Implement Controller */
};

/** @type {import("express").RequestHandler} */
exports.getRequestOffer = async (req, res, next) => {
    /** @TODO Implement Controller */
};

/** @type {import("express").RequestHandler} */
exports.getRequestReview = async (req, res, next) => {
    /** @TODO Implement Controller */
};
