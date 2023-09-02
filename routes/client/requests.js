const router = require('express').Router();

const ctrl = require('../../controllers/client/requests');
const validator = require('../../validators/client/requests');

router.get('/', ...validator.getRequests, ctrl.getRequests);
router.post('/', ...validator.postRequest, ctrl.postRequest);

router.get('/:requestId', ...validator.getRequest, ctrl.getRequest);
router.patch('/:requestId', ...validator.patchRequest, ctrl.patchRequest);
router.delete('/:requestId', ...validator.deleteRequest, ctrl.deleteRequest);

router.get('/:requestId/offers', ...validator.getRequestOffers, ctrl.getRequestOffers);
router.post('/:requestId/offers', ...validator.postRequestOffer, ctrl.postRequestOffer);

router.get('/:requestId/offers/:offerId', ...validator.getRequestOffer, ctrl.getRequestOffer);

router.get('/:requestId/review', ...validator.getRequestReview, ctrl.getRequestReview);
router.post('/:requestId/review', ...validator.postRequestReview, ctrl.postRequestReview);

module.exports = router;