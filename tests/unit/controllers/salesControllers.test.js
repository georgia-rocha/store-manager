const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const salesController = require('../../../src/controllers/sales.controller');
const salesService = require('../../../src/services/sales.service');
const { sales, salesId } = require('../mocks/sales.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes de unidade do Controller de sales', () => {
  it('Testando funçao sales', async () => {
    await sinon.stub(salesService, 'findSalesAll').resolves(sales);

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.listSales(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
  })

  it('Testanto função findSalesById', async () => {
    sinon.stub(salesService, 'findSalesById').resolves({
      type: null,
      message: salesId,
    });

    const req = { params: { id: 2 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSalesId(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json).to.have.been.calledWith(salesId);
  });

  it('Testando falha na função getSalesId', async () => {
    sinon.stub(salesService, 'findSalesById').resolves({
      type: "NOT_FOUND",
      message: 'Sale not found',
    });

    const req = { params: { id: 999 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSalesId(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({
      message: 'Sale not found',
    });
  });

 /*  it('Testa o cadastro de um novo produto', async () => {
    sinon.stub(productsService, 'createProduct').resolves({
      type: null,
      message: newProduct,
    })
    const req = { body: newProduct };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  }); */

  afterEach(function () {
    sinon.restore();
  });
});
