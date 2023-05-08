const express = require('express');
const { salesController } = require('../controllers/index');

const router = express.Router();

router.get(
  '/sales',
  salesController.listSales,
);

router.get(
  '/sales/:id', salesController.getSalesId,
);

router.post(
  '/sales',
  salesController.createSales,
);

module.exports = router;
