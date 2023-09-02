const router = require("express").Router();

const { requireAdmin } = require("../../permissions/auth");

router.use("/auth", require("./auth"));

router.use(requireAdmin);

router.use("/admins", require("./admins"));
router.use("/users", require("./users"));
router.use("/sections", require("./sections"));
router.use("/requests", require("./requests"));

module.exports = router;
