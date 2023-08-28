const usersModel = require('../../models/users');

/** @type {import("express").RequestHandler} */
exports.login = async (req, res, next) => {
    try {
        let user = await usersModel.getUserByPhone(req.body.phone);
        if (!user) return next({ status: 401, msgs: ["هذا المستخدم غير مسجل"] });
        if (!await usersModel.verifyPassword(user, req.body.password)) return next({ status: 401, msgs: ["كلمة المرور غير صحيحة"] });
        let token = usersModel.generateToken(user);
        res.status(200).json({
            status: 200,
            msgs: [],
            body: {
                id: user.id,
                name: user.name,
                phone: user.phone,
                avatar: user.avatar,
                locationLat: user.locationLat,
                locationLong: user.locationLong,
                sectionId: user.SectionId,
                token: token
            }
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/** @type {import("express").RequestHandler} */
exports.register = async (req, res, next) => {
    try {
        let avatar = req.files.avatar ? req.files.avatar[0] : undefined;
        let identity = req.files.identity ? req.files.identity[0] : undefined;
        let { name, phone, email, password, address, bio, locationLat, locationLong, isPhoneVisible, isEmailVisible, isLocationVisible } = req.body;
        await usersModel.createUser(name, phone, email, password, avatar, identity, address, bio, locationLat, locationLong, isPhoneVisible, isEmailVisible, isLocationVisible);

        this.login(req, res, next);
    } catch (err) {
        console.error(err);
        next(err);
    }
}