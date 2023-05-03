const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const productsModel = require('../../../src/models/product.model');
const productsService = require('../../../src/services/product.service');
const { products, productId } = require('../mocks/products.mock');

describe('Testes de unidade do Service de products', () => {
  it('Testa se a função sem passar dados', async () => {
    sinon.stub(productsModel, 'findProductsAll').resolves([]);
    const result = await productsService.findAll();
  
    expect(result.message).to.be.an('array');
    expect(result.message).to.have.length(0);
  });

  it('Testando funçao products', async () => {
    sinon.stub(productsModel, 'findProductsAll').resolves(products);

    const result = await productsService.findAll();

    expect(result.message).to.be.an('array');
    expect(result.message).to.have.length(3);
    expect(result.message).to.be.deep.equal(products);
  });

  it('Testa a função findById', async () => {
    sinon.stub(productsModel, 'findProductById').resolves(productId);

    const result = await productsService.findById(1);

    expect(result).to.contain.keys('message', 'type');
    expect(result).to.be.an('object');
    expect(result.message[0]).to.be.equal(productId[0]);
  });

  it('Testa a função findById com id inexistente', async () => {
    sinon.stub(productsModel, 'findProductById').resolves(undefined);
    const result = await productsService.findById(9999);

    expect(result.message).to.be.an('string');
    expect(result).to.have.keys(['type', 'message']);
    expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.be.equal('Product not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});
