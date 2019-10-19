const express   = require('express');

const sellersCtrl      = require('../controllers/sellers');

const router = express.Router();

router.get('/', sellersCtrl.index);

module.exports = router;