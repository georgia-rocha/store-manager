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

const insertSales = async (sale) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );
  await Promise.all(sale.map(async ({ productId, quantity }) => {
      await connection.execute(
        'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
        [insertId, productId, quantity],
      );
    }));

  return insertId;
};

module.exports = {
  findSalesAll,
  findSalesById,
  insertSales,
};