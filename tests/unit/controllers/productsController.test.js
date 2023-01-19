const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController')
const { allProducts, product, productBody, newProduct, mockErrorNotFoundId, } = require('./mocks/productsController.mock');

describe('Listando todos os produtos da camada Controller', function () {
  
  it('Listando todos os produtos e o status 200', async function () {
    const res = {};
    const req = {};
      
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getAll').resolves(allProducts);

    await productsController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts)
  });

  it('Listando um ou mais produtos com query e o status 200', async function () {
    const res = {};
      const req = { query: { q: "a" } };
      
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getAll').resolves(allProducts);

    await productsController.searchProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
  });

  it('Listando um unico produto com o id e o status 200', async function () {
    const res = {};
    const req = { params: { id: 1 },
      };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getById').resolves({type: null, data: product});

    await productsController.getById(req, res);

    expect(res.status).to.have.been.calledWith(200); 
    expect(res.json).to.have.been.calledWith(product);
  });

  it('Ao listar produto com o id invalido, deve retornar product not found e o status 404', async function () {
    const res = {};
    const req = { params: { id: 9999 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

    await productsController.getById(req, res);

    expect(res.status).to.have.been.calledWith(404); 
    expect(res.json).to.have.been.calledWith({ message: 'Product not found'});
  });

  it('Cadastrando um novo produto com sucesso', async function () {
    const res = {};
    const req = {
      body: productBody
    }
      
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'registerProduct').resolves({ type: null, data: newProduct })
      
    await productsController.registerProduct(req, res)

    expect(res.status).to.have.been.calledWith(201); 
    expect(res.json).to.have.been.calledWith(newProduct);
  })

  it('Cadastrando um produto sem o minimo de 5 caracter', async function () {
    const res = {};
    const req = {
      body: {
        name: 'abc'
      }
    };
      
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'registerProduct').resolves({type: 'UNPROCESSABLE_ENTITY', message: '"name" length must be at least 5 characters long'})
      
    await productsController.registerProduct(req, res)

    expect(res.status).to.have.been.calledWith(422); 
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long'});
  })

  it('Realizando o update de um produto pelo id e retornando o status 200', async function () {
    const res = {};
    const req = { params: { id: 1 }, body: { name: 'Martelo de Thor'}};
      
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'updateProduct').resolves({type: null, data: product});

    await productsController.updateProduct(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(product)
  });

  it('Realizando o update de um produto pelo id inexistente e retornando o status 404', async function () {
    const res = {};
    const req = { params: { id: 999}, body: { name: 'Martelo de Thor'}};
      
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'updateProduct').resolves(mockErrorNotFoundId);

    await productsController.updateProduct(req, res);
          
    expect(res.status).to.have.been.calledWith(404);
  });

  it('Realizando o delete de um produto pelo id e retornando o status 204', async function () {
    const res = {};
    const req = { params: { id: 1}};
      
    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();
    sinon.stub(productsService, 'removeProduct').resolves(allProducts);

    await productsController.removeProduct(req, res);
    
    expect(res.status).to.have.been.calledWith(204);

  });

  it('Realizando o delete de um produto pelo id inexistente e retornando o status 404', async function () {
    const res = {};
    const req = { params: { id: 9}};
      
    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();
    res.json = sinon.stub().returns()
    sinon.stub(productsService, 'removeProduct').resolves(mockErrorNotFoundId);

    await productsController.removeProduct(req, res);
    
    expect(res.status).to.have.been.calledWith(404);

  });
  

  afterEach(function () {
    sinon.restore();
  });

});