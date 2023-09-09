const usersModel = require("../models").User
const adminsModel = require("../models").Admin

/** @type {import("express").RequestHandler} */
exports.requireClient = (req, res, next) => {
    try {
        if (!req.headers.authorization) return next({ status: 401, msgs: ["يجب تسجيل الدخول للوصول إلى هذه البيانات"], })
        const token = req.headers.authorization.split(" ")[1]
        let userData = usersModel.verifyToken(token)
        if (!userData) return next({ status: 401, msgs: ["الجلسة غير صالحة، أعد تسجيل الدخول"] })

        req.user = userData

        next()
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/** @type {import("express").RequestHandler} */
exports.requireAdmin = (req, res, next) => {
    try {
        if (!req.headers.authorization) return next({ status: 401, msgs: ["يجب تسجيل الدخول للوصول إلى هذه البيانات"], })
        const token = req.headers.authorization.split(" ")[1]
        let adminData = adminsModel.verifyToken(token)
        if (!adminData) return next({ status: 401, msgs: ["الجلسة غير صالحة، أعد تسجيل الدخول"] })

        req.admin = adminData

        next()
    } catch (err) {
        console.error(err);
        next(err);
    }
}
