const express = require('express');

const router = express.Router();

const validateSaleRequired = require('../middlewares/validateProductIdSale');

const salesController = require('../controllers/salesController');
const validateQuantitySale = require('../middlewares/validateQuantitySale');

router.post('/',
  validateSaleRequired,
  validateQuantitySale,
  salesController.registerSale);

module.exports = router;