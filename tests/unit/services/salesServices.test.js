const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');
const { sales, salesId, newSales } = require('../mocks/sales.mock');

describe('Testes de unidade do Service de sales', () => {
  it('Testa a função sem passar dados', async () => {
    sinon.stub(salesModel, 'findSalesAll').resolves([]);
    const result = await salesService.findSalesAll();

    expect(result.message).to.be.an('array');
    expect(result.message).to.have.length(0);
  });

  it('Testa se apresenta um erro se não possuir o campo "productId"', async () => {
    const data = [{ quantity: 1 }];
    const result = await salesService.createSales(data);

    expect(result.type).to.be.equal('INVALID_INPUT');
    expect(result.message).to.be.equal('"productId" is required');
  });

  it('Testa se apresenta um erro se não possuir campo "quantity"', async () => {
    const data = [{ productId: 1 }];
    const result = await salesService.createSales(data);

    expect(result.type).to.be.equal('INVALID_INPUT');
    expect(result.message).to.be.equal('"quantity" is required');
  });

  it('Testa se apresenta um erro se "quantity" for menor ou igual a 0', async () => {
    const data = [{
      productId: 1,
      quantity: -999,
    }];
    const result = await salesService.createSales(data);

    expect(result.type).to.be.equal('INVALID_VALUE');
    expect(result.message).to.be.equal(
      '"quantity" must be greater than or equal to 1'
    );
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

    const result = await salesService.findSalesById(1);

    expect(result.type).to.be.deep.equal(null);
    expect(result.message).to.be.deep.equal(salesId);
    expect(result).to.be.an('object');
  });

  it('Cadastrando novo product', async () => {
    sinon.stub(salesModel, 'insertSales').resolves(1);
    sinon.stub(salesModel, 'findSalesById').resolves(newSales);

    const result = await salesService.createSales(newSales);
    expect(result.message.itemsSold).to.be.deep.equal(newSales);
  });

  it('Testa a função findSalesById com id inexistente', async () => {
    sinon.stub(salesModel, 'findSalesById').resolves([]);

    const result = await salesService.findSalesById(299);

    expect(result.type).to.be.equal('NOT_FOUND');
    expect(result.message).to.be.deep.equal('Sale not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});
