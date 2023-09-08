const router = require('express').Router();

const multer = require('multer');
const ctrl = require('../../controllers/files/avatars');
const requiredFile = require('../../validators/files');
const { uploadSettings } = require('../../config');

router.get('/:filename', ctrl.getAvatar);
router.post('/', multer(uploadSettings).single('avatar'), requiredFile, ctrl.postAvatar);

module.exports = router;