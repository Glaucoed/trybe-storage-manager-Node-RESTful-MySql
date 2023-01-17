const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/db/connection');
const productsModel = require('../../../src/models/productsModel');
const { allProducts, product, newProduct } = require('./mocks/productsModel.mock');

const FOUR = 4;

describe('Testando a rota products da camada Model', function () {
  it('Listando todos os produtos', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([allProducts])
    // Act
    const data = await productsModel.getAll();
    // Assert
    expect(data).to.be.deep.equal(allProducts)
  })


  it('Listando um produto pelo id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[product]]);
    // Act
    const data = await productsModel.getById(1);

    // Assert
    expect(data).to.be.deep.equal(product)
  })

  it('Cadastrando um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: FOUR }]);

    const idNewProduct = await productsModel.registerProduct(newProduct)

    expect(idNewProduct).to.equal(FOUR);
  })

  afterEach(function () {
    sinon.restore();
  });
})
