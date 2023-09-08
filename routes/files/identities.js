const router = require('express').Router();

const ctrl = require('../../controllers/files/identities');
const { requireAdmin } = require('../../permissions/auth');

router.get('/:filename', requireAdmin, ctrl.getIdentity);
router.post('/', ctrl.postIdentity);

module.exports = router;