const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripeController');

router.post('/create-intent', stripeController.createCheckoutSession);
router.post('/webhook', stripeController.handleWebhook);

module.exports = router;
