const express = require('express');

const router = express.Router();

const validateSaleRequired = require('../middlewares/validateProductIdSale');

const salesController = require('../controllers/salesController');

const validateQuantitySale = require('../middlewares/validateQuantitySale');

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.post('/', validateSaleRequired, validateQuantitySale, salesController.registerSale);

module.exports = router;