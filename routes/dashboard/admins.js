const router = require("express").Router();

const ctrl = require("../../controllers/dashboard/admins");
const validator = require("../../validators/dashboard/admins");

// get all admins
router.get("/", ctrl.getAdmins);

// create new admin
router.post("/", ...validator.postAdmin, ctrl.postAdmin);

// update admin
router.patch("/:adminId", ...validator.patchAdmin, ctrl.patchAdmin);

// delete admin
router.delete("/:adminId", ...validator.deleteAdmin, ctrl.deleteAdmin);

module.exports = router;
