const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { sales, salesId, newSales } = require('../mocks/sales.mock');

describe('Testes de unidade do model de sales', () => {
  it('Recuperando a lista de vendas', async function () {
    sinon.stub(connection, 'execute').resolves([sales]);

    const result = await salesModel.findSalesAll();
    expect(result).to.be.an('array');
    expect(result).to.be.deep.equal(sales);
    expect(result).to.have.length(3);
  });

  it('Recuperando uma venda a partir do seu id', async () => {
    sinon.stub(connection, 'execute').resolves([salesId]);

    const result = await salesModel.findSalesById(2);
    expect(result).to.be.deep.equal(salesId);
    // expect(result).to.contain.keys('date', 'productId', 'quantity', 'saleId');
    expect(result).to.be.an('object')
  });

  it('Tentando recuperar uma venda inexistente', async () => {
    sinon.stub(connection, 'execute').throws(new Error('Sale not found'));
    try {
      await salesModel.findSalesById(999);
      expect.fail();
    } catch (e) {
      expect(e.message).to.be.equal('Sale not found');
    }
  });

  it('Cadrastrando uma nova venda', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    try {
      const result = await salesModel.insertSales(newSales);
      expect(result).to.equal(1);
    } catch (e) {
      console.log(e);
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});