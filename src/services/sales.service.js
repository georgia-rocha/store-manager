const { salesModel } = require('../models');
const validate = require('./validations/validationsInputValue');

const findSalesAll = async () => {
  const sales = await salesModel.findSalesAll();
  return { type: null, message: sales };
};

const findSalesById = async (salesId) => {
  const error = validate.validateSalesId(salesId);
  if (error.type) return error;

  const sales = await salesModel.findSalesById(salesId);
  if (sales.length === 0) return { type: 'NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sales };
};

const createSales = async (sale) => {
  const error = await validate.validateNewSale(sale);
  if (error.type) return error;

  const newSaleId = await salesModel.insertSales(sale);
  const newSales = await salesModel.findSalesById(newSaleId);
  const sales = newSales.map((saleNew) => (
    { productId: saleNew.productId, quantity: saleNew.quantity }));

  return {
    type: null,
    message: {
      id: newSaleId,
      itemsSold: sales,
  } };
};

const deleteSales = async (id) => {
  const salesId = await salesModel.findSalesById(id);
  console.log('bbbb', salesId);
  
  if (!salesId || salesId === undefined || salesId.length === 0) {
    return { type: 'NOT_FOUND', message: 'Sale not found' };
  }

  const sales = await salesModel.deleteSales(id);
  console.log('aa', salesId);

  return { type: null, message: sales };
};

const updateSalesById = async (saleId, saleUpdate) => {
  const error = await validate.validateNewSale(saleUpdate);
  if (error.type) return error;

  const salesId = await salesModel.findSalesById(saleId);
  console.log(salesId);
  
  if (!salesId || salesId === undefined || salesId.length === 0) {
    return { type: 'NOT_FOUND', message: 'Sale not found' };
  }
  
 await Promise.all(saleUpdate.map(async (sale) => salesModel.updateSalesById(saleId, sale)));

  return {
    type: null,
    message: {
      saleId,
      itemsUpdated: saleUpdate,
    },
  };
};

module.exports = {
  findSalesAll,
  findSalesById,
  createSales,
  deleteSales,
  updateSalesById,
};