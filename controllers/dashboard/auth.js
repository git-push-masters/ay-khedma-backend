const adminsModel = require("../../models/admin")

/** @type {import("express").RequestHandler} */
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body

    let user = await adminsModel.getAdminByUsername(username)
    if (!user) return next({ status: 401, msgs: ["اسم المستخدم غير موجود"] })

    const validPassword = await adminsModel.verifyPassword(user, password)
    if (!validPassword)
      return next({ status: 401, msgs: ["كلمة المرور غير صحيحة"] })

    const token = adminsModel.generateToken(user)

    res.status(200).json({
      status: 200,
      msgs: [],
      body: {
        name: user.name,
        username: user.username,
        token,
      },
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}
