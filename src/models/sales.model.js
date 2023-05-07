const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

const findSalesAll = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id, sa.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS sa
    ON sp.sale_id = sa.id
    ORDER BY sp.sale_id, sp.product_id;`,
  );
  return camelize(result);
};

const findSalesById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT sa.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS sa
    ON sp.sale_id = sa.id
    WHERE sp.sale_id = ?
    ORDER BY sp.sale_id, sp.product_id;`,
    [saleId],
  );

  return camelize(sale);
};

module.exports = {
  findSalesAll,
  findSalesById,
};