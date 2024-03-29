const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');

const validateProductRequired = require('../middlewares/validateProductRequired');

router.get('/search', productsController.searchProduct);

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.put('/:id', validateProductRequired, productsController.updateProduct);

router.delete('/:id', productsController.removeProduct);

router.post('/', validateProductRequired, productsController.registerProduct);

module.exports = router;