const express = require('express');

const router = express.Router();

const validateSaleRequired = require('../middlewares/validateProductIdSale');

const salesController = require('../controllers/salesController');

const validateQuantitySale = require('../middlewares/validateQuantitySale');

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.delete('/:id', salesController.removeSale);

router.put('/:id', validateSaleRequired, validateQuantitySale, salesController.updateSale);

router.post('/', validateSaleRequired, validateQuantitySale, salesController.registerSale);

module.exports = router;