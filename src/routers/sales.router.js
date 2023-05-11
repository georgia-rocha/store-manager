const express = require('express');
const { salesController } = require('../controllers/index');

const router = express.Router();

router.get(
  '/sales',
  salesController.listSales,
);

router.get(
  '/sales/:id',
  salesController.getSalesId,
);

router.post(
  '/sales',
  salesController.createSales,
);

router.delete(
  '/sales/:id',
  salesController.deleteSales,
);

module.exports = router;
