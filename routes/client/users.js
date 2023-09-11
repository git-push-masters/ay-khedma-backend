const router = require('express').Router();

const ctrl = require('../../controllers/client/users');
const validator = require('../../validators/client/users');

router.get('/', ...validator.getUsers, ctrl.getUsers);

router.get('/:userId', ...validator.getUser, ctrl.getUser);
router.patch('/:userId', ...validator.patchUser, ctrl.patchUser);
router.delete('/:userId', ...validator.deleteUser, ctrl.deleteUser);

router.get('/:userId/offers', ...validator.getUserOffers, ctrl.getUserOffers);

router.get('/:userId/reviews', ...validator.getUserReviews, ctrl.getUserReviews);

router.post('/:userId/reports', ...validator.postUserReport, ctrl.postUserReport);

module.exports = router;