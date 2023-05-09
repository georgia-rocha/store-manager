const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const salesController = require('../../../src/controllers/sales.controller');
const salesService = require('../../../src/services/sales.service');
const { sales, salesId, newSales, newSalesMock } = require('../mocks/sales.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes de unidade do Controller de Sales', () => {
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

  it('Testa se apresenta um erro com status 400 se não possuir o campo "productId"', async () => {
    const res = {};
    const req = {
      body: [{ quantity: 1 }],
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'createSales')
      .resolves({
        type: 'INVALID_INPUT', message: '"productId" is required'
      });

    await salesController.createSales(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"productId" is required',
    });
  });

  it('Testa se apresenta um erro com status 400 se não possuir campo "quantity"', async () => {
    const res = {};
    const req = {
      body: [{ productId: 1 }],
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'createSales')
      .resolves({
        type: 'INVALID_INPUT', message: '"quantity" is required'
      });

    await salesController.createSales(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"quantity" is required',
    });
  });

  it('Testa se apresenta um erro com status 422 se "quantity" for menor ou igual a 0', async () => {
    const res = {};
    const req = {
      body: [
        {
          productId: 1,
          quantity: -99,
        },
      ],
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, "createSales").resolves({
      type: 'INVALID_VALUE',
      message: '"quantity" must be greater than or equal to 1',
    });

    await salesController.createSales(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({
      message: '"quantity" must be greater than or equal to 1',
    });
  });

  it('Testa se apresenta um erro com status 404 se "productId" for undefined', async () => {
    const res = {};
    const req = {
      body: [
        {
          productId: 999,
          quantity: 2,
        },
      ],
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'createSales').resolves({
      type: 'NOT_FOUND',
      message: 'Product not found',
    });

    await salesController.createSales(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({
      message: 'Product not found',
    });
  });

  it('Testa se apresenta o status 201 ao cadastrar uma venda com sucesso', async () => {
    const res = {};
    const req = {
      body: newSales,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'createSales')
      .resolves({ type: null, message: newSalesMock });

    await salesController.createSales(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newSalesMock);
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

  it('Testa o cadastro de uma nova venda', async () => {
    sinon.stub(salesService, 'createSales').resolves({
      type: null,
      message: newSales,
    })
    const req = { body: newSales };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.createSales(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newSales);
  });

  afterEach(function () {
    sinon.restore();
  });
});
