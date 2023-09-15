const path = require('path');
const { uploads } = require('../../config');

/** @type {import("express").RequestHandler} */
exports.getThumbnail = (req, res, next) => {
    res.sendFile(
        path.join(uploads.thumbnail, req.params.filename),
        (err) => err && next({ status: 404, msgs: ['الملف غير موجود'] })
    );
}

/** @type {import("express").RequestHandler} */
exports.postThumbnail = (req, res, next) => {
    let filenames = req.files.map(file => `/thumbnails/${file.filename}`);
    res.status(201).json({
        success: true,
        status: 201,
        url: filenames
    });
}