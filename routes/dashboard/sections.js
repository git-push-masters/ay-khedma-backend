const router = require('express').Router();

const ctrl = require('../../controllers/dashboard/sections');
const validator = require('../../validators/dashboard/sections');

router.get('/', ...validator.getSections, ctrl.getSections);
router.post('/', ...validator.postSection, ctrl.postSection);
router.patch('/:sectionId', ...validator.patchSection, ctrl.patchSection);
router.delete('/:sectionId', ...validator.deleteSection, ctrl.deleteSection);

module.exports = router;