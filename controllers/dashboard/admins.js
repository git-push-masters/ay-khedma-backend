const adminsModel = require("../../models/admins")

/** @type {import("express").RequestHandler} */
exports.createAdmin = async (req, res, next) => {
    try {
        const { username, name, password } = req.body;

        const admin = await adminsModel.getAdminByUsername(username);
        if (admin) return next({ status: 400, msgs: ["اسم المستخدم موجود مسبقا"] });

        await adminsModel.createAdmin(username, name, password);

        res.status(201).json({
            status: 201,
            msgs: ["تمت اضافة الحساب بنجاح"],
        });

    } catch (err) {
        console.error(err);
        next(err);
    }
}

/** @type {import("express").RequestHandler} */
exports.getAdmins = async (req, res, next) => {
    try {
        const admins = await adminsModel.getAllAdmins();
        res.status(200).json({
            status: 200,
            data: admins,
            msgs: [],
        });
    } catch (err) {
        console.error(err)
        next(err);
    }
}

/** @type {import("express").RequestHandler} */
exports.updateAdmin = async (req, res, next) => {
    try {
        await adminsModel.updateAdmin(req.params.adminId, req.body.name, req.body.username, req.body.password);
        res.status(200).json({
            status: 200,
            msgs: []
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/** @type {import("express").RequestHandler} */
exports.deleteAdmin = async (req, res, next) => {
    try {
        await adminsModel.deleteAdmin(req.params.adminId)
        res.status(200).json({
            status: 200,
            msgs: ["تمت ازالة الحساب بنجاح"],
        })
    } catch (err) {
        console.error(err)
        next(err);
    }
}
