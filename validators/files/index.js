/** @type {import("express").RequestHandler} */
module.exports = (req, res, next) => {
    if (!req.file && !req.files) return next({ status: 400, msgs: ['يجب رفع الملف المطلوب'] });

    next();
}