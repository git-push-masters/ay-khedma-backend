const usersModel = require("../../models").User;
const sms = require('../../services/sms');

/** @type {import("express").RequestHandler} */
exports.login = async (req, res, next) => {
    try {
        let user = await usersModel.getUserByPhone(req.body.phone)
        if (!user) return next({ status: 401, msgs: ["هذا المستخدم غير مسجل"] })
        if (!(await usersModel.verifyPassword(user, req.body.password))) return next({ status: 401, msgs: ["كلمة المرور غير صحيحة"] })
        if (!user.isPhoneVerified) return next({ status: 406, msgs: ["لم يتم تأكيد رقم الهاتف"] })
        let token = usersModel.generateToken(user)
        res.status(200).json({
            success: true,
            status: 200,
            msgs: [],
            body: {
                id: user.id,
                name: user.name,
                phone: user.phone,
                avatar: user.avatar,
                locationLat: user.locationLat,
                locationLong: user.locationLong,
                sectionId: user.sectionId,
                token: token,
            },
        })
    } catch (err) {
        console.error(err)
        next(err)
    }
}

/** @type {import("express").RequestHandler} */
exports.register = async (req, res, next) => {
    try {
        let avatar = req.files?.avatar ? req.files.avatar[0] : undefined;
        let identity = req.files?.identity ? req.files.identity[0] : undefined;
        let phoneVerificationCode = Math.floor(100000 + Math.random() * 900000);
        await usersModel.createUser({ ...req.body, avatar, identity, phoneVerificationCode });
        await sms.sendVerificationSMS(phone, code);
        res.status(201).json({
            success: true,
            status: 201,
            msgs: []
        });

    } catch (err) {
        console.error(err)
        next(err)
    }
}


/** @type {import("express").RequestHandler} */
exports.verify = async (req, res, next) => {
    try {
        let user = await usersModel.getUserByPhone(req.body.phone);
        if (!user) return next({ status: 401, msgs: ["هذا المستخدم غير مسجل"] });
        if (!await usersModel.verifyCode(user, req.body.code)) return next({ status: 401, msgs: ["كود التفعيل غير صحيح"] });
        return this.login(req, res, next);
    } catch (err) {
        console.error(err);
        next(err);
    }
}