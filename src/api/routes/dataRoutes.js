const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/', dataController.getData);
router.post('/', dataController.createData);

module.exports = router;