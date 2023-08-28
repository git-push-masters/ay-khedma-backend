const router = require('express').Router();

const ctrl = require('../../controllers/client/auth');
const validator = require('../../validators/client/auth');

router.post('/login', ...validator.login, ctrl.login);
router.post('/register', ...validator.register, ctrl.register);

module.exports = router;