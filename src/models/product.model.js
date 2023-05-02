const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

const findProductsAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return camelize(result);
};

const findProductById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return camelize(result);
};

module.exports = {
  findProductsAll,
  findProductById,
};
