const { validationResult } = require("express-validator");

/** @type {import("express").RequestHandler} */
module.exports = (req, res, next) => {
    let validation = validationResult(req);
    if (!validation.isEmpty()) {
        next({ status: 400, msgs: validation.array().map(e => e.msg) })
    }

    next();
}