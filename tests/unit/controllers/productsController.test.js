const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController')
const { allProducts, product } = require('./mocks/productsController.mock');

  describe('Listando todos os produtos da camada Controller', function () {
    it('Deve retornar o status 200 e a lista', async function () {
      // arrange
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAll').resolves(allProducts);

      // act
      await productsController.getAll(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts)
    });

    it('ao passar um id que não existe no banco deve retornar um erro', async function () {
      // Arrange
      const res = {};
      const req = { params: { id: 9999 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      // Act
      await productsController.getById(req, res);

      // Assert

      expect(res.status).to.have.been.calledWith(404); 
      expect(res.json).to.have.been.calledWith({ message: 'Product not found'});
    });

      it('retornar o produto encontrado', async function () {
      // Arrange
      const res = {};
      const req = { params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getById').resolves({type: null, data: product});

      // Act
      await productsController.getById(req, res);

      // Assert

      expect(res.status).to.have.been.calledWith(200); 
      expect(res.json).to.have.been.calledWith(product);
    });

  afterEach(function () {
    sinon.restore();
  });
  });