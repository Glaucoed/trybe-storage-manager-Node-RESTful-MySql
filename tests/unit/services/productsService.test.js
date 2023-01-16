const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../src/services/productsService');

const productsModel = require('../../../src/models/productsModel')

const { allProducts, product, invalidName, newProduct, validName } = require('./mocks/productsService.mock');


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
     
  it('Cadastrando uma pessoa com o nome invalido, abaixo de 5 caracteres', async function() {
    const result = await productsService.registerProduct(invalidName)
    
    expect(result.type).to.equal('UNPROCESSABLE_ENTITY');
  })

  it('Cadastrando um pessoa com os campos válidoss', async function() {
    sinon.stub(productsModel, 'registerProduct').resolves(3);
    sinon.stub(productsModel, 'getById').resolves(newProduct);

    const result = await productsService.registerProduct(validName);

    expect(result.type).to.equal(null);
    expect(result.data).to.deep.equal(newProduct)
  })

  afterEach(function () {
    sinon.restore();
  });
});

