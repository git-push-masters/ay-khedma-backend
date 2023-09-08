const router = require('express').Router();

router.use('/avatars', require('./avatars'));
router.use('/icons', require('./icons'));
router.use('/identities', require('./identities'));
router.use('/thumbnails', require('./thumbnails'));

module.exports = router;