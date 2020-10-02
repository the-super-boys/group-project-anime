const router = require('express').Router();
const controller = require('../controllers/JikanController');

router.post('/', controller.fetchJikans);

module.exports = router;