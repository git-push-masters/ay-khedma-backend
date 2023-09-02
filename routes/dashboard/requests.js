const router = require('express').Router();

const ctrl = require('../../controllers/dashboard/requests');
const validator = require('../../validators/dashboard/requests');

router.get('/', ...validator.getRequests, ctrl.getRequests);

router.get('/:requestId', ...validator.getRequest, ctrl.getRequest);
router.delete('/:requestId', ...validator.deleteRequest, ctrl.deleteRequest);

router.get('/:requestId/offers', ...validator.getRequestOffers, ctrl.getRequestOffers);

router.get('/:requestId/offers/:offerId', ...validator.getRequestOffer, ctrl.getRequestOffer);

router.get('/:requestId/review', ...validator.getRequestReview, ctrl.getRequestReview);

module.exports = router;