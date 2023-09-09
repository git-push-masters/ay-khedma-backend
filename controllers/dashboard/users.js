const usersModel = require("../../models").User;

/** @type {import("express").RequestHandler} */
exports.getUsers = async (req, res, next) => {
    try {
        const users = await usersModel.getAllUsers();
        res.status(200).json({
            status: 200,
            data: users,
            msgs: [],
        });
    } catch (err) {
        next({});
    }
};

/** @type {import("express").RequestHandler} */
exports.getUser = async (req, res, next) => {
    try {
        const user = await usersModel.getUserById(req.params.userId);
        res.status(200).json({
            status: 200,
            data: user,
            msgs: [],
        });
    } catch (err) {
        next({});
    }
};

/** @type {import("express").RequestHandler} */
exports.patchUser = async (req, res, next) => {
    try {
        const user = await usersModel.updateUser(req.params.userId, req.body);
        res.status(200).json({
            status: 200,
            data: user,
            msgs: ["تم تعديل البيانات بنجاح"],
        });
    } catch (err) {
        next({});
    }
};

/** @type {import("express").RequestHandler} */
exports.deleteUser = async (req, res, next) => {
    try {
        await usersModel.deleteUser(req.params.userId);
        res.status(200).json({
            status: 200,
            data: [],
            msgs: ["تم حذف الحساب بنجاح"],
        });
    } catch (err) {
        next({});
    }
};
