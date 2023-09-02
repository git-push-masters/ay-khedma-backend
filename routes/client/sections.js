const router = require('express').Router();

const ctrl = require('../../controllers/client/sections');
const validator = require('../../validators/client/sections');

router.get('/', ...validator.getSections, ctrl.getSections);
router.get('/:sectionId', ...validator.getSection, ctrl.getSection);
router.get('/:sectionId/requests', ...validator.getSectionRequests, ctrl.getSectionRequests);

module.exports = router;