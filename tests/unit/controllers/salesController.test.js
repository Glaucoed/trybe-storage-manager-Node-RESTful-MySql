const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController')
const { productSalesBody, newProductSale, messageError, productSalesBodyInvalid } = require('./mocks/salesController.mock');

describe('Testando o sales da camada Controller', function () {
 
  it('Cadastrando um novo produto com sucesso', async function () {
    const res = {};
    const req = {
      body: productSalesBody
    }
      
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'registerSale').resolves({data: newProductSale })
      
    await salesController.registerSale(req, res)

    expect(res.status).to.have.been.calledWith(201); 
    expect(res.json).to.have.been.calledWith(newProductSale);
  })

  it('Cadastrando um novo produto com sucesso', async function () {
    const res = {};
    const req = {
      body: productSalesBodyInvalid
    }
      
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'registerSale').resolves({ type: 'ID_SALE_NOT_FOUND', message: 'Product not found' })
      
    await salesController.registerSale(req, res)

    expect(res.status).to.have.been.calledWith(404); 
    expect(res.json).to.have.been.calledWith(messageError);
  })

  afterEach(function () {
    sinon.restore();
  });

});