const usersModel = require('../models/users');
const adminsModel = require('../models/admins');

/** @type {import("express").RequestHandler} */
exports.requireClient = (req, res, next) => {
    if (!req.headers.authorization) return next({ status: 401, msgs: ["يجب تسجيل الدخول للوصول إلى هذه البيانات"] });
    const token = req.headers.authorization.split(' ')[1];
    if (!usersModel.verifyToken(token)) return next({ status: 401, msgs: ["الجلسة غير صالحة، أعد تسجيل الدخول"] });

    next();
}

/** @type {import("express").RequestHandler} */
exports.requireAdmin = (req, res, next) => {
    if (!req.headers.authorization) return next({ status: 401, msgs: ["يجب تسجيل الدخول للوصول إلى هذه البيانات"] });
    const token = req.headers.authorization.split(' ')[1];
    if (!adminsModel.verifyToken(token)) return next({ status: 401, msgs: ["الجلسة غير صالحة، أعد تسجيل الدخول"] });

    next();
}