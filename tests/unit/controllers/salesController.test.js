const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController')
const { mockErrorNotFoundId, allSales, allSalesGetById ,productSalesBody, newProductSale, messageError, productSalesBodyInvalid } = require('./mocks/salesController.mock');

describe('Testando o sales da camada Controller', function () {
 
  it('Cadastrando uma nova venda com sucesso', async function () {
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

  it('Cadastrando uma nova venda sem sucesso', async function () {
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

  it('Listando todos as vendas e o status 200', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getAll').resolves(allSales);

    await salesController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSales)
  })

  it('retornar o sale com o id encontrado', async function () {
    const res = {};
    const req = { params: { id: 1 },
      };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getById').resolves({type: null, data: allSalesGetById});

      
    await salesController.getById(req, res);

    expect(res.status).to.have.been.calledWith(200); 
    expect(res.json).to.have.been.calledWith(allSalesGetById);
  });

  it('Ao passar um id que não existe no banco deve retornar um erro', async function () {
    
    const res = {};
    const req = { params: { id: 9999 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' })

    await salesController.getById(req, res);

    expect(res.status).to.have.been.calledWith(404); 
    expect(res.json).to.have.been.calledWith({ message: 'Product not found'});
  });

  it('Realizando o delete de um produto pelo id e retornando o status 204', async function () {
    const res = {};
    const req = { params: { id: 1}};
      
    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();
    sinon.stub(salesService, 'removeSale').resolves(allSales);

    await salesController.removeSale(req, res);
    
    expect(res.status).to.have.been.calledWith(204);

  });

  it('Realizando o delete de um produto pelo id inexistente e retornando o status 404', async function () {
    const res = {};
    const req = { params: { id: 9}};
      
    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();
    res.json = sinon.stub().returns()
    sinon.stub(salesService, 'removeSale').resolves(mockErrorNotFoundId);

    await salesController.removeSale(req, res);
    
    expect(res.status).to.have.been.calledWith(404);
    

  });

  afterEach(function () {
    sinon.restore();
  });

});