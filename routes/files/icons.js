const router = require('express').Router();

const multer = require('multer');
const ctrl = require('../../controllers/files/icons');
const requiredFile = require('../../validators/files');
const { requireAdmin } = require('../../permissions/auth');
const { uploadSettings } = require('../../config');

router.get('/:filename', ctrl.getIcon);
router.post('/', requireAdmin, multer(uploadSettings).single('icon'), requiredFile, ctrl.postIcon);

module.exports = router;