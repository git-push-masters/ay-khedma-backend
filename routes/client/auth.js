const router = require("express").Router();

const ctrl = require("../../controllers/client/auth");
const { requireClient } = require("../../permissions/auth");
const validator = require("../../validators/client/auth");

router.post("/login", ...validator.login, ctrl.login);
router.post("/register", ...validator.register, ctrl.register);
router.post("/verify", ...validator.verify, ctrl.verify);
router.get("/me", requireClient, ctrl.me);

module.exports = router;
