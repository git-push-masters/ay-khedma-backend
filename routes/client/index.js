const router = require('express').Router();

const { requireClient } = require("../../permissions/auth");

router.use('/auth', require('./auth'));
router.use('/sections', require('./sections'));

router.use(requireClient);

router.use('/users', require('./users'));
router.use('/requests', require('./requests'));

module.exports = router;