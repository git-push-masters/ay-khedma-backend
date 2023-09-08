const router = require('express').Router();

const ctrl = require('../../controllers/files/icons');
const { requireAdmin } = require('../../permissions/auth');

router.get('/:filename', ctrl.getIcon);
router.post('/', requireAdmin, ctrl.postIcon);

module.exports = router;