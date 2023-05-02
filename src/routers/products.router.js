const express = require('express');
const { productsController } = require('../controllers/index');

const router = express.Router();

router.get(
  '/products',
  productsController.listProducts,
);

router.get(
  '/products/:id',
  productsController.getProduct,
);

module.exports = router;
