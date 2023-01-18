const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../src/services/productsService');

const productsModel = require('../../../src/models/productsModel')

const {resultUpdateInvalid, invalidId, allProducts, product, invalidName, newProduct, validName, validId, removeProduct } = require('./mocks/productsService.mock');


describe('Testando o products da camada service', function () {
  it('Listando todos os produtos', async function () {
    sinon.stub(productsModel, 'getAll').resolves(allProducts)

    const data = await productsService.getAll();

    expect(data).to.be.equal(allProducts);
  });

  it('Listando um unico produto com o id', async function () {
    sinon.stub(productsModel, 'getById').resolves(product)

    const result = await productsService.getById(1);

    expect(result.type).to.be.equal(null);
    expect(result.data).to.deep.equal(product);
      
  });

  it('Listando um produto que o id não existe', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined)

      const result = await productsService.getById(99999);

    expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.deep.equal('Product not found');
      
  });
     
  it('Cadastrando um produto com o nome invalido, abaixo de 5 caracteres', async function() {
    const result = await productsService.registerProduct(invalidName)
    
    expect(result.type).to.equal('UNPROCESSABLE_ENTITY');
  })

  it('Cadastrando um produto com os campos válidoss', async function() {
    sinon.stub(productsModel, 'registerProduct').resolves(3);
    sinon.stub(productsModel, 'getById').resolves(newProduct);

    const result = await productsService.registerProduct(validName);

    expect(result.type).to.equal(null);
    expect(result.data).to.deep.equal(newProduct)
  })

  it('Validando se é possível realizar o update de um produto', async function () {
    sinon.stub(productsModel, 'getAll').resolves(allProducts);
    sinon.stub(productsModel, 'updateProduct').resolves(newProduct)

    const result = await productsService.updateProduct(validId, validName)

    expect(result.data).to.be.deep.equal(newProduct)
  })

  it('Validando se é possível realizar o update de um produto com o id invalido', async function () {
    sinon.stub(productsModel, 'getAll').resolves(allProducts);
    sinon.stub(productsModel, 'updateProduct').resolves(resultUpdateInvalid)

    const result = await productsService.updateProduct(invalidId, validName)

    expect(result).to.be.deep.equal(resultUpdateInvalid)
  })

  it('Validando o update de um produto com o nome invalido, abaixo de 5 caracteres', async function() {
    const result = await productsService.updateProduct(validId, invalidName)
    expect(result.type).to.equal('UNPROCESSABLE_ENTITY');
  })

  it('Validando se é possível remover um produto pelo id valido', async function () {
    sinon.stub(productsModel, 'getAll').resolves(allProducts);
    sinon.stub(productsModel, 'getById').resolves(1);
    sinon.stub(productsModel, 'removeProduct').resolves(removeProduct)

    const { type } = await productsService.removeProduct(1);
    
    expect(type).to.be.deep.equal(removeProduct.type);
  })

  it('Validando se é possível remover um produto pelo id invalido', async function () {
    sinon.stub(productsModel, 'getById').resolves(5);
    sinon.stub(productsModel, 'getAll').resolves(allProducts);
    sinon.stub(productsModel, 'removeProduct').resolves(removeProduct)

    const { type, message } = await productsService.removeProduct(999);

    expect(type).to.equal('PRODUCT_NOT_FOUND');
    expect(message).to.deep.equal('Product not found') 
  })

  afterEach(function () {
    sinon.restore();
  });
});

