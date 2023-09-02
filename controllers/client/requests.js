const requestsModel = require('../../models').Request;


/** @type {import("express").RequestHandler} */
exports.getRequests = async (req, res, next) => {
    try {
        let {status, sectionId, locationLat, locationLong, page, limit} = req.query;
        let requests = await requestsModel.getRequests(status, sectionId, locationLat, locationLong, page, limit);
        res.status(200).json({
            status: 200,
            msgs: [],
            body: {
                count: requests.length,
                page,
                requests
            }
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/** @type {import("express").RequestHandler} */
exports.getRequest = async (req, res, next) => {
    try {
        let request = await requestsModel.getRequestById(req.params.requestId);
        res.status(200).json({
            status: 200,
            msgs: [],
            body: request
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/** @type {import("express").RequestHandler} */
exports.postRequest = async (req, res, next) => {
    /** @TODO Implement Controller */
}

/** @type {import("express").RequestHandler} */
exports.patchRequest = async (req, res, next) => {
    /** @TODO Implement Controller */
}

/** @type {import("express").RequestHandler} */
exports.deleteRequest = async (req, res, next) => {
    /** @TODO Implement Controller */
}

/** @type {import("express").RequestHandler} */
exports.getRequestOffers = async (req, res, next) => {
    /** @TODO Implement Controller */
}

/** @type {import("express").RequestHandler} */
exports.getRequestOffer = async (req, res, next) => {
    /** @TODO Implement Controller */
}

/** @type {import("express").RequestHandler} */
exports.postRequestOffer = async (req, res, next) => {
    /** @TODO Implement Controller */
}

/** @type {import("express").RequestHandler} */
exports.getRequestReview = async (req, res, next) => {
    /** @TODO Implement Controller */
}

/** @type {import("express").RequestHandler} */
exports.postRequestReview = async (req, res, next) => {
    /** @TODO Implement Controller */
}