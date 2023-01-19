const { expect } = require('chai');
const sinon = require('sinon');

const salesService = require('../../../src/services/salesService');
const productsModel = require('../../../src/models/productsModel');
const salesModel = require('../../../src/models/salesModel');

const { arrayMockInvalidProduct, updateObj, updateSale, allSalesId, removeSale, allProducts, newProductSale, arrayMock, arrayMockInvalid, arrayMockInvalidZero, allSales, allSalesGetById, param1 } = require('./mocks/salesService.mock');


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

  it('Validando se é possível remover uma venda pelo id valido', async function () {
    sinon.stub(salesModel, 'getAll').resolves(allSalesId);
    sinon.stub(salesModel, 'queryIdAvailable').resolves(1);
    sinon.stub(salesModel, 'removeSale').resolves(removeSale)

    const { type } = await salesService.removeSale(1);
    
    expect(type).to.be.deep.equal(removeSale.type);
  })

    it('Validando se é possível remover uma venda pelo id valido invalido', async function () {
    sinon.stub(salesModel, 'getAll').resolves(allSalesId);
    sinon.stub(salesModel, 'queryIdAvailable').resolves(1);
    sinon.stub(salesModel, 'removeSale').resolves(removeSale)

    const { type, message } = await salesService.removeSale(999);
    
    expect(type).to.equal('ID_SALE_NOT_FOUND');
    expect(message).to.deep.equal('Sale not found') 
    })
  
  it('Validando se é possível realizar o update de uma venda', async function () {
    sinon.stub(salesModel, 'getById').resolves(param1)
    sinon.stub(salesModel, 'updateSale').resolves(updateObj)
    sinon.stub(productsModel, 'getById').resolves(1)

    const { data } = await salesService.updateSale(arrayMock, param1)

    expect(data).to.be.deep.equal(updateSale)
  })

  it('Validando se é possível realizar o update de uma venda com a quantidade invalida', async function () {
    sinon.stub(salesModel, 'getById').resolves(param1)
    sinon.stub(salesModel, 'updateSale').resolves(updateObj)
    sinon.stub(productsModel, 'getById').resolves(1)

      const {type, message} = await salesService.updateSale(arrayMockInvalidZero, param1)

      expect(type).to.be.equal('UNPROCESSABLE_ENTITY')
      expect(message).to.be.equal('"quantity" must be greater than or equal to 1')
  })
  
  it('Validando se é possível realizar o update de uma venda com a quantidade invalida', async function () {
    sinon.stub(salesModel, 'getById').resolves(param1)
    sinon.stub(salesModel, 'updateSale').resolves(updateObj)
    sinon.stub(productsModel, 'getById').resolves(undefined)

    const {type, message} = await salesService.updateSale(arrayMockInvalidProduct, param1)

    expect(type).to.be.equal('SALE_NOT_FOUND')
    expect(message).to.be.equal('Product not found')
  })


  it('Validando o update de uma venda com o os dados invalidos', async function () {
    
    const result = await salesService.updateSale([], 0)

    expect(result.type).to.equal('SALE_NOT_FOUND');
  })

  afterEach(function () {
    sinon.restore();
  });
});