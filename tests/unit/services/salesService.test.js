const { expect } = require('chai');
const sinon = require('sinon');

const salesService = require('../../../src/services/salesService');
const productsModel = require('../../../src/models/productsModel');
const salesModel = require('../../../src/models/salesModel');

const { allProducts, newProductSale, arrayMock, arrayMockInvalid, arrayMockInvalidZero } = require('./mocks/salesService.mock');


describe('Testando o sale da camada service', function () {
  
  it('Cadastrando um pessoa com os campos válidoss', async function() {
    sinon.stub(productsModel, 'getAll').resolves(allProducts);
    sinon.stub(salesModel, 'newIdSale').resolves(3);

    const result = await salesService.registerSale(arrayMock);

    expect(result.data).to.deep.equal(newProductSale)
  })

  it('Cadastrando um pessoa com os campos inválidos', async function() {
    sinon.stub(productsModel, 'getAll').resolves(allProducts);
    sinon.stub(salesModel, 'newIdSale').resolves([{id:3}]);

    const result = await salesService.registerSale(arrayMockInvalid);

    expect(result.type).to.equal('ID_SALE_NOT_FOUND');
    expect(result.message).to.deep.equal('Product not found')
  })

    it('Cadastrando um pessoa com a quantidade zero', async function() {
    sinon.stub(productsModel, 'getAll').resolves(allProducts);
    sinon.stub(salesModel, 'newIdSale').resolves([{id:3}]);

      const result = await salesService.registerSale(arrayMockInvalidZero);

    expect(result.type).to.equal('UNPROCESSABLE_ENTITY');
    expect(result.message).to.deep.equal('"quantity" must be greater than or equal to 1')
  })


  afterEach(function () {
    sinon.restore();
  });
});