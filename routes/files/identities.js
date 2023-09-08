const router = require('express').Router();

const multer = require('multer');
const ctrl = require('../../controllers/files/identities');
const requiredFile = require('../../validators/files');
const { requireAdmin } = require('../../permissions/auth');
const { uploadSettings } = require('../../config');

router.get('/:filename', requireAdmin, ctrl.getIdentity);
router.post('/', multer(uploadSettings).single('identity'), requiredFile, ctrl.postIdentity);

module.exports = router;