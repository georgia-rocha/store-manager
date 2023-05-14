const express = require('express');
const { productsController } = require('../controllers/index');
const validateNewProducts = require('../middlewares/validateNewProductFields');

const router = express.Router();

router.get(
  '/products',
  productsController.listProducts,
);

router.get(
  '/products/search',
  productsController.getProductsByName,
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
  '/products/:id',
  productsController.updateProductId,
);

router.delete(
  '/products/:id',
  productsController.deleteProduct,
);

module.exports = router;
