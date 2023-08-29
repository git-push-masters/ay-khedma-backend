const router = require("express").Router()

const { requireAdmin } = require("../../permissions/auth")

router.use("/auth", require("./auth"))

// @TODO uncomment this line
// router.use(requireAdmin);

router.use("/admins", require("./admins"))

module.exports = router
