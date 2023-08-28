const router = require('express').Router();

const ctrl = require('../../controllers/dashboard/auth');
const validator = require('../../validators/dashboard/auth');

router.post('/login', ...validator.login, ctrl.login);

module.exports = router;