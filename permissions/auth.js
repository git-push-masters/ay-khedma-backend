const usersModel = require("../models/user")
const adminsModel = require("../models/admin")

/** @type {import("express").RequestHandler} */
exports.requireClient = (req, res, next) => {
  if (!req.headers.authorization)
    return next({
      status: 401,
      msgs: ["يجب تسجيل الدخول للوصول إلى هذه البيانات"],
    })
  const token = req.headers.authorization.split(" ")[1]
  let userData = usersModel.verifyToken(token)
  if (!userData)
    return next({ status: 401, msgs: ["الجلسة غير صالحة، أعد تسجيل الدخول"] })

  req.user = userData
  next()
}

/** @type {import("express").RequestHandler} */
exports.requireAdmin = (req, res, next) => {
  if (!req.headers.authorization)
    return next({
      status: 401,
      msgs: ["يجب تسجيل الدخول للوصول إلى هذه البيانات"],
    })
  const token = req.headers.authorization.split(" ")[1]
  let adminData = adminsModel.verifyToken(token)
  if (!adminData)
    return next({ status: 401, msgs: ["الجلسة غير صالحة، أعد تسجيل الدخول"] })

  req.admin = adminData

  next()
}
