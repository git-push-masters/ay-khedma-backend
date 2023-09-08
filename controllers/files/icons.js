const path = require('path');
const { uploads } = require('../../config');

/** @type {import("express").RequestHandler} */
exports.getIcon = (req, res, next) => {
    res.sendFile(
        path.join(uploads.icon, req.params.filename),
        (err) => err && next({ status: 404, msgs: ['الملف غير موجود'] })
    );
}

/** @type {import("express").RequestHandler} */
exports.postIcon = (req, res, next) => {
    res.status(201).json({
        success: true,
        status: 201,
        url: `/icons/${req.file.filename}`
    });
}