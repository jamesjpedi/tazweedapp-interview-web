const express   = require('express');

const indexCtrl      = require('../controllers/index');

const router = express.Router();

router.get('/', indexCtrl.index);
router.get('/logout', indexCtrl.logout);
router.get('/login', indexCtrl.login);
router.post('/login', indexCtrl.submitLogin);
router.get('/register', indexCtrl.register);
router.post('/register', indexCtrl.submitRegister);

module.exports = router;