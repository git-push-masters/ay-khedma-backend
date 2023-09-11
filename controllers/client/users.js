const usersModel = require("../../models").User;
const offersModel = require('../../models').Offer;
const reviewsModel = require('../../models').Review;
const reportsModel = require('../../models').Report;

/** @type {import("express").RequestHandler} */
exports.getUsers = async (req, res, next) => {
    try {
        let users = await usersModel.getUsers(req.query);
        res.status(200).json({
            success: true,
            status: 200,
            msgs: [],
            count: users.length,
            page: req.query.page || 1,
            body: users
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/** @type {import("express").RequestHandler} */
exports.getUser = async (req, res, next) => {
    try {
        let user = await usersModel.getUserById(req.params.userId);
        if (!user || !user.isPhoneVerified) return next({ status: 404, msgs: ['المستخدم غير موجود'] });
        res.status(200).json({
            success: true,
            status: 200,
            msgs: [],
            body: user
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/** @type {import("express").RequestHandler} */
exports.patchUser = async (req, res, next) => {
    try {
        if (req.params.userId !== req.user.id) return next({ status: 401, msgs: ['ليس لديك صلاحية لهذا الإجراء'] });
        await usersModel.updateUser(req.params.userId, req.query);
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
exports.deleteUser = async (req, res, next) => {
    try {
        if (req.params.userId !== req.user.id) return next({ status: 401, msgs: ['ليس لديك صلاحية لهذا الإجراء'] });
        await usersModel.deleteUser(req.params.userId);
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
exports.getUserOffers = async (req, res, next) => {
    try {
        let offers = [];
        if (req.query.received) {
            offers = await offersModel.getReceivedOffers(req.user.id, req.query);
        } else {
            offers = await offersModel.getOffers(req.user.id, undefined, req.query);
        }
        res.status(200).json({
            success: true,
            status: 200,
            msgs: [],
            count: offers.length,
            page: req.query.page || 1,
            body: offers
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/** @type {import("express").RequestHandler} */
exports.getUserReviews = async (req, res, next) => {
    /** @TODO Implement Controller */
}

/** @type {import("express").RequestHandler} */
exports.postUserReport = async (req, res, next) => {
    try {
        if (req.user.id === req.params.userId) return next({ status: 400, msgs: ['لا يمكنك أن تبلغ عن نفسك'] });
        await reportsModel.createReport(req.user.id, req.params.userId, req.body.details);
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