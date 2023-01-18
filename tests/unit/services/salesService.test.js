const { expect } = require('chai');
const sinon = require('sinon');

const salesService = require('../../../src/services/salesService');
const productsModel = require('../../../src/models/productsModel');
const salesModel = require('../../../src/models/salesModel');

const { allProducts, newProductSale, arrayMock, arrayMockInvalid, arrayMockInvalidZero, allSales, allSalesGetById } = require('./mocks/salesService.mock');


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

  it('Listando todas as vendas', async function () {

    sinon.stub(salesModel, 'getAll').resolves(allSales);
    
    const data = await salesService.getAll();

    expect(data).to.be.equal(allSales);
  })

  it('listando uma unica venda com o id', async function () {
    sinon.stub(salesModel, 'getById').resolves(allSalesGetById);

    const data = await salesService.getById(1);

    expect(data.type).to.be.equal(null)
    expect(data.data).to.be.equal(allSalesGetById)   
    
  })

    it('listando uma unica venda com o id inexistente ', async function () {
    sinon.stub(salesModel, 'getById').resolves(undefined);

      const data = await salesService.getById(9999);

    expect(data.type).to.be.equal('SALE_NOT_FOUND')
    expect(data.message).to.be.equal('Sale not found')   
    
  })

  afterEach(function () {
    sinon.restore();
  });
});