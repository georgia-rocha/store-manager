const express = require('express');
const { productsController } = require('../controllers/index');
const validateNewProducts = require('../middlewares/validateNewProductFields');

const router = express.Router();

router.get(
  '/products',
  productsController.listProducts,
);

router.get(
  '/products/:id',
  productsController.getProduct,
);

router.post(
  '/products',
  validateNewProducts,
  productsController.createProduct,
);

router.put(
  '/products',
  productsController.updateProductId,
);

module.exports = router;
