const express = require('express');
const router = express.Router();
const directApi = require('../controllers/directController');
const hostedApi = require('../controllers/hostedController');

router.post('/direct', directApi);
router.post('/hosted', hostedApi);

module.exports = router;