const router = require("express").Router();

const ctrl = require("../../controllers/dashboard/admins");
const validator = require("../../validators/dashboard/admins");

// get all admins
router.get("/", ctrl.getAdmins);

// create new admin
router.post("/", ...validator.createAdmin, ctrl.createAdmin);

// update admin
router.patch("/:adminId", ...validator.updateAdmin, ctrl.updateAdmin);

// delete admin
router.delete("/:adminId", ...validator.deleteAdmin, ctrl.deleteAdmin);

module.exports = router;
