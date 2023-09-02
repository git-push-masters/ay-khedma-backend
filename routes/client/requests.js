const router = require('express').Router();

const ctrl = require('../../controllers/client/requests');
const validator = require('../../validators/client/requests');

router.get('/', ...validator.getRequests, ctrl.getRequests);
router.post('/', ...validator.postRequest, ctrl.postRequest);
router.get('/:requestId', ...validator.getRequest, ctrl.getRequest);
router.patch('/:requestId', ...validator.patchRequest, ctrl.patchRequest);
router.delete('/:requestId', ...validator.deleteRequest, ctrl.deleteRequest);

module.exports = router;