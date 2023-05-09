const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const productsController = require('../../../src/controllers/product.controller');
const productsService = require('../../../src/services/product.service');
const { products, productId, newProduct } = require('../mocks/products.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes de unidade do Controller de products', () => {
  it('Testando funçao products', async () => {
    await sinon.stub(productsService, 'findAll').resolves(products);

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.listProducts(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
  })

  it('Testanto função findById', async () => {
    sinon.stub(productsService, 'findById').resolves({
      type: null,
      message: productId,
    });

    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProduct(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json).to.have.been.calledWith(productId);
  });
  
  it('Testando falha na função findById', async () => {
    sinon.stub(productsService, 'findById').resolves({
      type: "NOT_FOUND",
      message: 'Product not found',
    });

    const req = { params: { id: 999 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({
      message: 'Product not found',
    });
  });

  it('Testa o cadastro de um novo produto', async () => {
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
  });

  afterEach(function () {
    sinon.restore();
  });
});
