const router = require('express').Router();

const multer = require('multer');
const ctrl = require('../../controllers/files/thumbnails');
const requiredFile = require('../../validators/files');
const { requireClient } = require('../../permissions/auth');
const { uploadSettings } = require('../../config');

router.get('/:filename', ctrl.getThumbnail);
router.post('/', requireClient, multer(uploadSettings).single('thumbnail'), requiredFile, ctrl.postThumbnail);

module.exports = router;