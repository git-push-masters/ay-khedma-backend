const router = require('express').Router();

const multer = require('multer');
const ctrl = require('../../controllers/files/avatars');
const { uploadSettings } = require('../../config');

router.get('/:filename', ctrl.getAvatar);
router.post('/', multer(uploadSettings).single('avatar'), ctrl.postAvatar);

module.exports = router;