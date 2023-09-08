const router = require('express').Router();

const ctrl = require('../../controllers/files/thumbnails');
const { requireClient } = require('../../permissions/auth');

router.get('/:filename', ctrl.getThumbnail);
router.post('/', requireClient, ctrl.postThumbnail);

module.exports = router;