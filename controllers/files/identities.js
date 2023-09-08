const path = require('path');
const { uploads } = require('../../config');

/** @type {import("express").RequestHandler} */
exports.getIdentity = (req, res, next) => {
    res.sendFile(
        path.join(uploads.identity, req.params.filename),
        (err) => err && next({ status: 404, msgs: ['الملف غير موجود'] })
    );
}

/** @type {import("express").RequestHandler} */
exports.postIdentity = (req, res, next) => {
    res.status(201).json({
        success: true,
        status: 201,
        url: `/identities/${req.file.filename}`
    });
}