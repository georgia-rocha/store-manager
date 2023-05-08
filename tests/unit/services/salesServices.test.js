const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');
const { sales, salesId } = require('../mocks/sales.mock');

describe('Testes de unidade do Service de sales', () => {
  it('Testa a função sem passar dados', async () => {
    sinon.stub(salesModel, 'findSalesAll').resolves([]);
    const result = await salesService.findSalesAll();

    expect(result.message).to.be.an('array');
    expect(result.message).to.have.length(0);
  });

  it('Testando a funçao de sales', async () => {
    sinon.stub(salesModel, 'findSalesAll').resolves(sales);

    const result = await salesService.findSalesAll();

    expect(result.message).to.be.an('array');
    expect(result.message).to.have.length(3);
    expect(result.message).to.be.deep.equal(sales);
  });

  it('Testa a função findSalesById', async () => {
    sinon.stub(salesModel, 'findSalesById').resolves(salesId);

    const result = await salesService.findSalesById(2);

    expect(result).to.contain.keys('date', 'productId', 'quantity', 'saleId');
    expect(result).to.be.an('object');
    expect(result.message[0]).to.be.equal(salesId[2]);
  });

  it('Testa a função findById com id inexistente', async () => {
    sinon.stub(salesModel, 'findSalesById').resolves(undefined);
    const result = await salesService.findSalesById(299);
    expect(result.message).to.be.an('string');
    expect(result).to.have.keys(['type', 'message']);
    expect(result.type).to.be.equal('NOT_FOUND');
    expect(result.message).to.be.equal('Sale not found');
  });

  /* it('Cadastrando novo product', async () => {
    sinon.stub(productsModel, 'insertProduct').resolves(1);
    sinon.stub(productsModel, 'findProductById').resolves(newProduct);

    const err = await productsService.createProduct('ProdutoX');
    expect(err.message).to.equal(newProduct);
  }); */

  afterEach(function () {
    sinon.restore();
  });
});
