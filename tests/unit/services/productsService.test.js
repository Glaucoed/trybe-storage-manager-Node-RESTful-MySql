const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../src/services/productsService');

const productsModel = require('../../../src/models/productsModel')

const { allProducts, product } = require('./mocks/productsService.mock');


describe('Testando o products da camada service', function () {
  it('listando todos os produtos', async function () {
    sinon.stub(productsModel, 'getAll').resolves(allProducts)

    const data = await productsService.getAll();

    expect(data).to.be.equal(allProducts);
  });

  it('listando um unico produto com o id', async function () {
    sinon.stub(productsModel, 'getById').resolves(product)

    const result = await productsService.getById(1);

    expect(result.type).to.be.equal(null);
    expect(result.data).to.deep.equal(product);
      
  });

    it('listando um produto que o id não existe', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined)

      const result = await productsService.getById(99999);

    expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.deep.equal('Product not found');
      
  });
     
  afterEach(function () {
    sinon.restore();
  });
});

