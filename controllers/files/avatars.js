const path = require('path');
const { uploads } = require('../../config');

/** @type {import("express").RequestHandler} */
exports.getAvatar = (req, res, next) => {
    res.sendFile(
        path.join(uploads.avatar, req.params.filename),
        (err) => err && next({ status: 404, msgs: ['الملف غير موجود'] })
    );
}

/** @type {import("express").RequestHandler} */
exports.postAvatar = (req, res, next) => {
    res.status(201).json({
        success: true,
        status: 201,
        url: `/avatars/${req.file.filename}`
    });
}