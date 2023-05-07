const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { products, productId, newProduct } = require('../mocks/products.mock');

describe('Testes de unidade do model de products', () => {
  it('Recuperando a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
  
    const result = await productModel.findProductsAll();
    expect(result).to.be.an('array');
    expect(result).to.be.deep.equal(products);
    expect(result).to.have.length(3);
  });

  it('Recuperando um produto a partir do seu id', async () => {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);

    const result = await productModel.findProductById(1);
    expect(result).to.be.deep.equal(productId);
    expect(result).to.contain.keys('id', 'name');
    expect(result).to.be.an('object')
  });

  it('Tentando recuperar um produto inexistente', async () => {
    sinon.stub(connection, 'execute').throws(new Error('Product not found'));
    try {
      await productModel.findProductById(999);
      expect.fail();
    } catch (e) {
      expect(e.message).to.be.equal('Product not found');
    }
  });

  it('Cadrastrando um novo produto', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    try {
      const result = await productModel.insertProduct(newProduct);
      expect(result).to.equal(4);
    } catch (e) {
      console.log(e);
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});