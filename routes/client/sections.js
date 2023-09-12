const router = require('express').Router();

const ctrl = require('../../controllers/client/sections');
const validator = require('../../validators/client/sections');
const { requireClient } = require('../../permissions/auth');

router.get('/', ctrl.getSections);
router.get('/:sectionId', ...validator.getSection, ctrl.getSection);
router.get(requireClient, '/:sectionId/requests', ...validator.getSectionRequests, ctrl.getSectionRequests);

module.exports = router;