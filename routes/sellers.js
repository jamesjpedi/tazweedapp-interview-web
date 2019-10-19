const express   = require('express');

const sellersCtrl      = require('../controllers/sellers');

const router = express.Router();

router.get('/', sellersCtrl.index);
router.get('/profile', sellersCtrl.profile);
router.get('/timeslots', sellersCtrl.timeSlots);

module.exports = router;