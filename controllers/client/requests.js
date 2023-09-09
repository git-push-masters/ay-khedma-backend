const requestsModel = require('../../models').Request;
const offersModel = require('../../models').Offer;
const reviewsModel = require('../../models').Review;


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
            body: requests
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
        if (!request) return next({ status: 404, msgs: ['الطلب غير موجود'] });
        res.status(200).json({
            success: true,
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
    try {
        await requestsModel.createRequest({ ...req.body, userId: req.user.id });
        res.status(201).json({
            success: true,
            status: 201,
            msgs: []
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/** @type {import("express").RequestHandler} */
exports.patchRequest = async (req, res, next) => {
    try {
        let request = await requestsModel.getRequestById(req.params.requestId);
        if (!request) return next({ status: 404, msgs: ['الطلب غير موجود'] });
        if (request.userId !== req.user.id) return next({ status: 401, msgs: ['ليس لديك صلاحية التعديل'] });
        await requestsModel.updateRequest(req.params.requestId, req.body);
        res.status(200).json({
            success: true,
            status: 200,
            msgs: []
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/** @type {import("express").RequestHandler} */
exports.deleteRequest = async (req, res, next) => {
    try {
        let request = await requestsModel.getRequestById(req.params.requestId);
        if (!request) return next({ status: 404, msgs: ['الطلب غير موجود'] });
        if (request.userId !== req.user.id) return next({ status: 401, msgs: ['ليس لديك صلاحية الحذف'] });
        await requestsModel.deleteRequest(req.params.requestId);
        res.status(200).json({
            success: true,
            status: 200,
            msgs: []
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/** @type {import("express").RequestHandler} */
exports.getRequestOffers = async (req, res, next) => {
    try {
        let request = await requestsModel.getRequestById(req.params.requestId);
        if (!request) return next({ status: 404, msgs: ['الطلب غير موجود'] });
        if (request.userId !== req.user.id) return next({ status: 401, msgs: ['ليس لديك صلاحية عرض الببانات'] });
        let offers = await offersModel.getOffers(undefined, req.params.requestId, req.query);
        res.status(200).json({
            success: true,
            status: 200,
            msgs: [],
            count: offers.length,
            page: req.query.page || 1,
            body: offers
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/** @type {import("express").RequestHandler} */
exports.getRequestOffer = async (req, res, next) => {
    try {
        let offer = await offersModel.getOfferById(req.params.offerId);
        if (!offer) return next({ status: 404, msgs: ['العرض غير موجود'] });
        if (offer.requestId !== req.params.requestId) return next({ status: 400, msgs: ['الرابط غير صالح'] });
        if (offer.Request.userId !== req.user.id && offer.userId !== req.user.id) return next({ status: 401, msgs: ['ليس لك صلاحية عرض هذا العنصر'] });
        res.status(200).json({
            success: true,
            status: 200,
            msgs: [],
            body: offer
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/** @type {import("express").RequestHandler} */
exports.postRequestOffer = async (req, res, next) => {
    try {
        let request = await requestsModel.getRequestById(req.params.requestId);
        if (!request) return next({ status: 404, msgs: ['الطلب غير موجود'] });
        if (request.userId === req.user.id) return next({ status: 400, msgs: ['لا يمكنك التقديم على طلبك'] });
        let confirmedOffer = await offersModel.getConfirmedOfferByRequestId(req.params.requestId);
        if (confirmedOffer) return next({ status: 400, msgs: ['لم يعد الطلب يقبل عروض'] });
        await offersModel.createOffer(req.user.id, req.params.requestId, req.body);
        res.status(201).json({
            success: true,
            status: 201,
            msgs: []
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/** @type {import("express").RequestHandler} */
exports.getRequestReview = async (req, res, next) => {
    try {
        let review = reviewsModel.getReviewByRequestId(req.params.requestId);
        if (!review) return next({ status: 404, msgs: ['لا يوجد مراجعة لهذا الطلب'] });
        res.status(200).json({
            success: true,
            status: 200,
            msgs: [],
            body: review
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/** @type {import("express").RequestHandler} */
exports.postRequestReview = async (req, res, next) => {
    try {
        let request = await requestsModel.getRequestById(req.params.requestId);
        if (!request) return next({ status: 404, msgs: ['الطلب غير موجود'] });
        if (request.userId !== req.user.id) return next({ status: 401, msgs: ['ليس لديك صلاحية'] });
        let confirmedOffer = await offersModel.getConfirmedOfferByRequestId(req.params.requestId);
        if (!confirmedOffer) return next({ status: 400, msgs: ['لا يمكن مراجعة طلب غير مكتمل'] });
        await reviewsModel.createReview(confirmedOffer.userId, req.params.requestId, req.body);
        res.status(201).json({
            success: true,
            status: 200,
            msgs: []
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}