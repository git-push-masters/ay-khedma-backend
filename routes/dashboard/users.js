const router = require('express').Router();

const ctrl = require('../../controllers/dashboard/users');
const validator = require('../../validators/dashboard/users');

router.get('/', ...validator.getUsers, ctrl.getUsers);
router.get('/:userId', ...validator.getUser, ctrl.getUser);
router.patch('/:userId', ...validator.patchUser, ctrl.patchUser);
router.delete('/:userId', ...validator.deleteUser, ctrl.deleteUser);

module.exports = router;